import { resolveFromConcreteName, resolveFromInterfaceName } from "../../../config/Configuration";
import { DataClumpRefactoringContext } from "../../../context/DataContext";
import { AbstractLanguageModel } from "../../../util/languageModel/AbstractLanguageModel";
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
            if( this.args==undefined || !this.args.languageModelName){
                this.languageModel=resolveFromInterfaceName(AbstractLanguageModel.name) as AbstractLanguageModel
            }
            else{
            this.languageModel = resolveFromConcreteName(this.args.languageModelName) as AbstractLanguageModel;
            }
        }
        let resolver=resolveFromConcreteName(LanguageModelTemplateResolver.name) as LanguageModelTemplateResolver
        let additionalReplacements={
            "${field_names}": this.getQueryKey(variableInfos),
            "${quantifier}":counter>0?"another":"a",
            "${programming_language}":context.getProgrammingLanguage()
        }
        let query = resolver.resolveFromTemplateType(LanguageModelTemplateType.SuggestName,additionalReplacements);
        this.languageModel.prepareMessage(query)
        let suggestedName=await this.languageModel.sendMessages(false);
        return JSON.parse(suggestedName.messages[0]).suggested_name
    }
    languageModel: AbstractLanguageModel | null = null;
    args: any


    constructor(args: LanguageModelArgs) {
        super(args)
        this.args = args;

    }
    nameFound(): void {
        this.languageModel?.clear()
    }
    

}