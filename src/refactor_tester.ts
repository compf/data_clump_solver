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

import { loadConfiguration, resolveFromInterfaceName } from "./config/Configuration";
import { LanguageModelInterface } from "./util/languageModel/LanguageModelInterface"
import { waitSync } from "./util/Utils"
const models=[
   "gpt-4-1106-preview",
    //"gemini-pro"
//"codeqwen:7b",
//"codellama",
//"codegemma"
//"llama3"
//,
//"codellama:34b"
//"gemini-pro"
//"claude-3-opus-20240229"
]
const temperatures=[
   0.1
   ,
   0.5,
   
    0.9
]
const Repeats=10;
function randInt(max:number){
    return Math.floor(max*Math.random())
}
async function main(){
    
    let args=handleArguments(process.argv.slice(2))
    let context=loadConfiguration(args.config_path)
    context.sharedData.path=args.project_path
    const out_path="github_data/refactor_attempts.json"
    let result={}
    if(fs.existsSync(out_path)){
        result=JSON.parse(fs.readFileSync(out_path,{encoding:"utf-8"}))
    }
    {
        let temp=temperatures[randInt(temperatures.length)]
        let tempStr=temp+""
        let model=models[randInt(models.length)]
        if(!(model in result)){
            result[model]={}
        }
        if(!(tempStr in result[model])){
            result[model][tempStr]=[]
        }
      
        let api=resolveFromInterfaceName("LanguageModelInterface");
        (api as any).temperature=temp;
        (api as any).model=model;
        console.log(model,temp)

        let finalContext=await PipeLine.Instance.executeAllSteps( context);
        waitSync(3000)

        let chat=fs.readFileSync("stuff/chat.txt",{encoding:"utf-8"});
        fs.writeFileSync("stuff/chat_"+model+"_"+tempStr+"_"+(new Date()).getTime()+".txt",chat);
        (api as any).messages=[];
        (result[model][tempStr] ).push(chat.split("\n"));
        fs.writeFileSync(out_path,JSON.stringify(result))
    }
    waitSync(3000)

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

