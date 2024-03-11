import { DataClumpTypeContext } from "data-clumps-type-context";
import { ClassExtractionContext, DataClumpDetectorContext, DataClumpRefactoringContext, NameFindingContext } from "../../../context/DataContext";
import { PipeLineStep,PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import {join,resolve,dirname} from "path"
import fs from "fs"
export interface ClassExtractionLocationProvider{
    getClassLocation(projectPath:string,context:DataClumpTypeContext):string;
    getPackageName(projectPath:string,context:DataClumpTypeContext):string;
}
export class JavaAlwaysFromLocationProvider implements ClassExtractionLocationProvider{
    getClassLocation(projectPath:string,context:DataClumpTypeContext):string{
        return context.from_file_path;
    }
    getPackageName(projectPath:string,context:DataClumpTypeContext):string{
        let fromPath= resolve(projectPath,context.from_file_path)
        let splttedBySemicolon =fs.readFileSync(fromPath).toString().split(";")[0]
        let splittedBySpace=splttedBySemicolon.split(" ")
        return splittedBySpace[splittedBySpace.length-1]
    }
}
export abstract class ManualClassExtractor extends AbstractStepHandler{
    protected locationProvider=new JavaAlwaysFromLocationProvider()
    abstract createField(fieldName:string, type:string):string;
    abstract createGetter(fieldName:string, type:string):string;
    abstract createSetter(fieldName:string, type:string):string;
    abstract createHead(className:string,context:DataClumpTypeContext,projectPath:string);
    abstract createConstructor(className:string,types:string[],fieldNames:string[]):string;
    abstract createTail():string;
    abstract getExtension():string;
    override getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.ClassExtraction]
    }
    savedClassPaths:Map<string,string>=new Map()
    getClassLocation(projectPath:string,className:string,dataClumpTypeContext:DataClumpTypeContext,locationProvider:ClassExtractionLocationProvider):string{
        if(this.savedClassPaths.has(className))return this.savedClassPaths.get(className)!
        let basePath=dirname(join(projectPath,locationProvider.getClassLocation(projectPath,dataClumpTypeContext)))
        this.savedClassPaths.set(className,join(basePath,className+"."+this.getExtension()))
        return join(basePath,className+"."+this.getExtension())
    }
    override handle(step:PipeLineStepType,context: DataClumpRefactoringContext, params: any):Promise<DataClumpRefactoringContext> {
        let detectorContext=context.getByType(DataClumpDetectorContext) as DataClumpDetectorContext;
        let nameFindingContext=context.getByType(NameFindingContext) as NameFindingContext;
        let newContext=new ClassExtractionContext();
        for(let dataClumpKey of detectorContext.getDataClumpKeys()){
            let suggestedName=nameFindingContext.getNameByDataClumpKey(dataClumpKey);
            if(suggestedName==undefined)continue;
            let dataClump=detectorContext.getDataClumpDetectionResult()[dataClumpKey]! as DataClumpTypeContext;
            let classBody=this.createHead(suggestedName,dataClump,context.getProjectPath());
            let fieldNames:string[]=[]
            let types:string[]=[]
            for(let param of Object.values(dataClump?.data_clump_data!)){
                classBody+=this.createField(param.name,param.type)
                classBody+=this.createGetter(param.name,param.type)
                classBody+=this.createSetter(param.name,param.type)
                fieldNames.push(param.name)
                types.push(param.type);

            }
            classBody+=this.createConstructor(suggestedName,types,fieldNames)
            classBody+=this.createTail();
            let classPath=this.getClassLocation(context.getProjectPath(),suggestedName,detectorContext.getDataClumpTypeContext(dataClumpKey),this.locationProvider)
            if(!fs.existsSync(classPath)){
                fs.writeFileSync(classPath,classBody)

            }
            newContext.setExtractedClassPath(dataClumpKey,classPath);
            

        }
        return Promise.resolve(context.buildNewContext(newContext))   
                
    }
        
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
        createdContexts.add(ClassExtractionContext.name)
    }
    addAditionalContextRequirementNames(pipeLineStep: PipeLineStepType, requirements: Set<string>): void {
        requirements.add(DataClumpDetectorContext.name)
        requirements.add(NameFindingContext.name)
    }


}