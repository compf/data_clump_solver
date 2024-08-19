import { registerFromName, resolveFromConcreteName, resolveFromInterfaceName } from "../config/Configuration";
import { ASTBuildingContext, CodeObtainingContext, DataClumpDetectorContext, DataClumpRefactoringContext } from "../context/DataContext";
import { PipeLineStep } from "../pipeline/PipeLineStep";
import { DataClumpDetectorStep } from "../pipeline/stepHandler/dataClumpDetection/DataClumpDetectorStep";
import { DataClumpFilterStepHandler } from "../pipeline/stepHandler/dataClumpFiltering/DataClumpFilterStepHandler";
import { FileFilterHandler } from "../pipeline/stepHandler/fileFiltering/FileFilterHandler";
import { AllAST_FilesHandler, AllFilesHandler, CodeSnippetHandler, LargeLanguageModelHandler, SendAndClearHandler, SystemInstructionHandler } from "../pipeline/stepHandler/languageModelSpecific/LargeLanguageModelHandlers";
import { OutputHandler } from "../pipeline/stepHandler/languageModelSpecific/OutputHandler";
import { FileIO } from "../util/FileIO";
import { MetricCombiner } from "../util/filterUtils/MetricCombiner";
import { RankSampler } from "../util/filterUtils/Ranker";
import { AbstractLanguageModel, ChatMessage } from "../util/languageModel/AbstractLanguageModel";
import { LanguageModelTemplateResolver } from "../util/languageModel/LanguageModelTemplateResolver";
import { writeFileSync } from "../util/Utils";
import { getRepoDataFromUrl } from "../util/vcs/VCS_Service";
import { Arrayified, BaseEvaluator, init, Instance, InstanceBasedFileIO, InstanceCombination } from "./base_eval";
import {resolve} from "path"
type DetectEvalInstance = Instance & {
    inputType: string,
    margin: number,
    instructionType: string
}
type DetectEvalInstanceCombination =Arrayified<DetectEvalInstance>
export class DetectEval extends BaseEvaluator{
    
    async analyzeInstance(instance: DetectEvalInstance, context: DataClumpRefactoringContext): Promise<void> {
        let resolver= resolveFromConcreteName("LanguageModelTemplateResolver") as LanguageModelTemplateResolver;
       

        resolver.set("%{ast}", instance.inputType=="ast" ?  "chatGPT_templates/detect/represented_as_ast.template":"chatGPT_templates/empty_file.template");
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
        resolver.set(" %{data_clump_def}", instance.inputType=="ast" ?  "chatGPT_templates/detect/represented_as_ast.template":"chatGPT_templates/empty_file.template");
        let api=resolveFromInterfaceName("AbstractLanguageModel") as AbstractLanguageModel;
        let handlers:LargeLanguageModelHandler[]=[
            new SystemInstructionHandler({instructionPath:"chatGPT_templates/detect/instruction.template"})
        ]
        if(instance.inputType=="fullFile"){
            handlers.push(new AllFilesHandler())
        }
        else if(instance.inputType=="snippet"){
            handlers.push(new CodeSnippetHandler({additionalMargin:instance.margin}))
        }
        else if(instance.inputType=="ast"){
            handlers.push(new AllAST_FilesHandler())
        }
        let chat: ChatMessage[] = []
        let astContext=context.getByType(ASTBuildingContext)!
        for(let handler of handlers){
            chat.push(...await handler.handle(astContext,api,resolver))
        }
         let reply=await api.sendMessages(true)
         writeFileSync("detectResult.json", JSON.stringify(reply, null, 2));
    }
    createInstanceCombination(): DetectEvalInstanceCombination {
        return {
            instanceType: ["detect"],
            model: ["gpt-4-1106-preview"],
            temperature: [0.1, 0.5, 0.9],
            iteration: [0, 1, 2, 3, 4],
            inputType: [
                "ast",
                "fullFile",
                "snippet"],
            margin: [0, 1, 2, 5, 10],
            instructionType: [
                "definitionBased",
                "exampleBased", 
                "noDefinitionBased"]
        } 
    }
    simplifyInstance(instance: DetectEvalInstance): DetectEvalInstance {
        if(instance.inputType!="snippet"){
            delete instance["margin" as any];
         }
         return instance;
    }

    async initProject(url: string): Promise<DataClumpRefactoringContext | null> {
        console.log(url);
        registerFromName("FileUpdateMaxMetric", "FileUpdateMaxMetric", { })
   
        let context: DataClumpRefactoringContext = new CodeObtainingContext(resolve("cloned_projects"+"/"+getRepoDataFromUrl(url).repo))
        
        let fileFilter= new FileFilterHandler({metricName:"FileUpdateMaxMetric",rankThreshold:50})
        context=await fileFilter.handle(PipeLineStep.FileFiltering,context,{})
        let dcHandler = new DataClumpDetectorStep({});
      
     
        context= await dcHandler.handle(PipeLineStep.DataClumpDetection, context, {}) as DataClumpDetectorContext         
        let resolver= resolveFromConcreteName("LanguageModelTemplateResolver") as LanguageModelTemplateResolver;
        resolver.set("%{output_format}", "chatGPT_templates/data_clump_type_context_output_format.json");
     
        return context;
      
       
    }
    
}


async function main() {
    FileIO.instance=new InstanceBasedFileIO()
    let refactorEval = new DetectEval();
   await  refactorEval.analyzeProjects(init());
}

if (require.main === module) {
    main();
}