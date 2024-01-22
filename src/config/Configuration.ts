import { ContainerBuilder } from "node-dependency-injection"
import { AbstractStepHandler } from "../pipeline/stepHandler/AbstractStepHandler"
import fs from "fs"
import { PipeLineStep } from "../pipeline/PipeLineStep"
import { PipeLine } from "../pipeline/PipeLine"
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
    Objects:{[key:string]:{name:string,args:any}}
    
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
    DetectAndRefactorWithLanguageModelStep:pathPrefix+"languageModelSpecific/DetectAndRefactorWithLanguageModelStep.js",
    SimpleInstructionHandler:pathPrefix+"languageModelSpecific/LargeLanguageModelHandlers.js",
    AllFilesHandler:pathPrefix+"languageModelSpecific/LargeLanguageModelHandlers.js",
    PairsOfFilesHandler:pathPrefix+"languageModelSpecific/LargeLanguageModelHandlers.js",
    SendAndClearHandler:pathPrefix+"languageModelSpecific/LargeLanguageModelHandlers.js",
    RepeatInstructionRandomlyHandler:pathPrefix+"languageModelSpecific/LargeLanguageModelHandlers.js",
    SendHandler:pathPrefix+"languageModelSpecific/LargeLanguageModelHandlers.js",
    PairOfFileContentHandler:pathPrefix+"languageModelSpecific/LargeLanguageModelHandlers.js",
    SingleFileHandler:pathPrefix+"languageModelSpecific/LargeLanguageModelHandlers.js",
    
}
const container=new ContainerBuilder();
export function registerFromName(name:string,dependencyCategory:string,args:any){
    let requirePath=name
    if(Object.keys(nameScriptFileMap).includes(name)){
        requirePath=nameScriptFileMap[name]
    }
    const loadedScript=require(requirePath);
    container.register(dependencyCategory,loadedScript[name]).addArgument(args);
}
export function resolveFromName(dependencyCategory:string):any{
    return container.get(dependencyCategory) 
}
const contextSerializationPathMap=new Map<number,string>()
export function getContextSerializationPath(index:number):string|undefined{
    return contextSerializationPathMap.get(index)
}
export function loadConfiguration(path:string){
    let config=JSON.parse(fs.readFileSync(path).toString()) as Configuration
    // register as objects
    for(let step of Object.keys(PipeLineStep)){
        if(config.PipeLine[step] && config.PipeLine[step].handler){
            contextSerializationPathMap.set( Object.keys(PipeLineStep).indexOf(step),config.PipeLine[step].contextSerializationPath)
            registerFromName(config.PipeLine[step].handler,step,config.PipeLine[step].args)
           
        }
    }
    if("Objects" in config){
        for(let object of Object.keys(config.Objects)){
            registerFromName(config.Objects[object].name,object,config.Objects[object].args)
        }
    }
    
    // register in the pipeline
    for(let step of Object.keys(PipeLineStep)){
        if(PipeLineStep[step].isRequired && !config.PipeLine[step]){
            throw new Error("Missing configuration for step "+step)
        }
        else if(config.PipeLine[step] && config.PipeLine[step].handler){
            PipeLine.Instance.registerHandler([PipeLineStep[step]],resolveFromName(step) as AbstractStepHandler)
        }
    }
}
export const LanguageModelCategory="LanguageModel"

