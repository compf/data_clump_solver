import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../../context/DataContext";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";

export class LargeLanguageModelDetector extends AbstractStepHandler{
    handle(step: PipeLineStepType, context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
       return null as any
    }

    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.DataClumpDetection]
    }
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
        createdContexts.add(DataClumpDetectorContext.name)
    }
    
}