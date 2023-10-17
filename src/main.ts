import { Detector } from "./data-clumps-doctor/analyse/src"
import { Analyzer } from "./data-clumps-doctor/analyse/src/ignoreCoverage/Analyzer"
import { PipeLine } from "./pipeline/PipeLine"
import { DataContext } from "./context/DataContext";
import { PipeLineStep } from "./pipeline/PipeLineStep";
import { SimpleCodeObtainingStepHandler } from "./pipeline/stepHandler/SimpleCodeObtainingStepHandler";
import { DataClumpDetectorStep } from "./pipeline/stepHandler/DataClumpDetectorStep";
import { sys } from "typescript";

async function main(){
    console.log("hello world")
    console.log(sys.args)
    if(sys.args.length<=0){
        throw new Error ("Please provide a path to a project")
    }
    let project_path=sys.args[0];
    PipeLine.Instance.registerHandler([PipeLineStep.CodeObtaining],new SimpleCodeObtainingStepHandler(project_path));
    PipeLine.Instance.registerHandler([PipeLineStep.DataClumpDetector],new DataClumpDetectorStep());
    
    /*let result=analyser.analyse(null).then((x)=>{
        console.log("finnish")
    })*/
    await PipeLine.Instance.executeAllSteps( DataContext)
    console.log(DataContext)
}
main();

