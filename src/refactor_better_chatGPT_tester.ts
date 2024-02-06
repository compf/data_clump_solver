
import fs from "fs"
import { files } from "node-dir"
import path from "path";
import { createHash } from 'node:crypto'
import { ChatGPTInterface } from "./util/languageModel/ChatGPTInterface";
import { LanguageModelTemplateResolver, LanguageModelTemplateType } from "./util/languageModel/LanguageModelTemplateResolver";
import { loadConfiguration, registerFromName, resolveFromName } from "./config/Configuration";
import { PipeLine } from "./pipeline/PipeLine";
import { CodeObtainingContext, DataClumpRefactoringContext, FileFilteringContext } from "./context/DataContext";
import { DetectAndRefactorWithLanguageModelStep, LargeLanguageModelDetectorContext } from "./pipeline/stepHandler/languageModelSpecific/DetectAndRefactorWithLanguageModelStep";
import { AllFilesHandler, LargeLanguageModelHandler, PairOfFileContentHandler, SendAndClearHandler, SimpleInstructionHandler, SingleFileHandler } from "./pipeline/stepHandler/languageModelSpecific/LargeLanguageModelHandlers";
import { LanguageModelInterface } from "./util/languageModel/LanguageModelInterface";
import { PhindraInterface } from "./util/languageModel/PhindraInterface";
import { waitSync } from "./util/Utils";
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function createInstructionHandler(instructionPath: string) {
    return new SimpleInstructionHandler({ instructionPath })
}
const apis = ["ChatGPTInterface"/*"PhindraInterface"*/]
const temperatures = [0.1,0.5, 0.9]
const models = ["gpt-4-1106-preview", "gpt-3.5-turbo-1106"]
const instructionType = ["definitionBased", "exampleBased", "noDefinitionBased"];
const dataFormat = ["fromScratch","givenContext"]
const dataHandler = ["AllFilesHandler"]
const repetionCount = 3;
const IGNORE_EXISTING=true;
function createDataHandler(name:string):LargeLanguageModelHandler{
    switch(name){
        case "AllFilesHandler":
            return new AllFilesHandler()
        case "PairOfFileAndSingleHandler":
            return new PairOfFileContentHandler()
        case "SingleFileHandler":
            return new SingleFileHandler()
        default:
            throw new Error("Unknown data handler")
    }
}
let phindra:PhindraInterface|null=null;
function createAPI(apiType: string, model: string, temperature: number): LanguageModelInterface {
    if(apiType=="PhindraInterface"){
        if(phindra==null)phindra=new PhindraInterface({model,temperature});
        return phindra;
    }
    return new ChatGPTInterface({ model, temperature })
}
async function main() {
    let codeObtainingContext=new CodeObtainingContext("javaTest/javaTest");
    registerFromName(LanguageModelTemplateResolver.name, LanguageModelTemplateResolver.name, {
        "${programming_language}": "Java",
        "%{examples}":"chatGPT_templates/DataClumpExamples.java",
        "%{output_format}":"chatGPT_templates/json_output_format.json",
        "%{refactor_instruction}":"chatGPT_templates/refactor_data_clump_fully.template"
    })
    console.log("registered")
    for (let apiType of apis) {
        for (let model of models) {
            for (let temperature of temperatures) {
                for (let instrType of instructionType) {
                    for (let dFormat of dataFormat) {
                        for (let handlerName of dataHandler) {
                            for (let i = 0; i < repetionCount; i++) {
                                waitSync(1000)
                                console.log(apiType, model, temperature, instrType, dFormat, handlerName, i)
                                const instructionPath=`chatGPT_templates/detectAndRefactor/${instrType}/${dFormat}/instruction.template`
                                if(!fs.existsSync(instructionPath)){
                                    console.log("Instruction path does not exist",instructionPath)
                                    continue;
                                }
                                let path="llm_results/detectAndRefactor/"+[apiType,model,temperature,instrType,dFormat,handlerName,i].join("/")
                                if( IGNORE_EXISTING && fs.existsSync(path)){
                                    continue;
                                }
                                let handlers = {handlers:[
                                    new SimpleInstructionHandler({instructionPath}),
                                    createDataHandler(handlerName),
                                    new SendAndClearHandler()
                                ]}


                                const api=createAPI(apiType,model,temperature)
                                
                                let langRefactorer=DetectAndRefactorWithLanguageModelStep.createFromCreatedHandlers(handlers.handlers,api)
                                let context=codeObtainingContext.buildNewContext(new FileFilteringContext(["*.java"],[]))
                                let startTimestamp = Date.now()
                                console.log("STARTING")
                                let newContext=await( langRefactorer.handle(context,null)) as LargeLanguageModelDetectorContext
                                let elapsed = Date.now() - startTimestamp
                                console.log("FINISHED")
                                let inputOnly = newContext.chat.filter((x) => x.messageType == "input")
                                let outputOnly = newContext.chat.filter((x) => x.messageType == "output")
                                console.log("INPUT")
                                console.log(inputOnly)
                                console.log("OUTPUT")
                                console.log(outputOnly)
                               
                                for (let c of newContext.chat) {
                                    c.messages = c.messages.map((x) => {
                                        if (c.messageType == "input") {
                                            return x.split("\n") as any
                                        } else
                                            return JSON.parse(x)
                                    });
                                }
                                fs.mkdirSync(path, { recursive: true })
                            
                                fs.writeFileSync(path+"/output.json", JSON.stringify(newContext.chat, undefined, 2))
                                let metadata={elapsed:elapsed,time:startTimestamp,usage:api.getTokenStats()}
                                fs.writeFileSync(path+"/metadata.json", JSON.stringify(metadata, undefined, 2))
                                


                            }

                        }
                    }
                }
            }
        }
    }
   
}

main()


