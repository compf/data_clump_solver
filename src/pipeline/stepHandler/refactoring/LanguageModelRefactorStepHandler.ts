import { RefactoredContext } from "../../../context/DataContext";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { LanguageModelStepHandler } from "../languageModelSpecific/LanguageModelStepHandler";

/**
 * Handles the refactoring step via an LLM. Implementation is outsourced to the LanguageModelStepHandler
 */
export  class LanguageModelRefactorStepHandler extends LanguageModelStepHandler {
 

    getExecutableSteps(): PipeLineStepType[] {
        return [ PipeLineStep.Refactoring]
    }
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
        createdContexts.add(RefactoredContext.name)

    }

}