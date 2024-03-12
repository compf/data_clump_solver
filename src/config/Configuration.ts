import { ContainerBuilder } from "node-dependency-injection"
import { AbstractStepHandler } from "../pipeline/stepHandler/AbstractStepHandler"
import fs from "fs"
import { PipeLineStep } from "../pipeline/PipeLineStep"
import { PipeLine } from "../pipeline/PipeLine"
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../context/DataContext"
export type PipeLineStepConf={
    handler:string,
    contextSerializationPath?:string,
    args:any
}
export type Configuration={
    ProgrammingLanguageIdentifier:string,
    PipeLine:{
        CodeObtaining:PipeLineStepConf,
         FileFiltering:PipeLineStepConf,
         ASTGeneration:PipeLineStepConf,
         SimilarityDetection:PipeLineStepConf,
         DataClumpDetection:PipeLineStepConf,
         DataClumpFiltering:PipeLineStepConf,
         NameFinding:PipeLineStepConf,
         ClassExtraction:PipeLineStepConf
         UsageFinding:PipeLineStepConf,
         Refactoring:PipeLineStepConf,
         Validation:PipeLineStepConf,
    },
    Objects:{[key:string]:{type?:string,args?:any}}
    
}
const pathPrefix="../pipeline/stepHandler/"

const nameScriptFileMap={
    DoNothingStepHandler:pathPrefix+"DoNothingStepHandler.js",
    SimpleCodeObtainingStepHandler:pathPrefix+"codeObtaining/SimpleCodeObtainingStepHandler.js",
    DataClumpDetectorStep:pathPrefix+"dataClumpDetection/DataClumpDetectorStep.js",
    TrivialNameFindingStep:pathPrefix+"nameFinding/TrivialNameFindingStep.js",
    LanguageModelNameFindingsStep:pathPrefix+"nameFinding/LanguageModelNameFindingStep.js",
    JavaManualClassExtractor:pathPrefix+"classExtraction/JavaManualClassExtractor.js",
    LanguageServerReferenceAPI:pathPrefix+"referenceFinding/LanguageServerReferenceAPI.js",
    ChatGPTInterface:"../util/languageModel/ChatGPTInterface.js",
    GeorgeFraserRefactoring:"../util/languageServer/GeorgeFraserLSP_API.js",
    EclipseLSP_API:"../util/languageServer/EclipseLSP_API.js",
    RedcliffManualRefactoringStep:pathPrefix+"refactoring/RedcliffManualRefactoringStep.js",
    LanguageModelDetectOrRefactorHandler:pathPrefix+"languageModelSpecific/LanguageModelDetectOrRefactorHandler.js",
    SimpleInstructionHandler:pathPrefix+"languageModelSpecific/LargeLanguageModelHandlers.js",
    AllFilesHandler:pathPrefix+"languageModelSpecific/LargeLanguageModelHandlers.js",
    SendAndClearHandler:pathPrefix+"languageModelSpecific/LargeLanguageModelHandlers.js",
    RepeatInstructionRandomlyHandler:pathPrefix+"languageModelSpecific/LargeLanguageModelHandlers.js",
    SendHandler:pathPrefix+"languageModelSpecific/LargeLanguageModelHandlers.js",
    PairOfFileContentHandler:pathPrefix+"languageModelSpecific/LargeLanguageModelHandlers.js",
    LanguageModelTemplateResolver:"../util/languageModel/LanguageModelTemplateResolver.js",
    
}
const container=new ContainerBuilder();
export function registerFromName(typeName:string,refName:string,args:any){
    let requirePath=typeName
    if(Object.keys(nameScriptFileMap).includes(typeName)){
        requirePath=nameScriptFileMap[typeName]
    }
    const loadedScript=require(requirePath);
    container.register(refName,loadedScript[typeName]).addArgument(args);
}
export function resolveFromName(dependencyCategory:string):any{
    return container.get(dependencyCategory) 
}
const contextSerializationPathMap=new Map<number,string>()
export function getContextSerializationPath(index:number):string|undefined{
    return contextSerializationPathMap.get(index)
}
export function processConfiguration(config:Configuration){
    // register as objects
    for(let step of Object.keys(PipeLineStep)){
        if(config.PipeLine[step] && config.PipeLine[step].handler){
            contextSerializationPathMap.set( Object.keys(PipeLineStep).indexOf(step),config.PipeLine[step].contextSerializationPath)
            registerFromName(config.PipeLine[step].handler,step,config.PipeLine[step].args)
           
        }
    }
    if("Objects" in config){
        for(let key of Object.keys(config.Objects)){
            let args=config.Objects[key].args
            let type=config.Objects[key].type
            if(type==undefined || type==null){
                type=key
            }
            registerFromName(type,key,args)
        }
    }
    for(let step of Object.keys(PipeLineStep)){
        if(PipeLineStep[step].isRequired && !Object.keys(config.PipeLine).some((x)=>x.includes(step))){
            throw new Error("Missing configuration for step "+step)
        }
    }
    
    // register in the pipeline
    for(let steps of Object.keys(config.PipeLine)){
        let splitted=steps.split(",").map((x)=>x.trim())
        PipeLine.Instance.registerHandler(splitted.map((x)=>PipeLineStep[x]),resolveFromName(splitted[0]) as AbstractStepHandler)
    }
}
export function loadConfiguration(path:string):DataClumpRefactoringContext{
    let config=JSON.parse(fs.readFileSync(path).toString()) as Configuration
    let initialContext=new DataClumpRefactoringContext()
    processConfiguration(config)
    initialContext.setConfig(config)
    return initialContext
    
}
export const LanguageModelCategory="LanguageModel"

