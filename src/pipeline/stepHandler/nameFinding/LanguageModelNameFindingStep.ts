import { LanguageModelCategory, registerFromName, resolveFromName } from "../../../config/Configuration";
import { DataClumpRefactoringContext } from "../../../context/DataContext";
import { LanguageModelInterface } from "../../../util/languageModel/LanguageModelInterface";
import { LanguageModelTemplateResolver, LanguageModelTemplateType } from "../../../util/languageModel/LanguageModelTemplateResolver";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { AbstractNameFindingStepHandler } from "./AbstractNameFindingStep";
type LanguageModelArgs = {
    languageModelName: string,
}
const FIELD_NAMES="${field_names}"
export class LanguageModelNameFindingsStep extends AbstractNameFindingStepHandler {
    async getSuggestedName(variableInfos: {name:string,type:string}[],context:DataClumpRefactoringContext,counter:number): Promise<string | null> {
        if (!this.languageModel) {
            this.languageModel = resolveFromName(this.args.languageModelName) as LanguageModelInterface;
        }
        let resolver=resolveFromName(LanguageModelTemplateResolver.name) as LanguageModelTemplateResolver
        let additionalReplacements={
            "${field_names}": this.getQueryKey(variableInfos),
            "${quantifier}":counter>0?"another":"a",
            "${programming_language}":context.getProgrammingLanguage()
        }
        let query = resolver.resolveFromTemplateType(LanguageModelTemplateType.SuggestName,additionalReplacements);
        this.languageModel.prepareMessage(query)
        let suggestedName=await this.languageModel.sendMessages(false);
        return suggestedName.messages[0]
    }
    languageModel: LanguageModelInterface | null = null;
    args: any


    constructor(args: LanguageModelArgs) {
        super(args)
        this.args = args;

    }
    nameFound(): void {
        this.languageModel?.clear()
    }
    

}