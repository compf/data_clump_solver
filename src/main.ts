import { Detector } from "./data-clumps-doctor/analyse/src"
import { Analyzer } from "./data-clumps-doctor/analyse/src/ignoreCoverage/Analyzer"
import { PipeLine } from "./pipeline/PipeLine"
import { DataClumpRefactoringContext } from "./context/DataContext";
import { PipeLineStep,PipeLineStepType } from "./pipeline/PipeLineStep";
import { SimpleCodeObtainingStepHandler } from "./pipeline/stepHandler/codeObtaining/SimpleCodeObtainingStepHandler";
import { DataClumpDetectorStep } from "./pipeline/stepHandler/dataClumpDetection/DataClumpDetectorStep";
import { sys } from "typescript";

import { loadConfiguration, resolveFromName } from "./config/Configuration";

async function main(){
    console.log("hello world")
    console.log(sys.args)
    if(sys.args.length<=0){
        throw new Error ("Please provide a path to a project")
    }
    let project_path=sys.args[0];
    /*PipeLine.Instance.registerHandler([PipeLineStep.CodeObtaining],new SimpleCodeObtainingStepHandler(project_path));
    PipeLine.Instance.registerHandler([PipeLineStep.DataClumpDetection],new DataClumpDetectorStep());
    PipeLine.Instance.registerHandler([PipeLineStep.NameFinding],new TrivialNameFindingStep());
    PipeLine.Instance.registerHandler([PipeLineStep.ClassExtraction],  new JavaManualClassExtractor());
    PipeLine.Instance.registerHandler([PipeLineStep.ReferenceFinding],   new LanguageServerReferenceAPI(new EclipseLSP_API()));
    PipeLine.Instance.registerHandler([PipeLineStep.Refactoring],   new LanguageModelRefactoringStep());*/
    let context=loadConfiguration("./config.json");
    /*let result=analyser.analyse(null).then((x)=>{
        console.log("finnish")
    })*/

    let finalContext=await PipeLine.Instance.executeAllSteps( context)
    console.log("program finished")
    process.exit(0)
    //console.log(DataContext.NameFinding.names)
}
main();

