import fs from "fs"
import { GitHubService } from "../util/vcs/GitHubService"
import { getRepoDataFromUrl } from "../util/vcs/VCS_Service"
import { CodeObtainingContext, DataClumpDetectorContext, DataClumpRefactoringContext } from "../context/DataContext";
import { PipeLineStep } from "../pipeline/PipeLineStep";
import { resolve } from "path"
import { DataClumpDetectorStep } from "../pipeline/stepHandler/dataClumpDetection/DataClumpDetectorStep";
import { loadConfiguration, registerFromName, resolveFromInterfaceName } from "../config/Configuration";
import { CloneBasedProjectRetriever } from "./project_list_retriever";
import { FileIO } from "../util/FileIO";
import path from "path"
import { getRelevantTime, setRelevantTime } from "../util/Utils";
import { AbstractLanguageModel } from "../util/languageModel/AbstractLanguageModel";
const constantScores={
    "instanceType":-1000,
    "projectName":-999,
    "iteration":1000
}
function instanceKeyComparator(a:string, b:string){
    let aScore=constantScores[a]||-a.length;
    let bScore=constantScores[b]||-b.length;
    return aScore-bScore;
  
}
export type Instance={
    instanceType:string,
    model:string,
    temperature:number,
    iteration:number,
}
export type Arrayified<T> = {
    [K in keyof T]: T[K][];
  };

 export  type InstanceCombination = Arrayified<Instance>;
 export const DEBUG=false;
  let CLONE_AGAIN=true
  export function disableCloning(){
      CLONE_AGAIN=false
  }
export abstract class BaseEvaluator {

    async initProject(url: string): Promise<DataClumpRefactoringContext | null> {
        console.log(url)
   
        let retriever=new CloneBasedProjectRetriever(url,CLONE_AGAIN)
        retriever.init()
        let obtainingContext = new CodeObtainingContext(resolve("cloned_projects"+"/"+getRepoDataFromUrl(url).repo))
        let dcHandler = new DataClumpDetectorStep({});
      
     
        let originalDcContext = await dcHandler.handle(PipeLineStep.DataClumpDetection, obtainingContext, {}) as DataClumpDetectorContext
        originalDcContext.serialize()
        return Promise.resolve(originalDcContext);
    }

    abstract  analyzeInstance(instance:Instance,context:DataClumpRefactoringContext): Promise<void>;
    async analyzeProjects(projects:string[]){
        for(let p of projects){
            let ctx=await this.initProject(p);
            if(ctx==null){
                continue;
            }
            let instanceCombination=this.createInstanceCombination();
            let keys=Object.keys(instanceCombination).sort(instanceKeyComparator)
            let allInstances=createInstanceCombination(instanceCombination, keys);
            let api=resolveFromInterfaceName("AbstractLanguageModel") as AbstractLanguageModel
            let fileIO=FileIO.instance as InstanceBasedFileIO
            for(let instance of allInstances){
                instance= this.simplifyInstance(instance)
                instance["projectName"]=path.basename(ctx.getProjectPath())
                fileIO.instance=instance;
                console.log(instance)
                if(fs.existsSync(fileIO.getInstancePath())){
                    continue;
                }
                api.clear();
                api.resetParameters(instance)
                setRelevantTime()
                if(DEBUG){
                    try{
                        await this.analyzeInstance(instance,ctx);
                    }
                    catch(e){
                        console.log("Error",e)
                    }
                }
                else{
                    await this.analyzeInstance(instance,ctx);
                }
            }
          

        }
            
    }
    abstract createInstanceCombination(): InstanceCombination;
    getRankerThreshold():number{
        return 10;
    }
    simplifyInstance(instance:Instance):Instance{
        return instance;
    }
        
}

export function createInstanceCombination<T>(tupleOfArrays:Arrayified<T>, keys:string[]=Object.keys(tupleOfArrays)) :T[] {
    let targetObject:T={} as any
    let objectList:T[]=[]

    createInstanceCombinationRecursive(tupleOfArrays,targetObject,0,objectList, keys);
    return objectList
}

function createInstanceCombinationRecursive<T>(tupleOfArrays:Arrayified<T>, targetObject:T, currKeyIndex:number, objectList:T[], keys:string[]){    
    let currKey=keys[currKeyIndex];
    for(let value of tupleOfArrays[currKey]){
       targetObject[currKey]=value
       if(currKeyIndex+1<keys.length){
        createInstanceCombinationRecursive(tupleOfArrays,targetObject,currKeyIndex+1,objectList, keys)
       }
       else{
        objectList.push(JSON.parse(JSON.stringify(targetObject)))
       }
    }
    
}


export class InstanceBasedFileIO extends FileIO{
    public instance:Instance={} as any
    public baseDir="evalData"
    resolvePath(key: string): string {
     
        let dir=this.getInstancePath()
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir,{recursive:true})
        }
        fs.writeFileSync(resolve(dir,"instance.json"),JSON.stringify(this.instance,null,2))
        dir=resolve(dir,getRelevantTime().toString())
        dir=resolve(dir,key)
        
        dir=path.dirname(dir)
 
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir,{recursive:true})
        }
        let resultingPath=resolve(dir,path.basename(key))
        return resultingPath;
    }
    getInstancePath():string{
        let sortedKeys=[this.baseDir]
        sortedKeys.push(...Object.keys(this.instance).sort(instanceKeyComparator).map((it)=>this.instance[it]));
      
     
        let  dir=sortedKeys.join("/")
        return dir;
    }
}

export function init(){
    let args=process.argv.slice(2)
    if(args.length<2){
        console.log("Usage: node eval.js <configPath> <urlPath>")
        throw "Invalid arguments";
    }
    let configPath=""
    let urlPath=""
    if(args[0].endsWith(".json") && args[1].endsWith(".txt")){
        configPath=args[0]
        urlPath=args[1]
    }
    else if(args[0].endsWith(".txt") && args[1].endsWith(".json")){
        configPath=args[1]
        urlPath=args[0]
    }
    loadConfiguration(configPath)
    return fs.readFileSync(urlPath,{encoding:"utf-8"}).split("\n")
}