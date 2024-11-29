import { resolveFromConcreteName, resolveFromInterfaceName } from "../config/Configuration";
import { ASTBuildingContext, CodeObtainingContext, DataClumpDetectorContext, DataClumpRefactoringContext, GitRepositoryContext, RelevantLocationsContext } from "../context/DataContext";
import { PipeLineStep } from "../pipeline/PipeLineStep";
import { DataClumpDoctorStepHandler } from "../pipeline/stepHandler/dataClumpDetection/DataClumpDoctorStepHandler";
import { AllAST_FilesHandler, AllFilesHandler, CodeSnippetHandler, LargeLanguageModelHandler, SystemInstructionHandler } from "../pipeline/stepHandler/languageModelSpecific/ContextToModelHandlers";
import { FileIO } from "../util/FileIO";
import { AbstractLanguageModel, ChatMessage } from "../util/languageModel/AbstractLanguageModel";
import { LanguageModelTemplateResolver } from "../util/languageModel/LanguageModelTemplateResolver";
import { waitSync, writeFileSync } from "../util/Utils";
import { getRepoDataFromUrl } from "../util/vcs/VCS_Service";
import { Arrayified, BaseEvaluator, init, Instance, InstanceBasedFileIO, isDebug } from "./base_eval";
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
      
            let context=await super.initProject(url);
           // if(1==1)throw "tes"
            if(context==null){
                return null;
            }

            context=context.buildNewContext(new RelevantLocationCombiner(context.getByType(ASTBuildingContext)!,(context as DataClumpDetectorContext)!))
            return context;
        

       
      
       
    }
    
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