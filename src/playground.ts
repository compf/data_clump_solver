import { Detector } from "./data-clumps-doctor/analyse/src"
import { Analyzer } from "./data-clumps-doctor/analyse/src/ignoreCoverage/Analyzer"
import { PipeLine } from "./pipeline/PipeLine"
import { DataClumpRefactoringContext } from "./context/DataContext";
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
import { LanguageModelRefactoringStep } from "./pipeline/stepHandler/refactoring/LanguageModelRefactoringStep";
import { DetectAndRefactorWithLanguageModelStep } from "./pipeline/stepHandler/DetectAndRefactorWithLanguageModelStep";
import { GradleBuildValidationStepHandler } from "./pipeline/validation/GradleBuildValidationStepHandler";

async function main(){
   /*PipeLine.Instance.registerHandler([PipeLineStep.CodeObtaining],new SimpleCodeObtainingStepHandler("/home/compf/data/uni/master/sem4/data_clump_solver/javaTest"));
   PipeLine.Instance.registerHandler([PipeLineStep.DataClumpDetection],new DetectAndRefactorWithLanguageModelStep());
   PipeLine.Instance.registerHandler([PipeLineStep.Validation],new GradleBuildValidationStepHandler())
   let context=new DataClumpRefactoringContext()
   
   context=await PipeLine.Instance.executeAllSteps(context)
   console.log(JSON.stringify(context))*/
   /*let resolver= StepHandlerResolver.Instance
   resolver.resolveFromName("SimpleCodeObtainingStepHandler",PipeLineStep.CodeObtaining.name,null)*/
}
main();

