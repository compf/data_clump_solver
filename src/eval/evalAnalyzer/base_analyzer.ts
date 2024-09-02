import { CodeObtainingContext, DataClumpDetectorContext, DataClumpRefactoringContext, FileFilteringContext } from "../../context/DataContext";
import { DataClumpDoctorStepHandler } from "../../pipeline/stepHandler/dataClumpDetection/DataClumpDoctorStepHandler";
import { getRelevantFilesRec } from "../../util/Utils";
import { BaseEvaluator, disableCloning, Instance, InstanceBasedFileIO, InstanceCombination } from "../base_eval";
import { DetectEval } from "../eval_detect";
import fs from "fs"
import { resolve,dirname } from "path"
import { CloneBasedProjectRetriever } from "../project_list_retriever";
import { getRepoDataFromUrl } from "../../util/vcs/VCS_Service";
import { PipeLineStep } from "../../pipeline/PipeLineStep";
import { loadExistingContext } from "../../context/ExistingContextLoader";
import { FileIO } from "../../util/FileIO";

export type InstanceCombinationWithMetrics = InstanceCombination & {
    metricNames: string[]
}
export abstract class EvalAnalyzer {
    abstract getEvaluator(): BaseEvaluator;


    abstract getMetrics(): EvalMetric[];

    filter(instance: Instance, compareObject: any): boolean {
        for (let key in compareObject) {
            if (instance[key] != compareObject[key]) {
                return false;
            }
        }
        return true;
    }

    createCompareObjects(): any[] {
        let result: any[] = []
        let combination = this.getEvaluator().createInstanceCombination()
        for (let key of Object.keys(combination)) {

            let values = combination[key]
            if (values.length == 1) {
                continue
            }
            for (let v of values) {
                let obj = {}
                obj[key] = v
                result.push(obj)
            }
        }
        return result
    }
    

    fillObject(keys: string[], obj: any): any {
        for (let k of keys) {
            if (k in obj) {
                obj = obj[k]
            }
            else {
                obj[k] = {}
                obj = obj[k]
            }
        }
        return obj
    }
    async performRawAnalysis(url: string) {
        disableCloning()

        let data=getRepoDataFromUrl(url)
        let context:DataClumpRefactoringContext=new CodeObtainingContext("cloned_projects"+"/"+data.repo)
        let ctx=loadExistingContext(PipeLineStep.DataClumpDetection,context)
        if(ctx != null){
            context=ctx
        }
        else{
            context =(await  (this.getEvaluator().initProject(url)))!
        }
        
        

        let instancesPaths: string[] = []
        let filterContext = new FileFilteringContext([".*instance.json"], [])
        getRelevantFilesRec("evalData", instancesPaths, filterContext)
        let metrics = this.getMetrics()
        let instanceType=this.getEvaluator().createInstanceCombination().instanceType[0]
        let instances = instancesPaths.map(p => JSON.parse(fs.readFileSync(p, { encoding: "utf-8" })) as Instance)
        let counter=0
        FileIO.instance=new InstanceBasedFileIO();

        for (let instance of instances) {
            if((instance as any).projectName!=data.repo){
                continue
            }
            (FileIO.instance as InstanceBasedFileIO).instance=instance
            let instancePath=dirname(instancesPaths[counter])
            instancePath=getFirstDirectory(instancePath)
            counter++
            let result = {}
            if(instance.instanceType!=instanceType)continue
            for (let m of metrics) {
                let metricResult = await m.eval(instance,instancePath, context)
                result[m.getName()] = metricResult
            }


        }
        




    }
}
export interface EvalMetric {
    eval(instance: Instance,dirPath:string, context: DataClumpRefactoringContext): any
    getName(): string
}

export function getFirstDirectory(basePath: string): string {
   return resolve(basePath,fs.readdirSync(basePath).filter((f) => fs.statSync(resolve(basePath, f)).isDirectory())[0])
}