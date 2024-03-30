import { Detector } from "./data-clumps-doctor/analyse/src"
import { Analyzer } from "./data-clumps-doctor/analyse/src/ignoreCoverage/Analyzer"
import { PipeLine } from "./pipeline/PipeLine"
import { CodeObtainingContext, DataClumpDetectorContext, DataClumpRefactoringContext, FileFilteringContext, GitRepositoryContext, NameFindingContext } from "./context/DataContext";
import { PipeLineStep,PipeLineStepType } from "./pipeline/PipeLineStep";
import { SimpleCodeObtainingStepHandler } from "./pipeline/stepHandler/codeObtaining/SimpleCodeObtainingStepHandler";
import { DataClumpDetectorStep } from "./pipeline/stepHandler/dataClumpDetection/DataClumpDetectorStep";
import { sys } from "typescript";
import { TrivialNameFindingStep } from "./pipeline/stepHandler/nameFinding/TrivialNameFindingStep";
import { LanguageModelNameFindingsStep } from "./pipeline/stepHandler/nameFinding/LanguageModelNameFindingStep";
import { ChatGPTInterface } from "./util/languageModel/ChatGPTInterface";
import { ManualClassExtractor } from "./pipeline/stepHandler/classExtraction/ManualClassExtractor";
import { JavaManualClassExtractor } from "./pipeline/stepHandler/classExtraction/JavaManualClassExtractor";
import { GeorgeFraserRefactoring } from "./util/languageServer/GeorgeFraserLSP_API";
import { EclipseLSP_API } from "./util/languageServer/EclipseLSP_API";
import { LanguageServerReferenceAPI } from "./pipeline/stepHandler/referenceFinding/LanguageServerReferenceAPI";
import { GitHubService } from "./util/vcs/GitHubService";
import { registerFromName } from "./config/Configuration";
import { DoNothingStepHandler } from "./pipeline/stepHandler/DoNothingStepHandler";
import { DataClumpTypeContext } from "data-clumps-type-context/ignoreCoverage/DataClumpTypeContext";

class DebugNameFindingStep extends LanguageModelNameFindingsStep{
  async getSuggestedName(variableInfos: { name: string; type: string; }[], context: DataClumpRefactoringContext, counter: number): Promise<string | null> {
      if(counter<2){
        await super.getSuggestedName(variableInfos,context,counter)
        return Promise.resolve(null);
      }
      else{
        return super.getSuggestedName(variableInfos,context,counter)
         
      }
  }
}
async function main(){
  registerFromName("ChatGPTInterface","ChatGPTInterface",{
    "model":"gpt-4-1106-preview",
    "temperature":0.5
  });
  registerFromName("LanguageModelTemplateResolver","LanguageModelTemplateResolver",{})
  let codeObtainingContext=new CodeObtainingContext("/home/compf/data/uni/master/sem4/data_clump_solver/javaTest/javaTest");
  codeObtainingContext.sharedData["config"]={}
  codeObtainingContext.sharedData["config"]["ProgrammingLanguage"]="Java"
  PipeLine.Instance.registerHandler([PipeLineStep.CodeObtaining],new SimpleCodeObtainingStepHandler({path:"javaTest/javaTest",useArgPath:false}))
  PipeLine.Instance.registerHandler([PipeLineStep.DataClumpDetection],new DataClumpDetectorStep({}))
  PipeLine.Instance.registerHandler([PipeLineStep.NameFinding],new DebugNameFindingStep(({
    languageModelName:"ChatGPTInterface",
    
  })));
  PipeLine.Instance.registerHandler([PipeLineStep.Refactoring],new DoNothingStepHandler());
  let context=await PipeLine.Instance.executeAllSteps(codeObtainingContext);
 let nameContext= context.getByType(NameFindingContext)!! as NameFindingContext
  console.log(nameContext)

}
if(require.main === module){
  main();

}

