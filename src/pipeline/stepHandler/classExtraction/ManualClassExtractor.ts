import { DataClumpTypeContext } from "data-clumps-type-context";
import { ClassExtractionContext, DataClumpDetectorContext, DataClumpRefactoringContext, NameFindingContext } from "../../../context/DataContext";
import { PipeLineStep,PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import {join,resolve,dirname} from "path"
import fs from "fs"
export abstract class ManualClassExtractor extends AbstractStepHandler{
    abstract createField(fieldName:string, type:string):string;
    abstract createGetter(fieldName:string, type:string):string;
    abstract createSetter(fieldName:string, type:string):string;
    abstract createHead(className:string);
    abstract createConstructor(className:string,types:string[],fieldNames:string[]):string;
    abstract createTail():string;
    abstract getExtension():string;
    override getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.ClassExtraction]
    }
    getClassLocation(projectPath:string,className:string,dataClumpTypeContext:DataClumpTypeContext):string{
        let basePath=dirname(join(projectPath,dataClumpTypeContext.from_file_path))
        return join(basePath,className+"."+this.getExtension())
    }
    override handle(context: DataClumpRefactoringContext, params: any):Promise<DataClumpRefactoringContext> {
        let detectorContext=context.getByType(DataClumpDetectorContext) as DataClumpDetectorContext;
        let nameFindingContext=context.getByType(NameFindingContext) as NameFindingContext;
        let newContext=new ClassExtractionContext();
        for(let dataClumpKey of detectorContext.getDataClumpKeys()){
            let suggestedName=nameFindingContext.getNameByDataClumpKey(dataClumpKey);
            if(suggestedName==undefined)continue;
            let dataClump=detectorContext.getDataClumpDetectionResult()[dataClumpKey]! as DataClumpTypeContext;
            let classBody=this.createHead(suggestedName);
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
            let classPath=this.getClassLocation(context.getProjectPath(),suggestedName,detectorContext.getDataClumpTypeContext(dataClumpKey))
            if(!fs.existsSync(resolve(context.getProjectPath(),classPath))){
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