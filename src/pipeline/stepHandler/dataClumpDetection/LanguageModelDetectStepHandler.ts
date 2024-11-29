import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../../context/DataContext";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { LanguageModelStepHandler } from "../languageModelSpecific/LanguageModelStepHandler";

export class LargeLanguageModelDetector extends LanguageModelStepHandler{


    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.DataClumpDetection]
    }
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
        createdContexts.add(DataClumpDetectorContext.name)
    }
    
}