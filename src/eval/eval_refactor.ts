import simpleGit from "simple-git";
import { registerFromName, resolveFromConcreteName, resolveFromInterfaceName } from "../config/Configuration";
import { DataClumpRefactoringContext, LargeLanguageModelContext } from "../context/DataContext";
import { PipeLineStep } from "../pipeline/PipeLineStep";
import { DataClumpFilterStepHandler } from "../pipeline/stepHandler/dataClumpFiltering/DataClumpFilterStepHandler";
import { LanguageModelDetectOrRefactorHandler } from "../pipeline/stepHandler/languageModelSpecific/LanguageModelDetectOrRefactorHandler";
import { AllFilesHandler, CodeSnippetHandler, LargeLanguageModelHandler, SendAndClearHandler, SendHandler, SimpleInstructionHandler, SystemInstructionHandler, ValidationResultHandler } from "../pipeline/stepHandler/languageModelSpecific/LargeLanguageModelHandlers";
import { ModifiedFilesProposal, parseChat, SimpleProposalHandler, StubOutputHandler } from "../pipeline/stepHandler/languageModelSpecific/OutputHandler";
import { GradleBuildValidationStepHandler } from "../pipeline/stepHandler/validation/GradleBuildValidationStepHandler";
import { MavenBuildValidationStepHandler } from "../pipeline/stepHandler/validation/MavenBuildValidationStepHandler";
import { MultipleAttemptsValidationHandler } from "../pipeline/stepHandler/validation/MultipleAttemptsValidationHandler";
import { FileIO } from "../util/FileIO";
import { AbstractLanguageModel, ChatMessage } from "../util/languageModel/AbstractLanguageModel";
import { ChatGPTInterface } from "../util/languageModel/ChatGPTInterface";
import { LanguageModelTemplateResolver } from "../util/languageModel/LanguageModelTemplateResolver";
import { StubInterface } from "../util/languageModel/StubInterface";
import { writeFileSync } from "../util/Utils";
import { Arrayified, BaseEvaluator, getInstancePath, init, Instance, InstanceBasedFileIO, InstanceCombination, isDebug } from "./base_eval";
  type RefactorInstance=Instance &{

    instructionType:string,
    inputFormat:string,
    margin:number
    
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
    getRankerThreshold(): number {
        return 5;
    }
    simplifyInstance(instance: RefactorInstance): RefactorInstance {
        if(instance.inputFormat!="instructionSnippet"){
            delete instance["margin" as any];
         }
         return instance
    }
    createInstanceCombination(): RefactorInstanceCombination {
        let result= {
            instanceType: ["refactor"],
            model: ["gpt-4-1106-preview"],
            temperature: [0.1, 0.5, 0.9],
            instructionType: [
                "definitionBased" 
               // "exampleBased",
                // "noDefinitionBased"
                ],
            inputFormat:[
                "instruction"
                ,
                "instructionSnippet"
            ],
            iteration: [0, 1, 2, 3, 4],
            margin:[0,1,2,5,10]
        }
        if(isDebug()){
            result.iteration=[0]
            result.temperature=[0.1]
        }
        return result
    }
    async initProject(url: string): Promise<DataClumpRefactoringContext | null> {
        let context=await super.initProject(url);
        let git=simpleGit(context?.getProjectPath())
        if(context==null){
            return null;
        }
        let filter = new DataClumpFilterStepHandler({
            rankThreshold: this.getRankerThreshold(),
            rankerName: "MetricCombiner",
        });
        context = await filter.handle(PipeLineStep.DataClumpFiltering, context, {});
        await git.checkout("-bcontext" )
        await git.add("-A")
        await git.commit("context")

        return context;

    }

    async analyzeInstance(instance: RefactorInstance, context:DataClumpRefactoringContext): Promise<void> {
        let git= simpleGit(context.getProjectPath())
        let g=await git.checkout("-b" +getInstancePath([],"-",instance))

        let refactorHandlers : LargeLanguageModelHandler[]= [
            new SystemInstructionHandler({
                instructionPath: `chatGPT_templates/refactor/${instance.inputFormat}.template`
            }),
           
        ];
        let sourceHandler =instance.inputFormat=="instructionSnippet" ?new CodeSnippetHandler({additionalMargin:instance.margin}) : new AllFilesHandler()
        refactorHandlers.push(sourceHandler)
        refactorHandlers.push(new SendHandler());
        let resolver=resolveFromConcreteName(LanguageModelTemplateResolver.name) as LanguageModelTemplateResolver;
        resolver.set("%{output_format}", "chatGPT_templates/use_json.template")
        resolver.set("%{output_format_refactor}", "chatGPT_templates/json_format_refactor_piecewise.json")
        let defPath="";
        if(instance.instructionType=="definitionBased"){
            defPath="chatGPT_templates/data_clump_def.template"
        }
        else if(instance.instructionType=="exampleBased"){
            defPath="chatGPT_templates/data_clump_examples.template"
        }
        else{
            defPath="chatGPT_templates/empty_file.template"
        }
        resolver.set("%{data_clump_def}", defPath);
        let multiValidationHandler=new MultipleAttemptsValidationHandler({
            innerValidator: new GradleBuildValidationStepHandler({skipTests:true}),
            handlers: [
                new SimpleInstructionHandler({instructionPath:"chatGPT_templates/validation/fix_errors.template"}),
                new ValidationResultHandler(),
                new SimpleInstructionHandler({instructionPath:"chatGPT_templates/validation/current_state.template"}),
                sourceHandler,
                new SendHandler()
            ]
            
        })
        multiValidationHandler.afterValidationStep=async (attempt:number)=>{
            await git.add("-A")
            await git.commit("validation "+attempt)

        }

        let api=resolveFromConcreteName(AbstractLanguageModel.name) as AbstractLanguageModel;
        let chat:ChatMessage[]=[]
      
        for (let h of refactorHandlers) {
            chat.push(... (await h.handle(context, api,resolver)));
        }
        
        let reply = chat[chat.length - 1];
        let stubOutputHandler = new StubOutputHandler();
        stubOutputHandler.apply=true;
        context=context.buildNewContext(await parseChat(chat,PipeLineStep.Refactoring,context,stubOutputHandler));
        await git.add("-A")
        await git.commit("refactoring ")
        context=context.buildNewContext(await stubOutputHandler.chooseProposal(context));
        
        let count=await multiValidationHandler.getValidationCount(context);
        await git.checkout("context" )
        writeFileSync("validation_count.json",JSON.stringify(count,null,2))
        console.log("Validation count",count);
        process.exit(-1)
    }
   
}

if (require.main === module) {
    FileIO.instance=new InstanceBasedFileIO()
    let refactorEval = new RefactorEval();
    refactorEval.analyzeProject(init());

}