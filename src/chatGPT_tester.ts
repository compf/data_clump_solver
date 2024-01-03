
import fs from "fs"
import { files } from "node-dir"
import path from "path";
import { createHash } from 'node:crypto'
import { ChatGPTInterface } from "./util/languageModel/ChatGPTInterface";
import { LanguageModelTemplateResolver, LanguageModelTemplateType } from "./util/languageModel/LanguageModelTemplateResolver";
import { loadConfiguration } from "./config/Configuration";
import { PipeLine } from "./pipeline/PipeLine";
import { DataClumpRefactoringContext } from "./context/DataContext";
import { LargeLanguageModelDetectorContext } from "./pipeline/stepHandler/languageModelSpecific/DetectAndRefactorWithLanguageModelStep";
async function main(){

    
    loadConfiguration("chatGPT_config.json")
    let startTimestamp=Date.now()
    let context=new DataClumpRefactoringContext();
    let newContext=await PipeLine.Instance.executeAllSteps(context) as LargeLanguageModelDetectorContext
    let elapsed=Date.now()-startTimestamp
    
    let responseHashed= sha256(newContext.chat.map((x)=>x.output).join("\n"))
    let inputHashed= sha256(newContext.chat.map((x)=>x.input.join("\n")).join("\n"))
    let outDir=`chatGPT_results/${inputHashed}`
    fs.mkdirSync(outDir,{recursive:true})
    for(let c of newContext.chat){
        c.output=c.output.map((x)=>JSON.parse(x))
        c.input=c.input.map((x)=>x.split("\n")) as any
    }
    fs.writeFileSync(`${outDir}/${responseHashed}.json`,JSON.stringify(newContext.chat))
    let jsonObj=fs.existsSync(`${outDir}/metadata.json`)?JSON.parse(fs.readFileSync(`${outDir}/metadata.json`,{encoding:"utf8"})):{}
    jsonObj[responseHashed]={
        elapsedMS:elapsed,
        time:startTimestamp,
    }
    jsonObj["config"]=JSON.parse(fs.readFileSync("chatGPT_config.json",{encoding:"utf8"}))
    fs.writeFileSync(`${outDir}/metadata.json`,JSON.stringify(jsonObj))

}
  


function sha256(content:string):string {  
    return createHash('sha256').update(content).digest('hex')
}
  main()
