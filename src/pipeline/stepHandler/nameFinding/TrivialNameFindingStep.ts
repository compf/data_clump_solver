import { DataClumpTypeContext, DataClumpsVariableFromContext, Dictionary } from "data-clumps-type-context";
import { DataContextInterface } from "../../../context/DataContext";
import { PipeLineStep } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";

export class TrivialNameFindingStep extends AbstractStepHandler{
    handle(context: DataContextInterface, params:any) {
        for(let dataClumpKey of Object.keys(context.DataClumpDetector.dataClumpDetectionResult!.data_clumps)){
            
            let dataClump=context.DataClumpDetector.dataClumpDetectionResult!.data_clumps[dataClumpKey]
            let result:string[]=[]
            for(let k of  Object.keys(dataClump.data_clump_data)){
                let name=dataClump.data_clump_data[k].name
            
                result.push(name)
    
            }
            context.NameFinding.names[dataClump.key]=result.join(",")
            console.log(context.NameFinding.names[dataClump.key])
        }
        
        
    }
    getExecutableSteps(): PipeLineStep[] {
        return [PipeLineStep.NameFinding]
    }

}