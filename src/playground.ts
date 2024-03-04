import { Detector } from "./data-clumps-doctor/analyse/src"
import { Analyzer } from "./data-clumps-doctor/analyse/src/ignoreCoverage/Analyzer"
import { PipeLine } from "./pipeline/PipeLine"
import { CodeObtainingContext, DataClumpRefactoringContext, FileFilteringContext, GitRepositoryContext } from "./context/DataContext";
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
import { DetectAndRefactorWithLanguageModelStep } from "./pipeline/stepHandler/languageModelSpecific/DetectAndRefactorWithLanguageModelStep";
import { GitHubService } from "./util/vcs/GitHubService";

async function main(){
  let codeObtainingContext=new CodeObtainingContext("javaTest/javaTest");
   let fileFilteringContext=new FileFilteringContext(["*.java"],[]);
   let context=codeObtainingContext.buildNewContext(fileFilteringContext);
   context=context.buildNewContext(new GitRepositoryContext());
   let result=await (context as GitRepositoryContext).getAllCommittedDates("build.gradle.kts")
   console.log(result)


}
main();

