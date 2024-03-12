import { Detector } from "./data-clumps-doctor/analyse/src"
import { Analyzer } from "./data-clumps-doctor/analyse/src/ignoreCoverage/Analyzer"
import { PipeLine } from "./pipeline/PipeLine"
import  fs from "fs"
import {resolve} from "path"
import { CodeObtainingContext, DataClumpRefactoringContext } from "./context/DataContext";
import { PipeLineStep,PipeLineStepType } from "./pipeline/PipeLineStep";
import { SimpleCodeObtainingStepHandler } from "./pipeline/stepHandler/codeObtaining/SimpleCodeObtainingStepHandler";
import { DataClumpDetectorStep } from "./pipeline/stepHandler/dataClumpDetection/DataClumpDetectorStep";
import { sys } from "typescript";

import { loadConfiguration } from "./config/Configuration";

async function main(){
    
    let context=handleArguments(process.argv.slice(2))
    /*PipeLine.Instance.registerHandler([PipeLineStep.CodeObtaining],new SimpleCodeObtainingStepHandler(project_path));
    PipeLine.Instance.registerHandler([PipeLineStep.DataClumpDetection],new DataClumpDetectorStep());
    PipeLine.Instance.registerHandler([PipeLineStep.NameFinding],new TrivialNameFindingStep());
    PipeLine.Instance.registerHandler([PipeLineStep.ClassExtraction],  new JavaManualClassExtractor());
    PipeLine.Instance.registerHandler([PipeLineStep.ReferenceFinding],   new LanguageServerReferenceAPI(new EclipseLSP_API()));
    PipeLine.Instance.registerHandler([PipeLineStep.Refactoring],   new LanguageModelRefactoringStep());*/
    /*let result=analyser.analyse(null).then((x)=>{
        console.log("finnish")
    })*/

    let finalContext=await PipeLine.Instance.executeAllSteps( context)
    console.log("program finished")
    process.exit(0)
    //console.log(DataContext.NameFinding.names)
}
function handleArguments(args:string[]){
    if(args.length<=0){
        throw new Error ("Please provide a path to a project")
    }
    let config_arg=args[0];
    if(config_arg.endsWith(".json")){
        return loadConfiguration(config_arg)
    }
    else if(fs.lstatSync(config_arg).isDirectory() && fs.existsSync(resolve(config_arg,"config.json"))){
        let path=resolve(config_arg,"config.json")
        config_arg=resolve(config_arg,"config.json")
        let configContext=loadConfiguration(config_arg).buildNewContext(new CodeObtainingContext(path))
       
        return configContext
    }
    else{
       return  loadConfiguration("./config.json")
    }
}
main();

