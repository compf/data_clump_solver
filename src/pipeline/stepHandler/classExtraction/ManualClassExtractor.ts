import { DataClumpTypeContext } from "data-clumps-type-context";
import { ASTBuildingContext, ClassPathContext, DataClumpDetectorContext, DataClumpRefactoringContext, NameFindingContext } from "../../../context/DataContext";
import { PipeLineStep,PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import {join,resolve,dirname} from "path"
import fs from "fs"
import { resolveFromInterfaceName } from "../../../config/Configuration";
import { ValidationStepHandler } from "../validation/ValidationStepHandler";

export abstract class ManualClassExtractor extends AbstractStepHandler{
    abstract createField(fieldName:string, type:string):string;
    abstract createGetter(fieldName:string, type:string):string;
    abstract createSetter(fieldName:string, type:string):string;
    abstract createHead(className:string,context:DataClumpTypeContext,projectPath:string,refactoringContext:DataClumpRefactoringContext);
    abstract createConstructor(className:string,types:string[],fieldNames:string[]):string;
    abstract createTail():string;
    abstract getExtension():string;
    getWhitespaces(count:number):string{
        const fourWhiteSpace="    "
        let result=""
        for(let i=0;i<count;i++){
            result+=fourWhiteSpace
        }
        return result;
    }
    override getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.ClassExtraction]
    }
    savedClassPaths:Map<string,string>=new Map()

    override async  handle(step:PipeLineStepType,context: DataClumpRefactoringContext, params: any):Promise<DataClumpRefactoringContext> {
        let detectorContext=context.getByType(DataClumpDetectorContext) as DataClumpDetectorContext;
        let nameFindingContext=context.getByType(NameFindingContext) as NameFindingContext;
        for(let dataClumpKey of detectorContext.getDataClumpKeys()){
            let suggestedName=nameFindingContext.getNameByDataClumpKey(dataClumpKey);
            if(suggestedName==undefined){
                throw "No suggested name found  for data clump key "+dataClumpKey+" in name finding context"
            }
            let dataClump=detectorContext.getDataClumpDetectionResult().data_clumps[dataClumpKey]! as DataClumpTypeContext;
            let classBody=this.createHead(suggestedName,dataClump,context.getProjectPath(),context);
            let fieldNames:string[]=[]
            let types:string[]=[]
            for(let param of Object.values(dataClump?.data_clump_data!)){
                classBody+=this.createField(param.name,param.type)+"\n"
                classBody+=this.createGetter(param.name,param.type)+"\n"
                classBody+=this.createSetter(param.name,param.type)+"\n"
                fieldNames.push(param.name)
                types.push(param.type);

            }
            classBody+=this.createConstructor(suggestedName,types,fieldNames)+"\n"
            classBody+=this.createTail()+"\n";
            classBody=classBody.replaceAll("\t",this.getWhitespaces(1))
            let classPath=context.getByType(ClassPathContext)!.getExtractedClassPath(dataClumpKey)
            if(!fs.existsSync(classPath)){
                fs.writeFileSync(classPath,classBody)
                console.log("writing",classPath)
            }
            

        }
        if(this.args.checkValid){
            let validator=resolveFromInterfaceName(PipeLineStep.Validation.name) as ValidationStepHandler
            let result=await validator.validate(context)
            if(!result.success){
                let filteredContext=context.getByType(DataClumpDetectorContext) as DataClumpDetectorContext
                let classExtractionContext=context.getByType(ClassPathContext) as ClassPathContext
                let classPaths=classExtractionContext.getAllExtractedClassPaths()
                filteredContext.cloneLastItem()
                let paths=validator.getPathsOfFilesWithErrors(result.messages!.stderr.split("\n"))
                for(let p of paths){
                    if( classPaths.has(p) &&  fs.existsSync(p))
                    {
                        fs.unlinkSync(p)
                        console.log("deleting",p)
                    }
                    
                    let keys=classExtractionContext.getDataClumpKeysByPath(p)
                    for(let key of keys){
                        filteredContext.deleteEntry(key)
                    }
                    
                }
            }

        }
        return Promise.resolve(context)
                
    }
        
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
    }
    addAditionalContextRequirementNames(pipeLineStep: PipeLineStepType, requirements: Set<string>): void {
        requirements.add(DataClumpDetectorContext.name)
        requirements.add(ASTBuildingContext.name)
        requirements.add(NameFindingContext.name)
    }
    private args:ManualClassExtractorArgs;
    constructor(args:ManualClassExtractorArgs){
        super();
        this.args=args;
    }


}
type ManualClassExtractorArgs={
   checkValid:boolean
}