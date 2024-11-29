import { RefactoredContext } from "../../../context/DataContext";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
const Levenshtein = require("levenshtein")
import { LanguageModelStepHandler } from "../languageModelSpecific/LanguageModelStepHandler";


export  class LanguageModelDetectOrRefactorHandler extends LanguageModelStepHandler {
 

    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.ASTGeneration, PipeLineStep.DataClumpDetection, PipeLineStep.Refactoring]
    }
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
        createdContexts.add(RefactoredContext.name)

    }

}