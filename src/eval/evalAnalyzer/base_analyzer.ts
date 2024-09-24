import { CodeObtainingContext, DataClumpDetectorContext, DataClumpRefactoringContext, FileFilteringContext } from "../../context/DataContext";
import { DataClumpDoctorStepHandler } from "../../pipeline/stepHandler/dataClumpDetection/DataClumpDoctorStepHandler";
import { getRelevantFilesRec, nop } from "../../util/Utils";
import { BaseEvaluator, disableCloning, Instance, InstanceBasedFileIO, InstanceCombination } from "../base_eval";
import { DetectEval } from "../eval_detect";
import fs from "fs"
import { resolve, dirname } from "path"
import { CloneBasedProjectRetriever } from "../project_list_retriever";
import { getRepoDataFromUrl } from "../../util/vcs/VCS_Service";
import { PipeLineStep } from "../../pipeline/PipeLineStep";
import { loadExistingContext } from "../../context/ExistingContextLoader";
import { FileIO } from "../../util/FileIO";
import { CloneObtainingStepHandler } from "../../pipeline/stepHandler/codeObtaining/CloneObtainingStepHandler";
import { DataClumpsTypeContext, DataClumpTypeContext } from "data-clumps-type-context";
import ts from "typescript";

export type InstanceCombinationWithMetrics = InstanceCombination & {
    metricNames: string[]
}
export type DataClumpGuess = {
    score: number,
    dataClump: DataClumpTypeContext | null,
    maxFails: string[],
    maxMatches: string[],
    fromFiltered: boolean
}

export function parseLLMOutput(dirPath: string) {
    let parsed = JSON.parse(fs.readFileSync(dirPath + "/response.json", { encoding: "utf-8" }))
    return parsed
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
    async loadContext(urls: string[]): Promise<{ [projectName: string]: DataClumpRefactoringContext }> {
        let result = {}
        for (let url of urls) {
            let projectData = getRepoDataFromUrl(url)
            let context = (await (this.getEvaluator().initProject(url)))!
            result[projectData.repo] = context
        }
        return result
    }
    isSubset(superSet: any, subSet: any) {
        for (let k of Object.keys(subSet)) {
            if (!(k in superSet)) {
                return false
            }
            if (subSet[k] != superSet[k]) {
                return false
            }
        }
        return true
    }
    async performRawAnalysis(urls: string[], filters: any[]) {
        //disableCloning()



        let allCOntexts = await this.loadContext(urls)


        let instancesPaths: string[] = []
        let filterContext = new FileFilteringContext([".*instance.json"], [])
        getRelevantFilesRec("evalData", instancesPaths, filterContext)
        let metrics = this.getMetrics()

        let instanceType = this.getEvaluator().createInstanceCombination().instanceType[0]
        let instances:Instance[]=[]
        let newInstancePaths: string[] = []
        
        for(let p of instancesPaths){
            let parsed=JSON.parse(fs.readFileSync(p, { encoding: "utf-8" }) as any)
            if(filters.length==0){
                instances.push(parsed)
                newInstancePaths.push(p)
            }
            else if(filters.some((f)=>this.isSubset(parsed,f))){
                instances.push(parsed);
                newInstancePaths.push(p)
            }
        }
        instancesPaths=newInstancePaths
        
        
        let counter = 0
        let returnedInstances: Instance[] = []
        FileIO.instance = new InstanceBasedFileIO();

        for (let instance of instances) {

            (FileIO.instance as InstanceBasedFileIO).instance = instance
            let instancePath = dirname(instancesPaths[counter])
            instancePath = getFirstDirectory(instancePath)
            counter++
            let result = {}
            if (instance.instanceType != instanceType) continue
            let parsed = parseLLMOutput(instancePath)
            for (let m of metrics) {
                let metricResult = await m.eval(instance, instancePath, allCOntexts[(instance as any).projectName], parsed)
                result[m.getName()] = metricResult
            }
            (instance as any).metrics = result
            returnedInstances.push(instance)
            nop();


        }



        return returnedInstances

    }
}
export interface EvalMetric {
    eval(instance: Instance, dirPath: string, context: DataClumpRefactoringContext, llmOutput: any): any
    getName(): string
}

export function getFirstDirectory(basePath: string): string {
    return resolve(basePath, fs.readdirSync(basePath).filter((f) => fs.statSync(resolve(basePath, f)).isDirectory())[0])
}


export function getProbabilityCorrectDataClump(input: any, compare: DataClumpTypeContext): { matches: string[], fails: string[] } {

    if (compare == null || input == null) {
        return { matches: [], fails: [] }
    }
    if (typeof input == "string") {
        let relevantValues = [
            compare.key.toString(),
            compare.from_file_path,
            compare.to_file_path,
            compare.from_class_or_interface_name,
            compare.to_class_or_interface_name,
            compare.from_method_name,
            compare.to_method_name,

        ]
        for (let data of Object.values(compare.data_clump_data)) {
            relevantValues.push(data.name)
            relevantValues.push(data.type)
        }
        let matches: string[] = []
        let all = relevantValues.length
        for (let r of relevantValues) {
            if (r != null && input.includes(r)) {
                matches.push(r)
            }

        }
        return { matches: matches, fails: [] }
    }
    else if (typeof input == "object") {
        let relevantGeneralKeys = [
            "from_file_path",
            "to_file_path",
            "from_class_or_interface_name",
            "to_class_or_interface_name",
            "from_method_name",
            "to_method_name",
        ];

        let relevantDataclumpDataKeys = [
            "name",
            "type"
        ]
        let positionRelatedKeys = [
            "startLine",
            "endLine"
        ]

        let counters: { matches: string[], fails: string[] } = { matches: [], fails: [] }
        compareObjects(compare, input, relevantGeneralKeys, counters, true)
        if ("data_clump_data" in input && "data_clump_data" in compare) {
            for (let inp of Object.values(input.data_clump_data)) {

                for (let cmp of Object.values(compare.data_clump_data)) {
                    compareObjects(cmp, inp, relevantDataclumpDataKeys, counters, false)
                    compareObjects(cmp["position"], (inp as any)["position"], positionRelatedKeys, counters, false)
                    if ("to_variable" in cmp && "to_variable" in (inp as any)) {
                        compareObjects(cmp.to_variable, (inp as any)["to_variable"], relevantDataclumpDataKeys, counters, false)

                        compareObjects(cmp["to_variable"]["position"], (inp as any)["to_variable"]["position"], positionRelatedKeys, counters, false)
                    }

                }
            }
        }
        return counters

    }
    return { matches: [], fails: [] }
}






const REPEAT_COUNT = 4;
let InsignificantKeys = ["type"]
export function compareObjects(compareObject: any, otherObject, keys: string[], counters: { matches: string[], fails: string[] }, increaseFail: boolean) {

    if (compareObject == null || otherObject == null || compareObject == undefined || otherObject == undefined) {
        return
    }
    for (let k of keys) {
        let count = InsignificantKeys.includes(k) ? 0.25 * REPEAT_COUNT : REPEAT_COUNT
        if (compareObject[k] == undefined || compareObject[k] == null) {
            if ((otherObject[k] != undefined && otherObject[k] != null)) {
                for (let i = 0; i < count; i++) {
                    counters.fails.push(k)
                }
            }
        }
        else if (compareObject[k] == otherObject[k]) {
            for (let i = 0; i < count; i++) {
                counters.matches.push(k)
            }
        }
        else if (increaseFail) {
            for (let i = 0; i < count; i++) {
                counters.fails.push(k)
            }
        }
    }
}

export type Surety = "match" | "miss" | "prettyUnsure" | "prettySure"
export function evaluateBestFittingDataClump(context: DataClumpRefactoringContext, llmDC: DataClumpTypeContext): Surety {
    const THRESHOLD_MATCH = 0.9
    const THRESHOLD_UNSURE = 0.5
    const THRESHOLD_MISS = 0.2
    let guess = getBestFittingDataClump(context, llmDC)
    if (guess.score >= THRESHOLD_MATCH) {
        return "match"
    }
    else if (guess.score <= THRESHOLD_MISS) {
        return "miss"
    }
    else if (guess.score >= THRESHOLD_UNSURE) {
        return "prettySure"
    }
    else {
        return "prettyUnsure"
    }
}
export function getBestFittingDataClump(context: DataClumpRefactoringContext, input: any): DataClumpGuess {
    let maxValue = 0;
    let groundTruthFiltered = context.getByType(DataClumpDetectorContext)!.getDataClumpDetectionResult()
    let groundTruthUnFiltered = context.getFirstByType(DataClumpDetectorContext)!.getDataClumpDetectionResult()
    let maxDc: DataClumpTypeContext | null = null
    let maxMatches: string[] = []
    let maxFails: string[] = []
    let fromFiltered = true;
    if (!Array.isArray(input)) {
        input = [input]
    }
    for (let inp of input) {

        for (let dc of Object.values(groundTruthFiltered.data_clumps)) {
            let matchesFails = getProbabilityCorrectDataClump(inp, dc)
            let value = (matchesFails.matches.length - matchesFails.fails.length) / (matchesFails.matches.length + matchesFails.fails.length)
            if (value > maxValue) {
                maxValue = value
                maxDc = dc
                maxFails = matchesFails.fails
                maxMatches = matchesFails.matches
                fromFiltered = true
            }
        }

        for (let dc of Object.values(groundTruthUnFiltered.data_clumps)) {
            let matchesFails = getProbabilityCorrectDataClump(inp, dc)
            let value = (matchesFails.matches.length - matchesFails.fails.length) / (matchesFails.matches.length + matchesFails.fails.length)
            if (value > maxValue) {
                maxValue = value
                maxDc = dc
                maxFails = matchesFails.fails
                maxMatches = matchesFails.matches
                fromFiltered = false
            }
        }
    }
    return { score: maxValue, dataClump: maxDc, fromFiltered: fromFiltered, maxFails, maxMatches }
}