import { registerFromName, resolveFromConcreteName, resolveFromInterfaceName } from "../config/Configuration";
import { DataClumpRefactoringContext, LargeLanguageModelContext } from "../context/DataContext";
import { PipeLineStep } from "../pipeline/PipeLineStep";
import { DataClumpFilterStepHandler } from "../pipeline/stepHandler/dataClumpFiltering/DataClumpFilterStepHandler";
import { LanguageModelDetectOrRefactorHandler } from "../pipeline/stepHandler/languageModelSpecific/LanguageModelDetectOrRefactorHandler";
import { CodeSnippetHandler, LargeLanguageModelHandler, SendAndClearHandler, SendHandler, SimpleInstructionHandler, SystemInstructionHandler, ValidationResultHandler } from "../pipeline/stepHandler/languageModelSpecific/LargeLanguageModelHandlers";
import { parseChat, StubOutputHandler } from "../pipeline/stepHandler/languageModelSpecific/OutputHandler";
import { GradleBuildValidationStepHandler } from "../pipeline/stepHandler/validation/GradleBuildValidationStepHandler";
import { MultipleAttemptsValidationHandler } from "../pipeline/stepHandler/validation/MultipleAttemptsValidationHandler";
import { FileIO } from "../util/FileIO";
import { AbstractLanguageModel, ChatMessage } from "../util/languageModel/AbstractLanguageModel";
import { ChatGPTInterface } from "../util/languageModel/ChatGPTInterface";
import { LanguageModelTemplateResolver } from "../util/languageModel/LanguageModelTemplateResolver";
import { StubInterface } from "../util/languageModel/StubInterface";
import { Arrayified, BaseEvaluator, Instance, InstanceBasedFileIO, InstanceCombination } from "./base_eval";
import { JavaTestRetriever, ProjectListByPullRequest } from "./project_list_retriever";
  type RefactorInstance=Instance &{

    instructionType:string,
    inputFormat:string,
    
 }

 type RefactorInstanceCombination=Arrayified<RefactorInstance>
 const refactorHandlersName="refactorHandlers"
    const multiValidationHandlerName="multiValidationHandler"
class RefactorEval extends BaseEvaluator {
    getOutputPath(): string {
        return "stuff/eval/refactor_eval.json";
    }
    isProjectFullyAnalyzed(): boolean {
        return false;
    }

    createInstanceCombination(): RefactorInstanceCombination {
        return {
            instanceType: ["refactor"],
            model: ["gpt-4-1106-preview"],
            temperature: [0.1, 0.5, 0.9],
            instructionType: ["definitionBased"],
            inputFormat:["instructionSnippet"],
            iteration: [0, 1, 2, 3, 4]
        }
    }
    async initProject(url: string): Promise<DataClumpRefactoringContext | null> {
        let context=await super.initProject(url);
        if(context==null){
            return null;
        }
        let filter = new DataClumpFilterStepHandler({
            rankThreshold: 10
        });
        context = await filter.handle(PipeLineStep.DataClumpFiltering, context, {});
        registerFromName(ChatGPTInterface.name, AbstractLanguageModel.name, {format:"json_object"});

        return context;

    }

    async analyzeInstance(instance: RefactorInstance, context:DataClumpRefactoringContext): Promise<void> {

        let refactorHandlers = [
            new SystemInstructionHandler({
                instructionPath: `chatGPT_templates/refactor/${instance.instructionType}/givenContext/${instance.inputFormat}.template`
            }),
            new CodeSnippetHandler({ additionalMargin: 5 }),
            new SendHandler()
        ];

        let multiValidationHandler=new MultipleAttemptsValidationHandler({
            innerValidator: new GradleBuildValidationStepHandler({skipTests:true}),
            handlers: [
                new SimpleInstructionHandler({instructionPath:"chatGPT_templates/validation/fix_errors.template"}),
                new ValidationResultHandler(),
                new SendHandler()
            ]
            
        })

        let api=resolveFromConcreteName(AbstractLanguageModel.name) as AbstractLanguageModel;
        let chat:ChatMessage[]=[]
      
        let resolver=resolveFromConcreteName(LanguageModelTemplateResolver.name) as LanguageModelTemplateResolver;
        for (let h of refactorHandlers) {
            chat.push(... (await h.handle(context, api,resolver)));
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

if (require.main === module) {
    registerFromName("InstanceBasedFileIO","FileIO",{})
    let refactorEval = new RefactorEval();
    refactorEval.analyzeProjects(new JavaTestRetriever());

}