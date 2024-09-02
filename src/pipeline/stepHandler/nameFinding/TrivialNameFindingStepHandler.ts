import { DataClumpTypeContext, DataClumpsVariableFromContext, Dictionary } from "data-clumps-type-context";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { AbstractNameFindingStepHandler } from "./AbstractNameFindingStepHandler";
import { DataClumpRefactoringContext } from "../../../context/DataContext";

export class TrivialNameFindingStepHandler extends AbstractNameFindingStepHandler {
    getSuggestedName(nvarInfo: { name: string; type: string; }[], context: DataClumpRefactoringContext, counter: number): Promise<string | null> {

        let names = nvarInfo.map((it) => it.name)
        let result = names.sort().join("_")
        if(counter>0){
            result=result+counter
        }

        return Promise.resolve(result.at(0)?.toUpperCase() + result.substring(1))
    }



}