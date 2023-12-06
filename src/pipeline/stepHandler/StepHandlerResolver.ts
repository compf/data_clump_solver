import { PipeLineStep } from "../PipeLineStep";
import { AbstractStepHandler } from "./AbstractStepHandler";
import { ContainerBuilder } from 'node-dependency-injection'
export class StepHandlerResolver{
    static readonly  Instance=new StepHandlerResolver();
    private constructor(){}
    private container=new ContainerBuilder();
    resolveFromName(name:string,dependencyCategory:string,args:any):AbstractStepHandler{
        const directoryName=this.getDirectoryFromCategory(dependencyCategory);
        const loadedScript=require("./"+directoryName+"/"+name+".js");
        console.log(new loadedScript[name]());
        return new loadedScript.default();
        //this.container.register(require(`./${directoryName}/${name}`).default).addArgument(args);
    }
    getDirectoryFromCategory(stepName:string):string{
       return  stepName.substring(0,1).toLowerCase()+stepName.substring(1)
    }


}