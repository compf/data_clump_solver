import { DataContextInterface } from "../../../context/DataContext";
import { LanguageModelInterface } from "../../../util/languageModel/LanguageModelInterface";
import { PipeLineStep } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { AbstractNameFindingStepHandler } from "./AbstractNameFindingStep";

export class LanguageModelNameFindingsStep extends AbstractNameFindingStepHandler{
    async getSuggestedName(names: string[]): Promise<string> {
        let query = "Can you suggest a class name for the fields " + this.getQueryKey(names) + "? One word only!";
        return  this.languageModel.sendMessage(query);
    }
    languageModel:LanguageModelInterface
   

    
    constructor(languageModel:LanguageModelInterface){
        super()
        this.languageModel=languageModel;
    }
    
}