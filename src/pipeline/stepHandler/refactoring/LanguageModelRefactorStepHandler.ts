import { RefactoredContext } from "../../../context/DataContext";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { LanguageModelStepHandler } from "../languageModelSpecific/LanguageModelStepHandler";


export  class LanguageModelRefactorStepHandler extends LanguageModelStepHandler {
 

    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.ASTGeneration, PipeLineStep.DataClumpDetection, PipeLineStep.Refactoring]
    }
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
        createdContexts.add(RefactoredContext.name)

    }

}