
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
import { PairOfFileContentHandler, SimpleInstructionHandler } from "./pipeline/stepHandler/languageModelSpecific/LargeLanguageModelHandlers";

function createInstructionHandler(instructionPath:string){
    return new SimpleInstructionHandler({instructionPath})
}
const temperatures=[0.1,0.9]
const models=["gpt-4-1106-preview" , "gpt-3.5-turbo-1106"]
const instructionType=["definitionBased","exampleBased","noDefinitionBased"];
const dataFormat=["source","ast"]
const dataHandler=["AllFilesHandler","PairOfFileContentHandler","SingleFileHandler"]
async function main(){

    
    loadConfiguration("chatGPT_config.json")
    let startTimestamp=Date.now()
    let context=new DataClumpRefactoringContext();
    let newContext=await PipeLine.Instance.executeAllSteps(context) as LargeLanguageModelDetectorContext
    let elapsed=Date.now()-startTimestamp
    let inputOnly=newContext.chat.filter((x)=>x.messageType=="input")
    let outputOnly=newContext.chat.filter((x)=>x.messageType=="output")
    
    let responseHashed= sha256(outputOnly.join("\n"))
    let inputHashed= sha256(inputOnly.join("\n"))
    let outDir=`chatGPT_results/${inputHashed}`
    fs.mkdirSync(outDir,{recursive:true})
    for(let c of newContext.chat){
        c.messages=c.messages.map((x)=>{
            if(c.messageType=="input"){
                return x.split("\n") as any
            }else
                return JSON.parse(x)
            });
    }
      
    fs.writeFileSync(`${outDir}/${responseHashed}.json`,JSON.stringify(newContext.chat,undefined,2))
    let jsonObj=fs.existsSync(`${outDir}/metadata.json`)?JSON.parse(fs.readFileSync(`${outDir}/metadata.json`,{encoding:"utf8"})):{}
    jsonObj[responseHashed]={
        elapsedMS:elapsed,
        time:startTimestamp,
    }
    jsonObj["config"]=JSON.parse(fs.readFileSync("chatGPT_config.json",{encoding:"utf8"}))
    fs.writeFileSync(`${outDir}/metadata.json`,JSON.stringify(jsonObj,undefined,2))

}
  


function sha256(content:string):string {  
    return createHash('sha256').update(content).digest('hex')
}
  main()
