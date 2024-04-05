
import fs from "fs"
import { files } from "node-dir"
import path from "path";
import { createHash } from 'node:crypto'
import { ChatGPTInterface } from "./util/languageModel/ChatGPTInterface";
import { LanguageModelTemplateResolver, LanguageModelTemplateType } from "./util/languageModel/LanguageModelTemplateResolver";
import { loadConfiguration, registerFromName} from "./config/Configuration";
import { PipeLine } from "./pipeline/PipeLine";
import { CodeObtainingContext, DataClumpDetectorContext, DataClumpRefactoringContext, FileFilteringContext } from "./context/DataContext";
import { LanguageModelDetectOrRefactorHandler } from "./pipeline/stepHandler/languageModelSpecific/LanguageModelDetectOrRefactorHandler";
import {  AllFilesHandler, LargeLanguageModelHandler, PairOfFileContentHandler, SendAndClearHandler, SimpleInstructionHandler, SingleFileHandler } from "./pipeline/stepHandler/languageModelSpecific/LargeLanguageModelHandlers";
import { ChatMessage, LanguageModelInterface } from "./util/languageModel/LanguageModelInterface";
import { PhindraInterface } from "./util/languageModel/PhindraInterface";
import { waitSync } from "./util/Utils";
import { PipeLineStep } from "./pipeline/PipeLineStep";
import { Chat } from "openai/resources/index.mjs";
import { FileFilterHandler } from "./pipeline/stepHandler/fileFiltering/FileFilterHandler";
import { DataClumpTypeContext } from "data-clumps-type-context/ignoreCoverage/DataClumpTypeContext";

function createInstructionHandler(instructionPath: string) {
    return new SimpleInstructionHandler({ instructionPath })
}
const apis = ["ChatGPTInterface"/*"PhindraInterface"*/]
const temperatures = [0.1,0.5, 0.9]
const models = ["gpt-4-1106-preview", "gpt-3.5-turbo-1106"]
const instructionType = ["definitionBased", "exampleBased", "noDefinitionBased"];
const dataFormat = ["source", "ast"]
const dataHandler = ["AllFilesHandler", "PairOfFileAndSingleHandler"]
const repetionCount = 3;
const projectName="argoUml"
const IGNORE_EXISTING=true;
let failedAttemptsCounter = 0;
const maxFailedAttempts = 5;
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
function createLargeDataClumpsFilterContext(dataFormat:string){
    let dcContext=JSON.parse(fs.readFileSync("data/dataClumpDetectorContext.json","utf-8" ))[0];
    let usages=JSON.parse(fs.readFileSync("data/usageFindingContext.json","utf-8" ));
    let sorted=Object.values(dcContext.data_clumps).sort((b:any,a:any)=>Object.keys(a.data_clump_data).length-Object.keys(b.data_clump_data).length).slice(undefined,5) as DataClumpTypeContext[]
    let paths={}
    let class_ids={}
    for(let s of sorted){
        paths[+s.from_file_path]=true;
        paths[+s.to_file_path]=true;
        class_ids["temp/"+s.from_class_or_interface_key+".json"]=true;
        class_ids["temp/"+s.to_class_or_interface_key+".json"]=true;
        let usg=usages[s.key]
        for(let u of usg){
            paths[u.filePath]=true;
        }
    }
    let include=dataFormat=="source"?Object.keys(paths):Object.keys(class_ids)
   return new FileFilteringContext(include,[])
}

async function main() {
    registerFromName(LanguageModelTemplateResolver.name, LanguageModelTemplateResolver.name, {
        "${programming_language}": "Java",
        "%{examples}":"chatGPT_templates/DataClumpExamples.java",
        "%{output_format}":"chatGPT_templates/json_output_format.json"
    })
    console.log("hello world")
    let codeObtainingContext=new CodeObtainingContext("/home/compf/data/uni/master/sem4/argouml");
    for (let apiType of apis) {
        for (let model of models) {
            for (let temperature of temperatures) {
                for (let instrType of instructionType) {
                    for (let dFormat of dataFormat) {
                        for (let handlerName of dataHandler) {
                            for (let i = 0; i < repetionCount; i++) {
                                console.log(apiType, model, temperature, instrType, dFormat, handlerName, i)
                                const instructionPath=`chatGPT_templates/detect/${instrType}/${dFormat}/instruction.template`
                                let path="llm_results/"+projectName+"/detect/"+[apiType,model,temperature,instrType,dFormat,handlerName,i].join("/")
                                if( IGNORE_EXISTING && fs.existsSync(path)){
                                    continue;
                                }
                                let handlers = {handlers:[
                                    new SimpleInstructionHandler({instructionPath}),
                                    createDataHandler(handlerName),
                                    new SendAndClearHandler()
                                ]}
                                waitSync(1000)


                                const api=createAPI(apiType,model,temperature)
                                
                                let langRefactorer=LanguageModelDetectOrRefactorHandler.createFromCreatedHandlers(handlers.handlers,api)
                                let context=codeObtainingContext.buildNewContext(createLargeDataClumpsFilterContext(dFormat))
                                let startTimestamp = Date.now()
                                console.log("STARTING")
                                let newContext=await( langRefactorer.handle(PipeLineStep.DataClumpDetection, context,null)) as (DataClumpDetectorContext & {chat:ChatMessage[]})
                                let elapsed = Date.now() - startTimestamp
                                console.log("FINISHED")
                                let inputOnly = newContext.chat.filter((x) => x.messageType == "input")
                                let outputOnly = newContext.chat.filter((x) => x.messageType == "output")
                                if(isInvalid(outputOnly)){
                                    failedAttemptsCounter++;
                                    if(failedAttemptsCounter>=maxFailedAttempts){
                                        throw ("Too many failed attempts")
                                    }
                                    i--;
                                    continue;
                                }
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
if( require.main === module){
    main()

}


export function isInvalid(outputOnly:any) {
    for(let c of outputOnly){
        for(let m of c.messages){
            try{
             JSON.parse(m);
             
 
            }catch(e){
             return true;
            }
        }
    }
    return false;
 }