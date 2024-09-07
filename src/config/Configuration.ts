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

export function getDataClumpThreshold(dataClumpTyo:string):number{
    return 3;
}

function loadAllClasses(){
    let paths:string[]=[]
    let startTime=Date.now()
    getRelevantFilesRec("./dist/src",paths,new FileFilteringContext([".*\.js"],[".*dist/src/data-clumps-doctor/.*",".*js\.ma"]))
    for(let path of paths){
        console.log("Loading "+path)
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
   export function registerFromName(typeName:string,categoryName:string,args:any){
    let requirePath=typeName
    if(Object.keys(nameScriptFileMap).includes(typeName)){
        requirePath=nameScriptFileMap[typeName]
    }
    const loadedScript= require(requirePath);
    container.register(categoryName,loadedScript[typeName]).addArgument(args);
}

export function resolveFromInterfaceName(interfaceName:string): any {
   return container.get(interfaceName)
}
export function resolveFromConcreteName(concreteName:string):any{
    return container.get(concreteName) 
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
       // register in the pipeline
       for(let steps of Object.keys(config.PipeLine)){
        let splitted=steps.split(",").map((x)=>x.trim())
        PipeLine.Instance.registerHandler(splitted.map((x)=>PipeLineStep[x]),resolveFromConcreteName(splitted[0]) as AbstractStepHandler)
    }
    if(!PipeLine.Instance.checkPipeLine()){
        throw new Error("Pipeline is not correct")
    }
    
 
}
export function loadConfiguration(path:string):DataClumpRefactoringContext{
    let config=JSON.parse(fs.readFileSync(path).toString()) as Configuration
    let initialContext=new DataClumpRefactoringContext()
    processConfiguration(config)
    initialContext.setConfig(config)
    return initialContext
    
}
export function activateLoader(){
    loadAllClasses()
}

