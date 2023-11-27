import { Detector } from "./data-clumps-doctor/analyse/src"
import { Analyzer } from "./data-clumps-doctor/analyse/src/ignoreCoverage/Analyzer"
import { PipeLine } from "./pipeline/PipeLine"
import { DataClumpRefactoringContext } from "./context/DataContext";
import { PipeLineStep } from "./pipeline/PipeLineStep";
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

async function main(){
   PipeLine.Instance.registerHandler([PipeLineStep.CodeObtaining],new SimpleCodeObtainingStepHandler("/home/compf/data/uni/master/sem4/data_clump_solver/javaTest"));
   PipeLine.Instance.registerHandler([PipeLineStep.DataClumpDetection,PipeLineStep.Refactoring],new DetectAndRefactorWithLanguageModelStep())
   let context=new DataClumpRefactoringContext()
   
   PipeLine.Instance.executeAllSteps(context)
}
main();

