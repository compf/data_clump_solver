import { ContainerBuilder } from "node-dependency-injection"
import { AbstractStepHandler } from "../pipeline/stepHandler/AbstractStepHandler"
import fs from "fs"
import { PipeLineStep } from "../pipeline/PipeLineStep"
type PipeLineStepConf={
    handler:string,
    args:any
}
export type Configuration={
    ProgrammingLanguageIdentifier:string,
    PipeLine:{
        CodeObtaining:PipeLineStepConf,
         FileFiltering:PipeLineStepConf,
         ASTGeneration:PipeLineStepConf,
         SilarityDetection:PipeLineStepConf,
         DataClumpDetection:PipeLineStepConf,
         DataClumpFiltering:PipeLineStepConf,
         NameFinding:PipeLineStepConf,
         ClassExtraction:PipeLineStepConf
         UsageFinding:PipeLineStepConf,
         Refactoring:PipeLineStepConf,
         Validation:PipeLineStepConf,
    }
    
}
const container=new ContainerBuilder();
const pathPrefix="../pipeline/stepHandler/"
export function registerFromName(name:string,dependencyCategory:string,args:any){
    const directoryName= getDirectoryFromCategory(dependencyCategory);
    const loadedScript=require(pathPrefix+directoryName+"/"+name+".js");
    container.register(`${pathPrefix}${directoryName}/${name}`,loadedScript[name]).addArgument(args);
}
export function resolveFromName(name:string,dependencyCategory:string):AbstractStepHandler{
    const directoryName= getDirectoryFromCategory(dependencyCategory);
    return container.get(`${pathPrefix}${directoryName}/${name}`) as AbstractStepHandler;
}

export function loadConfiguration(){
    let config=JSON.parse(fs.readFileSync("./config.json").toString()) as Configuration
    for(let step of Object.keys(PipeLineStep)){
        if(config.PipeLine[step] && config.PipeLine[step].handler){
            registerFromName(config.PipeLine[step].handler,step,config.PipeLine[step].args)
           
        }
    }
}

function getDirectoryFromCategory(stepName:string):string{
   return  stepName.substring(0,1).toLowerCase()+stepName.substring(1)
}
