import { registerFromName, resolveFromConcreteName } from "../config/Configuration";
import { DataClumpRefactoringContext, LargeLanguageModelContext } from "../context/DataContext";
import { PipeLineStep } from "../pipeline/PipeLineStep";
import { DataClumpFilterStepHandler } from "../pipeline/stepHandler/dataClumpFiltering/DataClumpFilterStepHandler";
import { LanguageModelDetectOrRefactorHandler } from "../pipeline/stepHandler/languageModelSpecific/LanguageModelDetectOrRefactorHandler";
import { CodeSnippetHandler, SendAndClearHandler, SendHandler, SimpleInstructionHandler, SystemInstructionHandler, ValidationResultHandler } from "../pipeline/stepHandler/languageModelSpecific/LargeLanguageModelHandlers";
import { parseChat, StubOutputHandler } from "../pipeline/stepHandler/languageModelSpecific/OutputHandler";
import { GradleBuildValidationStepHandler } from "../pipeline/stepHandler/validation/GradleBuildValidationStepHandler";
import { MultipleAttemptsValidationHandler } from "../pipeline/stepHandler/validation/MultipleAttemptsValidationHandler";
import { AbstractLanguageModel, ChatMessage } from "../util/languageModel/AbstractLanguageModel";
import { ChatGPTInterface } from "../util/languageModel/ChatGPTInterface";
import { LanguageModelTemplateResolver } from "../util/languageModel/LanguageModelTemplateResolver";
import { StubInterface } from "../util/languageModel/StubInterface";
import { BaseEvaluator } from "./base_eval";
import { JavaTestRetriever, ProjectListByPullRequest } from "./project_list_retriever";

class RefactorEval extends BaseEvaluator {
    getOutputPath(): string {
        return "stuff/eval/refactor_eval.json";
    }
    isProjectFullyAnaylzed(): boolean {
        return false;
    }
    async analyze(context: DataClumpRefactoringContext): Promise<void> {
        let filter = new DataClumpFilterStepHandler({
            rankThreshold: 10
        });
        context = await filter.handle(PipeLineStep.DataClumpFiltering, context, {});
        registerFromName(ChatGPTInterface.name, AbstractLanguageModel.name, {format:"json_object"});
        let api=resolveFromConcreteName(AbstractLanguageModel.name) as ChatGPTInterface as AbstractLanguageModel;
        let apiParameters = this.createModelTemperaturesArray(["gpt-4-1106-preview"], [0.1, 0.5, 0.9], 1);
        let refactorHandlers = [
            new SystemInstructionHandler({
                instructionPath: "chatGPT_templates/refactor/definitionBased/givenContext/instructionSnippet.template"
            }),
            new CodeSnippetHandler({ additionalMargin: 5 }),
            new SendHandler()
        ];
        registerFromName("LanguageModelTemplateResolver", "LanguageModelTemplateResolver", {
            "${programming_language}": "Java",
            "%{examples}": "chatGPT_templates/DataClumpExamples.java",
            "%{refactor_instruction}": "chatGPT_templates/refactor_one_data_clump.template",
            "%{detected_data_clumps}": "chatGPT_templates/refactor/detected_data_clumps_minified.json",
            "%{output_format_refactor}": "chatGPT_templates/json_format_refactor_piecewise.json",
            "%{llm_output_format}": "chatGPT_templates/use_markdown.template"
        })
        let resolver=resolveFromConcreteName("LanguageModelTemplateResolver") as LanguageModelTemplateResolver;

        let multiValidationHandler=new MultipleAttemptsValidationHandler({
            innerValidator: new GradleBuildValidationStepHandler({skipTests:true}),
            handlers: [
                new SimpleInstructionHandler({instructionPath:"chatGPT_templates/validation/fix_errors.template"}),
                new ValidationResultHandler(),
                new SendHandler()
            ]
            
        })


        for (let param of apiParameters) {
            api.clear();
            api.resetParameters(param);
            let chat:ChatMessage[]=[]
            for (let h of refactorHandlers) {
                chat.push(... await h.handle(context, api,resolver));
            }

            let reply = chat[chat.length - 1];
            let outputHandler = new StubOutputHandler();
            context=context.buildNewContext(await parseChat(chat,PipeLineStep.Refactoring,context,outputHandler));
            context=context.buildNewContext(await outputHandler.chooseProposal(context));
            let count=await multiValidationHandler.getValidationCount(context);
            console.log("Validation count",count);
            throw "cool"

   
        }
    }
}

if (require.main === module) {
    let refactorEval = new RefactorEval();
    refactorEval.analyzeProjects(new JavaTestRetriever());

}