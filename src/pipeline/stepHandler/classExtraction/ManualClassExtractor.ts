import { DataClumpTypeContext } from "data-clumps-type-context";
import { ClassExtractionContext, DataClumpDetectorContext, DataClumpRefactoringContext, NameFindingContext } from "../../../context/DataContext";
import { PipeLineStep } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";

export abstract class ManualClassExtractor extends AbstractStepHandler{
    abstract createField(fieldName:string, type:string):string;
    abstract createGetter(fieldName:string, type:string):string;
    abstract createSetter(fieldName:string, type:string):string;
    abstract createHead(className:string);
    abstract createConstructor(className:string,types:string[],fieldNames:string[]):string;
    abstract createTail():string;
    override getExecutableSteps(): PipeLineStep[] {
        return [PipeLineStep.ClassExtraction]
    }
    override handle(context: DataClumpRefactoringContext, params: any):Promise<DataClumpRefactoringContext> {
        let detectorContext=context.getByType(DataClumpDetectorContext) as DataClumpDetectorContext;
        let nameFindingContext=context.getByType(NameFindingContext) as NameFindingContext;
        let dataClumpKeyClassBody=new Map<string,string>();
        for(let dataClumpKey of detectorContext.getDataClumpKeys()){
            let suggestedName=nameFindingContext.getNameByDataClumpKey(dataClumpKey);

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
            dataClumpKeyClassBody.set(dataClumpKey,classBody);
            

        }
        return Promise.resolve(context.buildNewContext(new ClassExtractionContext(dataClumpKeyClassBody)))
    }


}