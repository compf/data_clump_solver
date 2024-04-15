import { DataClumpTypeContext } from "data-clumps-type-context";
import { ClassPathContext, DataClumpDetectorContext, DataClumpRefactoringContext, NameFindingContext } from "../../../context/DataContext";
import { PipeLineStep,PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { getContextSerializationPath } from "../../../config/Configuration";
import fs from "fs"
import path from "path"
export interface ClassExtractionLocationProvider{
    getClassLocation(projectPath:string,context:DataClumpTypeContext):string;
}
export class AlwaysFromLocationProvider implements ClassExtractionLocationProvider{
    getClassLocation(projectPath:string,context:DataClumpTypeContext):string{
        return path.resolve(projectPath,path.dirname(context.from_file_path))
    }
}
export abstract class AbstractNameFindingStepHandler extends AbstractStepHandler {
    useExistingNames: boolean=true;
    deserializeExistingContext(context: DataClumpRefactoringContext, step: PipeLineStepType): DataClumpRefactoringContext | null {
        if(step==PipeLineStep.NameFinding && this.useExistingNames){
            if(fs.existsSync(getContextSerializationPath(step.name,context))){
                let data=JSON.parse(fs.readFileSync(getContextSerializationPath(step.name,context)).toString())
                let newContext= context.buildNewContext(new NameFindingContext()) as NameFindingContext
                for(let key of Object.keys(data)){
                    newContext.setNameKeyPair(data[key],key)
                    
                }
                return newContext
            }
        }
        return null;
    }
   async  handle(step:PipeLineStepType,context: DataClumpRefactoringContext, params: any):Promise<DataClumpRefactoringContext> {
       

            let keyNameMap=new Map<string,string>();
            let keyPathMap=new Map<string,string>();
            let dcPathMap=new Map<string,string>();
            let dcKeyNameMap=new Map<string,string>();
            let nameCache=new Set<string>();
            let detectorContext=context.getByType(DataClumpDetectorContext)!!
            for (let dataClumpKey of detectorContext.getDataClumpKeys()) {

                let dataClump = detectorContext.getDataClumpDetectionResult().data_clumps[dataClumpKey]!;
                let variableInfos: {name:string,type:string}[] = []
                for (let k of Object.keys(dataClump.data_clump_data)) {
                    let name = dataClump.data_clump_data[k].name
                    let type = dataClump.data_clump_data[k].type
                    variableInfos.push({name,type})

                }
                let key = this.getQueryKey(variableInfos)
                let reply=""
                if (keyNameMap.has(key)) {
                    reply=keyNameMap.get(key)!!
                    dcPathMap.set(dataClumpKey,keyPathMap.get(key)!)
                    dcKeyNameMap.set(dataClumpKey,reply)
                   
                }
                else{
                    let outPath:string|null=null
                    let counter=0
                    do{
                        reply = (await this.getSuggestedName(variableInfos,context,counter))!!;
                        outPath=this.getClassLocation(reply,dataClump,context)
                        counter++
                    }while(outPath==null  || nameCache.has(reply));
                    nameCache.add(reply) 
                    keyNameMap.set(key,reply)
                    keyPathMap.set(key,outPath!)
                    dcPathMap.set(dataClumpKey,outPath!)
                    dcKeyNameMap.set(dataClumpKey,reply)
                    this.nameFound()
                }

              
               
              

            }
            let nameContext=context.buildNewContext(new NameFindingContext()) as NameFindingContext
            for(let key of dcKeyNameMap.keys()){
                nameContext.setNameKeyPair(dcKeyNameMap.get(key)!,key)
            }
            nameContext.serialize()
            let classPathContext=nameContext.buildNewContext(new ClassPathContext()) as ClassPathContext
            for(let key of dcPathMap.keys()){
                classPathContext.setExtractedClassPath(key,dcPathMap.get(key)!!)
            }
            
            return classPathContext;

        

    }
    constructor(args:any){
        super();
        if( args!=undefined && args.useExistingNames!=undefined){
            this.useExistingNames=args.useExistingNames
        }
    }
    getClassLocation(name: string,dataClump:DataClumpTypeContext,context:DataClumpRefactoringContext): string|null {
        const extension=".java"
        let locationProvider=new AlwaysFromLocationProvider()
        let classPath=locationProvider.getClassLocation(context.getProjectPath(),dataClump)
        let fullPath=path.resolve(classPath,name+extension)
        if(fs.existsSync(fullPath)){
            return null;
        }
        else{
            return fullPath;
        }

    }
    nameFound(){
        //do nothing but can be overriden
    }
    getQueryKey(identifiers: {name:string,type:string}[]):string {
        return identifiers.sort((a,b)=>a.name.localeCompare(b.name)).map(it=>it.type +" " +it.name   ).join("\n")
    }
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.NameFinding]
     }
    abstract getSuggestedName(nvarInfo:{name:string,type:string}[],context:DataClumpRefactoringContext,counter:number):Promise<string|null>
     addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
            createdContexts.add(NameFindingContext.name)
            createdContexts.add(ClassPathContext.name)

     }
     addAditionalContextRequirementNames(pipeLineStep: PipeLineStepType, requirements: Set<string>): void {
        requirements.add(DataClumpDetectorContext.name)
     }
    }