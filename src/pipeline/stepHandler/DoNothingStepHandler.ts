import { DataClumpRefactoringContext, RefactoredContext } from "../../context/DataContext";
import { PipeLineStep,PipeLineStepType } from "../PipeLineStep";
import { AbstractStepHandler } from "./AbstractStepHandler";

/**
 * A step handler that does nothing
 */
export class DoNothingStepHandler extends AbstractStepHandler {
    handle(step:PipeLineStepType,context: DataClumpRefactoringContext, params:any) {
        return Promise.resolve(context);
    }
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.FileFiltering,PipeLineStep.DataClumpFiltering,PipeLineStep.ASTGeneration,PipeLineStep.DataClumpDetection,PipeLineStep.NameFinding,PipeLineStep.ClassExtraction,PipeLineStep.ReferenceFinding,PipeLineStep.Refactoring]
    }
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
        createdContexts.add(RefactoredContext.name)
    }
    
}