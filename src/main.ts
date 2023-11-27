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

async function main(){
    console.log("hello world")
    console.log(sys.args)
    if(sys.args.length<=0){
        throw new Error ("Please provide a path to a project")
    }
    let project_path=sys.args[0];
    PipeLine.Instance.registerHandler([PipeLineStep.CodeObtaining],new SimpleCodeObtainingStepHandler(project_path));
    PipeLine.Instance.registerHandler([PipeLineStep.DataClumpDetection],new DataClumpDetectorStep());
    PipeLine.Instance.registerHandler([PipeLineStep.NameFinding],new TrivialNameFindingStep());
    PipeLine.Instance.registerHandler([PipeLineStep.ClassExtraction],  new JavaManualClassExtractor());
    PipeLine.Instance.registerHandler([PipeLineStep.UsageFinding],   new LanguageServerReferenceAPI(new EclipseLSP_API()));
    PipeLine.Instance.registerHandler([PipeLineStep.Refactoring],   new LanguageModelRefactoringStep());
    
    /*let result=analyser.analyse(null).then((x)=>{
        console.log("finnish")
    })*/
    let context=new DataClumpRefactoringContext();
    await PipeLine.Instance.executeAllSteps( context)
    //console.log(DataContext.NameFinding.names)
}
main();

