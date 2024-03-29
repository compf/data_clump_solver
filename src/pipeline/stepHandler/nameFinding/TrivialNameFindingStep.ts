import { DataClumpTypeContext, DataClumpsVariableFromContext, Dictionary } from "data-clumps-type-context";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { AbstractNameFindingStepHandler } from "./AbstractNameFindingStep";
import { DataClumpRefactoringContext } from "../../../context/DataContext";

export class TrivialNameFindingStep extends AbstractNameFindingStepHandler {

    getSuggestedName(nvarInfo: { name: string; type: string; }[], context: DataClumpRefactoringContext, counter: number): Promise<string | null> {

        let names = nvarInfo.map((it) => it.name)
        let result = names.sort().join("_")
        return Promise.resolve(result.at(0)?.toUpperCase() + result.substring(1))
    }



}