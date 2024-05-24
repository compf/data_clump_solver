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

import fs from "fs"
import {resolve} from "path"
import { OllamaInterface } from "./util/languageModel/OllamaInterface";
import https from "https"
import { GeminiInterface } from "./util/languageModel/GeminiInterface";
import { CodeSnippetHandler } from "./pipeline/stepHandler/languageModelSpecific/LargeLanguageModelHandlers";
import { StubInterface } from "./util/languageModel/StubInterface";
import { LanguageModelTemplateResolver } from "./util/languageModel/LanguageModelTemplateResolver";
const { GoogleGenerativeAI } = require("@google/generative-ai");


async function main() {


}


if(require.main === module){
   main();

}

