import { registerFromName, resolveFromConcreteName, resolveFromInterfaceName } from "../config/Configuration";
import { ASTBuildingContext, CodeObtainingContext, DataClumpDetectorContext, DataClumpRefactoringContext, GitRepositoryContext, RelevantLocationsContext } from "../context/DataContext";
import { PipeLineStep } from "../pipeline/PipeLineStep";
import { DataClumpDoctorStepHandler } from "../pipeline/stepHandler/dataClumpDetection/DataClumpDoctorStepHandler";
import { DataClumpFilterStepHandler } from "../pipeline/stepHandler/dataClumpFiltering/DataClumpFilterStepHandler";
import { FileFilterHandler } from "../pipeline/stepHandler/fileFiltering/FileFilterHandler";
import { RecentlyChangedFilesStephandler } from "../pipeline/stepHandler/fileFiltering/RecentlyChangedFilesStephandler";
import { AllAST_FilesHandler, AllFilesHandler, CodeSnippetHandler, LargeLanguageModelHandler, SendAndClearHandler, SystemInstructionHandler } from "../pipeline/stepHandler/languageModelSpecific/LargeLanguageModelHandlers";
import { OutputHandler } from "../pipeline/stepHandler/languageModelSpecific/OutputHandler";
import { FileIO } from "../util/FileIO";
import { MetricCombiner } from "../util/filterUtils/MetricCombiner";
import { RankSampler } from "../util/filterUtils/Ranker";
import { AbstractLanguageModel, ChatMessage } from "../util/languageModel/AbstractLanguageModel";
import { LanguageModelTemplateResolver } from "../util/languageModel/LanguageModelTemplateResolver";
import { waitSync, writeFileSync } from "../util/Utils";
import { getRepoDataFromUrl } from "../util/vcs/VCS_Service";
import { Arrayified, BaseEvaluator, init, Instance, InstanceBasedFileIO, InstanceCombination, isDebug } from "./base_eval";
import {resolve} from "path"
type DetectEvalInstance = Instance & {

}
type DetectEvalInstanceCombination =Arrayified<DetectEvalInstance>
export class DetectEval extends BaseEvaluator{
    
    async analyzeInstance(instance: DetectEvalInstance, context: DataClumpRefactoringContext): Promise<void> {
        let resolver= resolveFromConcreteName("LanguageModelTemplateResolver") as LanguageModelTemplateResolver;
       

        resolver.set("%{ast}", instance.inputFormat=="ast" ?  "chatGPT_templates/detect/represented_as_ast.template":"chatGPT_templates/empty_file.template");
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
        let api=resolveFromInterfaceName("AbstractLanguageModel") as AbstractLanguageModel;
        let handlers:LargeLanguageModelHandler[]=[
            new SystemInstructionHandler({instructionPath:"chatGPT_templates/detect/instruction.template"})
        ]
        if(instance.inputFormat=="fullFile"){
            handlers.push(new AllFilesHandler())
        }
        else if(instance.inputFormat=="snippet"){
            handlers.push(new CodeSnippetHandler({additionalMargin:instance.margin}))
        }
        else if(instance.inputFormat=="ast"){
            handlers.push(new AllAST_FilesHandler())
        }
        let chat: ChatMessage[] = []
        for(let handler of handlers){
            chat.push(...await handler.handle(context,api,resolver))
        }
         let reply=await api.sendMessages(true)
         writeFileSync("detectResult.json", JSON.stringify(reply, null, 2));
         waitSync(60*1000)
    }
    getNumDataClumpsPerBlock(): number {
        return 3
    }
 
    createInstanceCombination(): DetectEvalInstanceCombination {
        let result= {
            instanceType: ["detect"],
            model: ["gpt-4-1106-preview"],
            temperature: [
                0.1, 
                0.5, 
                0.9
            ],
            iteration: [0, 1, 2, 3, 4,5,6,7,8,9],
            inputFormat: [
               // "ast",
                "fullFile",
                "snippet"],
            margin: [
                0,
                // 1, 
                 2,
                  5, 
                  //10
                ],
                projectName:[],
            instructionType: [
                "definitionBased",
               // "exampleBased", 
            //"noDefinitionBased"
                ]
        } 
        if(isDebug()){
            result.iteration=[0]
            result.temperature=[0.1]
        }
        return result
    }
    simplifyInstance(instance: DetectEvalInstance): DetectEvalInstance {
        if(instance.inputFormat!="snippet"){
            delete instance["margin" as any];
         }
         return instance;
    }

    async initProject(url: string): Promise<DataClumpRefactoringContext | null> {
        console.log(url);
        if(this.combineDetectorAST){
            let context=await super.initProject(url);
           // if(1==1)throw "tes"
            if(context==null){
                return null;
            }

            context=context.buildNewContext(new RelevantLocationCombiner(context.getByType(ASTBuildingContext)!,(context as DataClumpDetectorContext)!))
            return context;
        }
        else{
            let context: DataClumpRefactoringContext = new CodeObtainingContext(resolve("cloned_projects"+"/"+getRepoDataFromUrl(url).repo))
            context=context.buildNewContext(new GitRepositoryContext())
            let fileFilter= new RecentlyChangedFilesStephandler({});
            context=await fileFilter.handle(PipeLineStep.FileFiltering,context,{})
            let dcHandler = new DataClumpDoctorStepHandler({});
          
         
            context= await dcHandler.handle(PipeLineStep.DataClumpDetection, context, {}) as DataClumpDetectorContext         
            let resolver= resolveFromConcreteName("LanguageModelTemplateResolver") as LanguageModelTemplateResolver;
            resolver.set("%{output_format}", "chatGPT_templates/data_clump_type_context_output_format.json");
         
            return context;
        }
       
      
       
    }
    private combineDetectorAST=true;
    
}

class RelevantLocationCombiner extends DataClumpRefactoringContext implements RelevantLocationsContext{
    private ast:RelevantLocationsContext
    private dataClumps:RelevantLocationsContext
    constructor(ast:RelevantLocationsContext,dataClumps:RelevantLocationsContext){
        super();
        this.ast=ast;
        this.dataClumps=dataClumps;
    }
    getRelevantLocations(lines: { [path: string]: Set<number>; }): void {
    let astResult: {[path: string]: Set<number> }={}
    let dataClumpResult: {[path: string]: Set<number> }={}
    this.ast.getRelevantLocations(astResult)
    this.dataClumps.getRelevantLocations(dataClumpResult)

       for(let key of Object.keys(dataClumpResult)){
        if(!lines[key]){
            lines[key]=new Set();
        }
        for(let l of dataClumpResult[key]){
            lines[key].add(l)
        }
        for(let l of astResult[key]){
            lines[key].add(l)
        }
       }
    }
    
}

async function main() {
    FileIO.instance=new InstanceBasedFileIO()
    let refactorEval = new DetectEval();
   await  refactorEval.analyzeProject(init());
}

if (require.main === module) {
    main();
}