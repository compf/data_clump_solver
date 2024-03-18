import { ContainerBuilder } from "node-dependency-injection"
import { AbstractStepHandler } from "../pipeline/stepHandler/AbstractStepHandler"
import fs from "fs"
import { resolve,relative } from "path"
import { PipeLineStep } from "../pipeline/PipeLineStep"
import { PipeLine } from "../pipeline/PipeLine"
import { DataClumpDetectorContext, DataClumpRefactoringContext, FileFilteringContext } from "../context/DataContext"
import { getRelevantFilesRec } from "../util/Utils"
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
  
    
}
function loadAllClasses(){
    let paths:string[]=[]
    let startTime=Date.now()
    getRelevantFilesRec("dist/src",paths,new FileFilteringContext(["*.js"],["dist/src/data-clumps-doctor/**"]))
    for(let path of paths){
        if (path.endsWith("Configuration.js")){
            continue;
        }
        let relativized=relative(__dirname,path)
        let content=require(relativized)
        for(let cls of Object.keys(content)){
            nameScriptFileMap[cls]=relativized
        }
    }
    console.log("Loaded all classes in "+(Date.now()-startTime)+"ms")

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
export function getContextSerializationPath(name:string,context:DataClumpRefactoringContext):string{
    let result="other.json"
    switch(name){
        case PipeLineStep.DataClumpDetection.name:
        case PipeLineStep.DataClumpFiltering.name:
            result= "dataClumpDetectorContext.json";break;
        case PipeLineStep.NameFinding.name:
            result= "nameFindingContext.json";break;

        case PipeLineStep.ClassExtraction.name:
            result= "classExtractionContext.json";break;
        case PipeLineStep.ReferenceFinding.name:
            result= "usageFindingContext.json";break;
    
    }
    if(fs.existsSync(resolve(context.getProjectPath(),".data_clump_solver_data/"))){
        return resolve(context.getProjectPath(),".data_clump_solver_data/",result)
    }
    else{
        return "data/"+result
    }
}
export function processConfiguration(config:Configuration){
    // register as objects
    for(let step of Object.keys(PipeLineStep)){
        if(config.PipeLine[step] && config.PipeLine[step].handler){
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
loadAllClasses()
export const LanguageModelCategory="LanguageModel"

