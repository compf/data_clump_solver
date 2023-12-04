import { LanguageModelInterface } from "../../../util/languageModel/LanguageModelInterface";
import { LanguageModelTemplateResolver, LanguageModelTemplateType } from "../../../util/languageModel/LanguageModelTemplateResolver";
import { PipeLineStep,PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { AbstractNameFindingStepHandler } from "./AbstractNameFindingStep";

export class LanguageModelNameFindingsStep extends AbstractNameFindingStepHandler{
    async getSuggestedName(names: string[]): Promise<string|null> {
        let resolver=LanguageModelTemplateResolver.fromTemplateType(LanguageModelTemplateType.SuggestName);
        let query = resolver.resolveTemplate({field_names_comma_separated:this.getQueryKey(names)});
        let suggestedName= await this.languageModel.prepareMessage(query).sendMessages(true);
        return  suggestedName.suggested_name
    }
    languageModel:LanguageModelInterface
   

    
    constructor(languageModel:LanguageModelInterface){
        super()
        this.languageModel=languageModel;
    }
    
}