import { CodeObtainingContext, DataClumpDetectorContext, DataClumpRefactoringContext, FileFilteringContext } from "../../context/DataContext";
import { DataClumpDoctorStepHandler } from "../../pipeline/stepHandler/dataClumpDetection/DataClumpDoctorStepHandler";
import { getRelevantFilesRec, nop, parseInvalidJSON, tryParseJSON } from "../../util/Utils";
import { BaseEvaluator, disableCloning, getInstancePath, Instance, InstanceBasedFileIO, InstanceCombination } from "../base_eval";
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
import simpleGit, { DiffResult } from "simple-git";
import { concatenateResults, FilterMapper, MetricMapper, statFunctions } from "./utils";

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

export type InstanceGeneratedData = {
    instance: Instance,
    responsePaths: string[],
    requestPaths: string[],
    responsesParsed: any[]
    fileContents: { [key: string]: string },
    validationResults: number[],
    gitDiff: DiffResult | null,
    dataClumpDetectionResult: number | null,

}
export abstract class EvalAnalyzer {
    abstract getEvaluator(): BaseEvaluator;


    abstract getMetrics(): EvalMetric[];
    protected generatedData: { [key: string]: InstanceGeneratedData } = {}
    filter(instance: Instance, compareObject: any): boolean {
        for (let key in compareObject) {
            if (instance[key] != compareObject[key]) {
                return false;
            }
        }
        return true;
    }
    parseLLMOutput(dirPath: string) {
        let parsed = tryParseJSON(fs.readFileSync(dirPath + "/response.json", { encoding: "utf-8" })) ?? "{}"
        return parsed
    }
    createInstanceCombination() {
        let comb = this.getEvaluator().createInstanceCombination()
        comb.projectName = ["argoumlrefactor", "rocketmq_refactor"]
        comb["includeUsages"] = ["withUsages", "noUsages"]
        return comb
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
            let git = simpleGit("cloned_projects/" + projectData.repo)
            let g = await git.checkout("context");
            result[projectData.repo] = context
        }
        return result
    }

    getClosingBrackets(path: string): string {
        return "}}}}}"
    }
    loadGeneratedData(instance: Instance, context: DataClumpRefactoringContext): Promise<InstanceGeneratedData> {
        let responsePaths: string[] = []
        let filterContext = new FileFilteringContext( [".*response.json"], [])
        getRelevantFilesRec(getInstancePath(["evalData"], "/", instance) , responsePaths, filterContext)
        let requestPaths = responsePaths.map((p) => p.replace("response.json", "request.json"));
        let res= Promise.resolve({
            instance: instance,
            responsePaths: responsePaths,
            responsesParsed: responsePaths.map((it) => parseInvalidJSON(fs.readFileSync(it).toString(), this.getClosingBrackets(it))),
            requestPaths: requestPaths,
            fileContents: {},
            validationResults: [],
            gitDiff: null,
            dataClumpDetectionResult: null
        })
        return res;

    }
    abstract getName(): string
    async performRawAnalysis(urls: string[], filters: any[]) {
        //disableCloning()
        let metrics = this.getMetrics()

        let relevantMetrics: MetricMapper = {}

        for (let m of metrics.map((it) => it.getName())) {
            relevantMetrics[m] = (instances: Instance[]) => {
                return instances.map((it) => (it as any)["metrics"][m])
            }
        }
        let allCompareObjects = (createCompareObjects(this.createInstanceCombination()))
        let compareObjects: { [k: string]: any } = {};
        for (let c of allCompareObjects) {
                let k = Object.entries(c).map((it) => it[0] + "=" + it[1]).join(",")
                compareObjects[k] = c
            
          

        }
        let instanceFilters: FilterMapper = {}
        for (let cmp of Object.entries(compareObjects)) {
            instanceFilters[cmp[0]] = ((d) => {
                return Object.keys(cmp[1]).every((k) => cmp[1][k] == d[k])
            })
        }

        let allCOntexts = await this.loadContext(urls)
        let repoNames = Object.keys(allCOntexts)
        let subSetChecker = new SubSetChecker()
        let instancesPaths: string[] = []
        let filterContext = new FileFilteringContext([".*instance.json"], [])
        getRelevantFilesRec("evalData", instancesPaths, filterContext)

        let instanceType = this.getEvaluator().createInstanceCombination().instanceType[0]
        let instances: Instance[] = []
        let newInstancePaths: string[] = []

        for (let p of instancesPaths) {
            let parsed = JSON.parse(fs.readFileSync(p, { encoding: "utf-8" }) as any)
            if (filters.length == 0) {
                instances.push(parsed)
                newInstancePaths.push(p)
            }
            else if (filters.some((f) => subSetChecker.isSubset(parsed, f))) {
                instances.push(parsed);
                newInstancePaths.push(p)
            }
        }
        instancesPaths = newInstancePaths


        let counter = 0
        let returnedInstances: Instance[] = []
        const redo = true;
        if (redo) {
            for (let instance of instances) {
            if (instance.instanceType != instanceType || !repoNames.includes(instance.projectName)) continue

                if (instance.instanceType != instanceType || !repoNames.includes(instance.projectName)) continue
                this.generatedData[getInstancePath([], "/", instance)] = await this.loadGeneratedData(instance, allCOntexts[(instance as any).projectName])
            }
        }
        else {
            for (let instance of instances) {
            if (instance.instanceType != instanceType || !repoNames.includes(instance.projectName)) continue

                let instancePath = getInstancePath(["evalData"], "/", instance)


                instance["metrics"] = JSON.parse(fs.readFileSync(resolve(instancePath, "instanceWithMetrics.json")).toString())["metrics"]
                returnedInstances.push(instance)
            }
            concatenateResults(this.getName(), returnedInstances,
            instanceFilters, relevantMetrics)
        return returnedInstances
            return instances
        }

        FileIO.instance = new InstanceBasedFileIO();
        let allResults: { [key: string]: number } = {}
        for (let instance of instances) {
            (FileIO.instance as InstanceBasedFileIO).instance = instance;
            let instancePath = dirname(instancesPaths[counter])
            instancePath = getFirstDirectory(instancePath)
            counter++
            let result = {}
            if (instance.instanceType != instanceType || !repoNames.includes(instance.projectName)) continue
            let generated = this.generatedData[getInstancePath([], "/", instance)]
            if (generated.instance.inputFormat) {
                (generated.instance as any).inputType = instance.inputFormat
            }
            else if ((generated.instance as any).inputType) {
                generated.instance.inputFormat = (instance as any).inputType
            }
            for (let m of metrics) {
                let metricResult = await m.eval(generated, allCOntexts[(instance as any).projectName])
                result[m.getName()] = metricResult
                allResults[JSON.stringify(instance) + m.getName()] = metricResult
            }
            instancePath = getInstancePath(["evalData"], "/", instance)
            fs.mkdirSync(instancePath, { recursive: true });
            (instance as any).metrics = result

            fs.writeFileSync(resolve(instancePath, "instanceWithMetrics.json"), JSON.stringify(instance, undefined, 2));


            //console.log("Finished instance", JSON.stringify(instance,undefined,2))
            returnedInstances.push(instance)
            nop();


        }


        



        /* = compareObjects.map((it) => {
            return (d)=>{ 
                return Object.keys(it[1]).every((k)=>it[1][k]==d[k])
            }
        });*/

        concatenateResults(this.getName(), returnedInstances,
            instanceFilters, relevantMetrics)
        return returnedInstances

    }
}

export interface EvalMetric {
    eval(instance: any, context: DataClumpRefactoringContext): Promise<any>
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

export class SubSetChecker {

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
}

function transpose(obj: any, indices: number[]) {
    let result = {}
    let values = []

    for (let k1 of Object.keys(obj)) {
        result[k1] = {}
        for (let k2 of Object.keys(obj[k1])) {

        }
    }
}

function concatenateResults_(prefix: string, compareObjects: any[], metrics: EvalMetric[], instances: Instance[], subSetChecker: SubSetChecker) {
    let result = {}
    for (let inst of instances) {
        if (!inst["includeUsages"]) {
            inst["includeUsages"] = "noUsages"
        }
    }

    for (let functionKey of Object.keys(statFunctions)) {
        let f = statFunctions[functionKey]
        result[functionKey] = {}

        for (let metricKey of metrics.map((it) => it.getName())) {



            result[functionKey][metricKey] = {}
            for (let cmp of compareObjects) {
                let compareKey = Object.keys(cmp).map((it) => it + "= " + cmp[it]).join(" , ")
                let relevantInstances = instances.filter((it) => subSetChecker.isSubset(it, cmp))
                if (relevantInstances.length == 0) {
                    continue
                }
                let res = f(relevantInstances.map((it) => (it as any).metrics[metricKey]))

                if (true) {
                    result[functionKey][metricKey][compareKey] = res;
                }

            }
        }
    }

    for (let functionKey of Object.keys(result)) {
        fs.mkdirSync("evalDataResults/" + prefix + "/" + functionKey, { recursive: true })
        for (let metricKey of Object.keys(result[functionKey])) {
            fs.writeFileSync("evalDataResults/" + prefix + "/" + functionKey + "/" + metricKey + ".json", JSON.stringify(result[functionKey][metricKey], undefined, 2))
        }
    }
    return result;
}





export function createCompareObjects(baseObjects: any): any[] {
    let result: any[] = []
    let combination = baseObjects
    for (let key1 of Object.keys(combination)) {
        for (let v1 of combination[key1]) {
            let obj = {}
            obj[key1] = v1
            result.push(obj)
        }
        for (let key2 of Object.keys(combination)) {

            if (key1 == key2) {
                continue
            }
            else if (key1 == "iteration" || key2 == "iteration") {
                continue
            }
            else {
                for (let v1 of combination[key1]) {
                    for (let v2 of combination[key2]) {
                        let obj = {}
                        obj[key1] = v1
                        obj[key2] = v2
                        result.push(obj)
                    }
                }
            }
        }


    }
    return result
}

export abstract class MultipleValuesMetric implements EvalMetric {
    func: { (arr: any[]): any };
    name: string
    constructor(f: { (arr: number[]): any }, name: string) {
        this.func = f
        this.name = name
    }
    abstract getPrefix(): string;
    getName(): string {
        return this.getPrefix() + "_" + this.name
    }
    async eval(instance: any, context: DataClumpRefactoringContext): Promise<number> {
        return this.func(await this.evalArray(instance, context))
    }
    abstract evalArray(instance: any, context: DataClumpRefactoringContext): Promise<any[]>

}

export class InvalidJsonMetric implements EvalMetric {
    async eval(instance: InstanceGeneratedData, context: DataClumpRefactoringContext): Promise<any> {
        let notNull = 0
        for (let i = 0; i < instance.responsePaths.length; i++) {
            let content = fs.readFileSync(instance.responsePaths[i]).toString()
            let parsed = tryParseJSON(content)
            if (parsed != null) {
                notNull++;
            }
        }
        return notNull / instance.responsePaths.length;


    }
    getName(): string {
        return "ValidJSON"
    }

}