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
    }
    
}
const pathPrefix="../pipeline/stepHandler/"

const nameScriptFileMap={
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
    SimpleInstructionHandler:pathPrefix+"languageModelSpecific/DependentOnAnotherIterator.js",
    AllFilesHandler:pathPrefix+"languageModelSpecific/DependentOnAnotherIterator.js",
    PairsOfFilesHandler:pathPrefix+"languageModelSpecific/DependentOnAnotherIterator.js",
    SendAndClearHandler:pathPrefix+"languageModelSpecific/DependentOnAnotherIterator.js",
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
    for(let step of Object.keys(PipeLineStep)){
        if(config.PipeLine[step] && config.PipeLine[step].handler){
            contextSerializationPathMap.set( Object.keys(PipeLineStep).indexOf(step),config.PipeLine[step].contextSerializationPath)
            registerFromName(config.PipeLine[step].handler,step,config.PipeLine[step].args)
           
        }
    }
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

