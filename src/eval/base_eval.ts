import fs from "fs"
import { GitHubService } from "../util/vcs/GitHubService"
import { getRepoDataFromUrl } from "../util/vcs/VCS_Service"
import { CodeObtainingContext, DataClumpDetectorContext, DataClumpRefactoringContext } from "../context/DataContext";
import { PipeLineStep } from "../pipeline/PipeLineStep";
import { resolve } from "path"
import { DataClumpDetectorStep } from "../pipeline/stepHandler/dataClumpDetection/DataClumpDetectorStep";
import { registerFromName, resolveFromInterfaceName } from "../config/Configuration";
import { ProjectListRetriever } from "./project_list_retriever";
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
export abstract class BaseEvaluator {

    async initProject(url: string): Promise<DataClumpRefactoringContext | null> {
        console.log(url)
   
        let gitHelper = new GitHubService()
        /*if (fs.existsSync("cloned_projects")) {
            fs.rmSync("cloned_projects", { recursive: true })
            fs.mkdirSync("cloned_projects")
        }
        gitHelper.clone(url)*/
        let obtainingContext = new CodeObtainingContext(resolve("cloned_projects"+"/"+getRepoDataFromUrl(url).repo))
        let dcHandler = new DataClumpDetectorStep({});
        registerFromName("DataClumpSizeMetric", "DataClumpSizeMetric", {});
        registerFromName("DataClumpOccurenceMetric", "DataClumpOccurenceMetric", {});
        registerFromName("AffectedFilesMetric", "AffectedFilesMetric", {});
        registerFromName("AffectedFileSizeMetric", "AffectedFileSizeMetric", {});
        registerFromName("LanguageModelTemplateResolver", "LanguageModelTemplateResolver", {
            "${programming_language}": "Java",
            "%{examples}": "chatGPT_templates/DataClumpExamples.java",
            "%{refactor_instruction}": "chatGPT_templates/refactor_one_data_clump.template",
            "%{detected_data_clumps}": "chatGPT_templates/refactor/detected_data_clumps_minified.json",
            "%{output_format_refactor}": "chatGPT_templates/json_format_refactor_piecewise.json",
            "%{output_format}": "chatGPT_templates/json_format_refactor_piecewise.json",

            "%{llm_output_format}": "chatGPT_templates/use_markdown.template"
        })
        let originalDcContext = await dcHandler.handle(PipeLineStep.DataClumpDetection, obtainingContext, {}) as DataClumpDetectorContext
        return Promise.resolve(originalDcContext);
    }

    abstract  analyzeInstance(instance:Instance,context:DataClumpRefactoringContext): Promise<void>;
    async analyzeProjects(retriever:ProjectListRetriever){
        let projects=await retriever.getProjectList();
        for(let p of projects){
            let ctx=await this.initProject(p);
            if(ctx==null){
                continue;
            }
            let instanceCombination=this.createInstanceCombination();
            let allInstances=createInstanceCombination(instanceCombination);
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
                await this.analyzeInstance(instance,ctx);
            }
          

        }
            
    }
    abstract createInstanceCombination(): InstanceCombination;

    simplifyInstance(instance:Instance):Instance{
        return instance;
    }
        
}

export function createInstanceCombination<T>(tupleOfArrays:Arrayified<T>) :T[] {
    let targetObject:T={} as any
    let objectList:T[]=[]

    createInstanceCombinationRecursive(tupleOfArrays,targetObject,0,objectList);
    return objectList
}

function createInstanceCombinationRecursive<T>(tupleOfArrays:Arrayified<T>, targetObject:T, currKeyIndex:number, objectList:T[]){
    let keys=Object.keys(tupleOfArrays);
    
    let currKey=keys[currKeyIndex];
    for(let value of tupleOfArrays[currKey]){
       targetObject[currKey]=value
       if(currKeyIndex+1<keys.length){
        createInstanceCombinationRecursive(tupleOfArrays,targetObject,currKeyIndex+1,objectList)
       }
       else{
        objectList.push(JSON.parse(JSON.stringify(targetObject)))
       }
    }
    
}


export class InstanceBasedFileIO extends FileIO{
    public instance:Instance={} as any
    private baseDir="evalData"
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