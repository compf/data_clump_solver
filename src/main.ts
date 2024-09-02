import { Detector } from "./data-clumps-doctor/analyse/src"
import { Analyzer } from "./data-clumps-doctor/analyse/src/ignoreCoverage/Analyzer"
import { PipeLine } from "./pipeline/PipeLine"
import  fs from "fs"
import {resolve} from "path"
import { CodeObtainingContext, DataClumpRefactoringContext } from "./context/DataContext";
import { PipeLineStep,PipeLineStepType } from "./pipeline/PipeLineStep";
import { SimpleCodeObtainingStepHandler } from "./pipeline/stepHandler/codeObtaining/SimpleCodeObtainingStepHandler";
import { sys } from "typescript";

import { loadConfiguration } from "./config/Configuration";
import { FileIO, StubPathIO } from "./util/FileIO"

async function main(){
    FileIO.instance=new StubPathIO()
    let args=handleArguments(process.argv.slice(2))
    let context=loadConfiguration(args.config_path)
    context.sharedData.path=args.project_path
    /*PipeLine.Instance.registerHandler([PipeLineStep.CodeObtaining],new SimpleCodeObtainingStepHandler(project_path));
    PipeLine.Instance.registerHandler([PipeLineStep.DataClumpDetection],new dataClumpDoctorStepHandler());
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
type Arguments={
    project_path?:string
    config_path:string
}
function handleArguments(args:string[]):Arguments{
    for(let i=0;i<args.length;i++){
       args[i]=resolve(args[i])
    }
    if(args.length<=0){
        throw new Error ("Please provide a path to a project")
    }
    else if(args.length==1 && fs.lstatSync(args[0]).isFile()){
        return {
            config_path:args[0],
        }
    }
    else if(args.length==1 && fs.lstatSync(args[0]).isDirectory()){
        return {
            project_path:args[0],
            config_path:resolve(args[0],"config.json")
        }
    }
    else if(args.length>=2){
        let configPartIndex=fs.lstatSync(args[0]).isFile()?0:1;
        return {
            project_path:args[1-configPartIndex],
            config_path:args[configPartIndex]
        }
    }
    else{
        throw new Error("Invalid arguments")
    }
    
}
if(require.main === module){
    main();

}

