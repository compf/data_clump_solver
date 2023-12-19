import { DataClumpTypeContext, DataClumpsVariableFromContext, Dictionary } from "data-clumps-type-context";
import { PipeLineStep,PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { AbstractNameFindingStepHandler } from "./AbstractNameFindingStep";

export class TrivialNameFindingStep extends AbstractNameFindingStepHandler{
   async getSuggestedName(names: string[]): Promise<string> {
       let result=  names.sort().join("_")
       return result.at(0)?.toUpperCase()+result.substring(1)
    }
   
  
}