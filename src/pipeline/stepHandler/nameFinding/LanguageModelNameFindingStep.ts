import { LanguageModelCategory, registerFromName, resolveFromName } from "../../../config/Configuration";
import { LanguageModelInterface } from "../../../util/languageModel/LanguageModelInterface";
import { LanguageModelTemplateResolver, LanguageModelTemplateType } from "../../../util/languageModel/LanguageModelTemplateResolver";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { AbstractNameFindingStepHandler } from "./AbstractNameFindingStep";
type LanguageModelArgs = {
    languageModelName: string,
    languageModelArgs: any
}
const FILE_NAMES_SEPARATED="${field_names_comma_separated}"
export class LanguageModelNameFindingsStep extends AbstractNameFindingStepHandler {
    async getSuggestedName(names: string[]): Promise<string | null> {
        if (!this.languageModel) {
            this.languageModel = resolveFromName(this.args.languageModelName) as LanguageModelInterface;

        }
        let resolver=resolveFromName(LanguageModelTemplateResolver.name) as LanguageModelTemplateResolver
        let query = resolver.resolveFromTemplateType(LanguageModelTemplateType.SuggestName,{ FILE_NAMES_SEPARATED: this.getQueryKey(names) });
        this.languageModel.prepareMessage(query)
        let suggestedName=await this.languageModel.sendMessages(true);
        return suggestedName.messages[0]
    }
    languageModel: LanguageModelInterface | null = null;
    args: any


    constructor(args: LanguageModelArgs) {
        super()
        this.args = args;
        registerFromName(args.languageModelName, LanguageModelCategory, args.languageModelArgs)

    }

}