import { DataClumpTypeContext, DataClumpsVariableFromContext, Dictionary } from "data-clumps-type-context";
import { DataContextInterface } from "../../../context/DataContext";
import { PipeLineStep } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { AbstractNameFindingStepHandler } from "./AbstractNameFindingStep";

export class TrivialNameFindingStep extends AbstractNameFindingStepHandler{
   async getSuggestedName(names: string[]): Promise<string> {
       return  names.join("_")
    }
   
  
}