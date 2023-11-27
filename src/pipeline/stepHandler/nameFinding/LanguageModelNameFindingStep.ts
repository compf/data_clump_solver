import { LanguageModelInterface } from "../../../util/languageModel/LanguageModelInterface";
import { PipeLineStep } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { AbstractNameFindingStepHandler } from "./AbstractNameFindingStep";

export class LanguageModelNameFindingsStep extends AbstractNameFindingStepHandler{
    async getSuggestedName(names: string[]): Promise<string|null> {
        let query = "Can you suggest a class name for the fields " + this.getQueryKey(names) + "? One word only!";
        return  this.languageModel.prepareMessage(query).sendMessages(true)!!;
    }
    languageModel:LanguageModelInterface
   

    
    constructor(languageModel:LanguageModelInterface){
        super()
        this.languageModel=languageModel;
    }
    
}