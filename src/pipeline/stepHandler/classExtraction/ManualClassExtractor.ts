import { DataContextInterface } from "../../../context/DataContext";
import { PipeLineStep } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";

export abstract class ManualClassExtractor extends AbstractStepHandler{
    abstract createField(fieldName:string, type:string):string;
    abstract createGetter(fieldName:string, type:string):string;
    abstract createSetter(fieldName:string, type:string):string;
    abstract createHead(className:string);
    abstract createTail():string;
    override getExecutableSteps(): PipeLineStep[] {
        return [PipeLineStep.ClassExtraction]
    }
    override handle(context: DataContextInterface, params: any) {
        for(let nameDataClumpKey of (context.NameFinding.nameDataClumpKey)){
            let suggestedName=nameDataClumpKey[0]
            let dataClumpKey=nameDataClumpKey[1]

            let dataClump=context.DataClumpDetector.dataClumpDetectionResult?.data_clumps[dataClumpKey]
            let classBody=this.createHead(suggestedName);
            for(let param of Object.values(dataClump?.data_clump_data!)){
                classBody+=this.createField(param.name,param.type)
                classBody+=this.createGetter(param.name,param.type)
                classBody+=this.createSetter(param.name,param.type)


            }
            classBody+=this.createTail();
            console.log(classBody)

        }
    }


}