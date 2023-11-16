import { DataClumpRefactoringContext } from "../../context/DataContext";
import { PipeLineStep } from "../PipeLineStep";
import { AbstractStepHandler } from "./AbstractStepHandler";

export class DoNothingStepHandler extends AbstractStepHandler {
    handle(context: DataClumpRefactoringContext, params:any) {
        return Promise.resolve(context);
    }
    getExecutableSteps(): PipeLineStep[] {
        return [PipeLineStep.FileFiltering,PipeLineStep.DataClumpFiltering]
    }
    
}