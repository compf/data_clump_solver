import fs from "fs"
import { GitHubService } from "../util/vcs/GitHubService"
import { getRepoDataFromUrl } from "../util/vcs/VCS_Service"
import { CodeObtainingContext, DataClumpDetectorContext, DataClumpRefactoringContext } from "../context/DataContext";
import { PipeLineStep } from "../pipeline/PipeLineStep";
import { resolve } from "path"
import { DataClumpDoctorStepHandler } from "../pipeline/stepHandler/dataClumpDetection/DataClumpDoctorStepHandler";
import { activateLoader, loadConfiguration, registerFromName, resolveFromInterfaceName } from "../config/Configuration";
import { CloneBasedProjectRetriever } from "./project_list_retriever";
import { FileIO } from "../util/FileIO";
import path from "path"
import {  getCurrLabel, makeUnique, setCurrLabel } from "../util/Utils";
import { AbstractLanguageModel } from "../util/languageModel/AbstractLanguageModel";
import { SingleUseStubInterface, StubInterface } from "../util/languageModel/StubInterface";
import { ChatGPTInterface } from "../util/languageModel/ChatGPTInterface";
import { LanguageModelTemplateResolver } from "../util/languageModel/LanguageModelTemplateResolver";
import { MetricCombiner } from "../util/filterUtils/MetricCombiner";
import { DataClumpSizeMetric } from "../pipeline/stepHandler/dataClumpFiltering/DataClumpSizeMetric";
import { DataClumpOccurenceMetric } from "../pipeline/stepHandler/dataClumpFiltering/DataClumpOccurenceMetric";
import { AffectedFileSizeMetric } from "../pipeline/stepHandler/dataClumpFiltering/AffectedFileSizeMetric";
const constantScores = {
    "instanceType": -1000,
    "projectName": -999,
    "iteration": 1000
}
function instanceKeyComparator(a: string, b: string) {
    let aScore = constantScores[a] || -a.length;
    let bScore = constantScores[b] || -b.length;
    return aScore - bScore;

}
export type Instance = {
    instanceType: string,
    model: string,
    temperature: number,
    iteration: number,
}
export type Arrayified<T> = {
    [K in keyof T]: T[K][];
};

export type InstanceCombination = Arrayified<Instance>;
 let DEBUG = false;
 export function isDebug(){
    return DEBUG;
 }
const DEBUG_API_NAME="SingleUseStubInterface"
let CLONE_AGAIN = true
export function disableCloning() {
    CLONE_AGAIN = false
}
export abstract class BaseEvaluator {

    async initProject(url: string): Promise<DataClumpRefactoringContext | null> {
        console.log(url)

        let retriever = new CloneBasedProjectRetriever(url, CLONE_AGAIN)
        retriever.init()

        registerFromName(LanguageModelTemplateResolver.name, LanguageModelTemplateResolver.name, {

            "${programming_language}": "Java",
            "%{examples}": "chatGPT_templates/DataClumpExamples.java",
            "%{refactor_instruction}": "chatGPT_templates/refactor_one_data_clump.template",
            "%{detected_data_clumps}": "chatGPT_templates/refactor/detected_data_clumps_minified.json",
            "%{output_format_refactor}": "chatGPT_templates/json_format_refactor_piecewise.json",
            "%{output_format}": "chatGPT_templates/data_clump_type_context_output_format.json",

            "%{llm_output_format}": "chatGPT_templates/use_markdown.template"

        })

        registerFromName(MetricCombiner.name, MetricCombiner.name, {
            "metrics": [
                { "name": "DataClumpSizeMetric", "weight": 1 },
                { "name": "DataClumpOccurenceMetric", "weight": 1 },
                { "name": "AffectedFileSizeMetric", "weight": -1000 }
            ]
        })

        registerFromName(DataClumpSizeMetric.name, DataClumpSizeMetric.name, {})
        registerFromName(DataClumpOccurenceMetric.name, DataClumpOccurenceMetric.name, {})
        registerFromName(AffectedFileSizeMetric.name, AffectedFileSizeMetric.name, {})
        let obtainingContext = new CodeObtainingContext(resolve("cloned_projects" + "/" + getRepoDataFromUrl(url).repo))
        let dcHandler = new DataClumpDoctorStepHandler({});


        let originalDcContext = await dcHandler.handle(PipeLineStep.DataClumpDetection, obtainingContext, {}) as DataClumpDetectorContext
        originalDcContext.serialize()
        return Promise.resolve(originalDcContext);
    }

    abstract analyzeInstance(instance: Instance, context: DataClumpRefactoringContext): Promise<void>;
    async analyzeProject(project: string) {

        let ctx = await this.initProject(project);
        if (ctx == null) {
            return;
        }

        let instanceCombination = this.createInstanceCombination();
        let keys = Object.keys(instanceCombination).sort(instanceKeyComparator)
        let allInstances = createInstanceCombination(instanceCombination, keys).map((it)=>this.simplifyInstance(it)).map((it)=>JSON.stringify(it));
        allInstances=makeUnique(allInstances)
        let apiName: string = ChatGPTInterface.name
        if(DEBUG){
            apiName=DEBUG_API_NAME;
        }
        registerFromName(apiName, AbstractLanguageModel.name, {})
        let api = resolveFromInterfaceName(AbstractLanguageModel.name) as AbstractLanguageModel



        let projectPath = ctx.getProjectPath()
        let fileIO = FileIO.instance as InstanceBasedFileIO
        for (let instanceStr of allInstances) {
            let instance=JSON.parse(instanceStr) as Instance
            instance["projectName"] = path.basename(ctx.getProjectPath())
            fileIO.instance = instance;
            console.log(instance)
            if ( fs.existsSync(getInstancePath([projectPath], "/", instance))) {
                continue;
            }
            api.clear();
            api.resetParameters(instance)
            setCurrLabel(Date.now().toString())
            if (DEBUG) {
                try {
                     await this.analyzeInstance(instance, ctx!);
                }
                catch (e) {
                    console.log("Error", e)
                }
            }
            else {
                await this.analyzeInstance(instance, ctx);
            }
        }
        console.log("finish")
        fs.writeFileSync("stuff/finish",Date.now().toString())




    }
    abstract createInstanceCombination(): InstanceCombination;
    getRankerThreshold(): number {
        return 10;
    }
    simplifyInstance(instance: Instance): Instance {
        return instance;
    }

}

export function createInstanceCombination<T>(tupleOfArrays: Arrayified<T>, keys: string[] = Object.keys(tupleOfArrays)): T[] {
    let targetObject: T = {} as any
    let objectList: T[] = []

    createInstanceCombinationRecursive(tupleOfArrays, targetObject, 0, objectList, keys);
    return objectList
}

function createInstanceCombinationRecursive<T>(tupleOfArrays: Arrayified<T>, targetObject: T, currKeyIndex: number, objectList: T[], keys: string[]) {
    let currKey = keys[currKeyIndex];
    for (let value of tupleOfArrays[currKey]) {
        targetObject[currKey] = value
        if (currKeyIndex + 1 < keys.length) {
            createInstanceCombinationRecursive(tupleOfArrays, targetObject, currKeyIndex + 1, objectList, keys)
        }
        else {
            objectList.push(JSON.parse(JSON.stringify(targetObject)))
        }
    }

}


export class InstanceBasedFileIO extends FileIO {
    public instance: Instance = {} as any
    public baseDir = "evalData"
    resolvePath(key: string): string {

        let dir = getInstancePath([this.baseDir], "/", this.instance)
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }
        fs.writeFileSync(resolve(dir, "instance.json"), JSON.stringify(this.instance, null, 2))
        dir = resolve(dir, getCurrLabel().toString())
        dir = resolve(dir, key)

        dir = path.dirname(dir)

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }
        let resultingPath = resolve(dir, path.basename(key))
        return resultingPath;
    }

}
export function getInstancePath(array: string[], joinChar: string, instance: Instance): string {
    let sortedKeys = array
    sortedKeys.push(...Object.keys(instance).sort(instanceKeyComparator).map((it) => instance[it]));


    let dir = sortedKeys.join(joinChar)
    return dir;
}
export function init(): string {
    activateLoader()
    let args = process.argv.slice(2)
    if (args.length < 1) {
        console.log("Usage: node eval.js <url>")
        throw "Invalid arguments";
    }
    else if(args.length>=2){
        DEBUG=true
    } 
    let url = args[0]

    return url;
}