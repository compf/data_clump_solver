import { DataClumpRefactoringContext } from "../../context/DataContext";
import { PipeLineStep,PipeLineStepType } from "../PipeLineStep";
import { AbstractStepHandler } from "./AbstractStepHandler";

export class DoNothingStepHandler extends AbstractStepHandler {
    handle(context: DataClumpRefactoringContext, params:any) {
        return Promise.resolve(context);
    }
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.FileFiltering,PipeLineStep.DataClumpFiltering]
    }
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
        
    }
    
}