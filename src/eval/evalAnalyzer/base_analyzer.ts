import { CodeObtainingContext, createDataClumpsTypeContext, DataClumpDetectorContext, DataClumpRefactoringContext, FileFilteringContext, RelevantLocationsContext } from "../../context/DataContext";
import { DataClumpDoctorStepHandler } from "../../pipeline/stepHandler/dataClumpDetection/DataClumpDoctorStepHandler";
import { getRelevantFilesRec, nop, parseInvalidJSON, parseUsingJsonRepair, tryParseJSON } from "../../util/Utils";
import { BaseEvaluator, disableCloning, getInstancePath, Instance, InstanceBasedFileIO, InstanceCombination } from "../base_eval";
import { DetectEval } from "../eval_detect";
import fs, { Stats } from "fs"
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
import { DataClumpOccurenceMetric } from "../../pipeline/stepHandler/dataClumpFiltering/DataClumpOccurenceMetric";
import { AffectedFileSizeMetric } from "../../pipeline/stepHandler/dataClumpFiltering/AffectedFileSizeMetric";
import { AffectedFilesMetric } from "../../pipeline/stepHandler/dataClumpFiltering/AffectedFilesMetric";
import { AnyMultipleFilter } from "../../util/filterUtils/AnyMultipleFilter";

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
    statsPaths:string[],
    responsesParsed: any[]
    fileContents: { [key: string]: string },
    validationResults: number[],
    gitDiff: DiffResult | null,
    errorPaths?:string[],
    dataClumpDetectionResult: number | null,
    handledDataClumps?: DataClumpTypeContext[]

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
        comb.projectName = ["argoumlrefactor", "rocketmq_refactor", "dolphinscheduler"]
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
            let loadedContextFiltered = (await (this.getEvaluator().initProject(url)))! as RelevantLocationsContext
            let loadedContextUnfiltered = loadedContextFiltered.getFirstByType(DataClumpDetectorContext)
            let git = simpleGit("cloned_projects/" + projectData.repo)
            let g = await git.checkout("context");

            let context: DataClumpRefactoringContext = new CodeObtainingContext(loadedContextFiltered.getProjectPath())
            let paths: { [key: string]: Set<number> } = {}
            let typeContext = createDataClumpsTypeContext({})
            loadedContextFiltered.getRelevantLocations(paths)
            for (let dc of Object.values(loadedContextUnfiltered!.getDataClumpDetectionResult().data_clumps)) {
                if (dc.from_file_path in paths || dc.to_file_path in paths) {
                    typeContext.data_clumps[dc.key] = dc;
                }
            }
            context = context.buildNewContext((new DataClumpDetectorContext(typeContext)))
            context = context.buildNewContext(new DataClumpDetectorContext(loadedContextFiltered.getByType(DataClumpDetectorContext)!.getDataClumpDetectionResult()))
            result[projectData.repo] = context
        }
        return result
    }
    log = fs.readFileSync("stuff/log").toString()

    getClosingBrackets(path: string): string {
        return "}}}}}"
    }
    abstract getDataClumps(instance: InstanceGeneratedData, context: DataClumpRefactoringContext): DataClumpTypeContext[];

    loadGeneratedData(instance: Instance, context: DataClumpRefactoringContext): Promise<InstanceGeneratedData> {
        let responsePaths: string[] = []
        let filterContext = new FileFilteringContext([".*response.json"], [])
        getRelevantFilesRec(getInstancePath(["evalData"], "/", instance), responsePaths, filterContext)
        let requestPaths = responsePaths.map((p) => p.replace("response.json", "request.json"));
        let statsPaths=responsePaths.map((p) => p.replace("response.json", "stats.json"));
        let res = Promise.resolve({
            instance: instance,
            responsePaths: responsePaths,
            responsesParsed: responsePaths.map((it) => parseInvalidJSON(fs.readFileSync(it).toString())),
            requestPaths: requestPaths,
            statsPaths:statsPaths,
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
        const numberInstances = instances.length
        let logCounter = 0;
        let generatedPath="stuff/generated_"+this.getName()+".json"
        if (fs.existsSync(generatedPath)) {
            this.generatedData = JSON.parse(fs.readFileSync(generatedPath).toString())
        }
        else {
            for (let instance of instances) {
            if (instance.instanceType != instanceType || !repoNames.includes(instance.projectName)) continue

                console.log("Initialize instance data", (logCounter++) / numberInstances * 100)


                this.generatedData[getInstancePath([], "/", instance)] = await this.loadGeneratedData(instance, allCOntexts[(instance as any).projectName])
            }
            fs.writeFileSync(generatedPath, JSON.stringify(this.generatedData))


        }


        const onlyFirstResponse=false;
        FileIO.instance = new InstanceBasedFileIO();
        let allResults: { [key: string]: number } = {}
        logCounter = 0;
        for (let instance of instances) {
            console.log("Evaluate instance data", (logCounter++) / numberInstances * 100);

            (FileIO.instance as InstanceBasedFileIO).instance = instance;
            let instancePath = dirname(instancesPaths[counter])
            instancePath = getFirstDirectory(instancePath)
            counter++
            let result = {}
            if (instance.instanceType != instanceType || !repoNames.includes(instance.projectName)) continue
            console.log(getInstancePath([], "/", instance),instance)
            let generated = this.generatedData[getInstancePath([], "/", instance)]
            if (generated.instance.inputFormat) {
                (generated.instance as any).inputType = instance.inputFormat
            }
            else if ((generated.instance as any).inputType) {
                generated.instance.inputFormat = (instance as any).inputType
            }
            if(onlyFirstResponse){
                generated.requestPaths=generated.requestPaths.slice(undefined,1)
                generated.responsePaths=generated.responsePaths.slice(undefined,1)
                generated.responsesParsed=generated.responsesParsed.slice(undefined,1)


            }
            let times = {}
            for (let m of metrics) {
                let metricResult = null as any as number;
                try {
                    let startTime = Date.now()
                    metricResult = await m.eval(generated, allCOntexts[(instance as any).projectName], this)
                    let elapsed = Date.now() - startTime;
                    times[m.getName()] = elapsed;
                    //fs.writeFileSync("stuff/times.json",JSON.stringify(times,undefined,2))

                }
                catch (ex) {
                    this.log += JSON.stringify(generated.instance, undefined, 2) + "\n\n"
                    fs.writeFileSync("stuff/log", this.log)
                }
                result[m.getName()] = metricResult
                allResults[JSON.stringify(instance) + m.getName()] = metricResult
            }
            (instance as any).metrics = result
            /* instancePath = getInstancePath(["evalData"], "/", instance)
            fs.mkdirSync(instancePath, { recursive: true });
           

            fs.writeFileSync(resolve(instancePath, "instanceWithMetrics.json"), JSON.stringify(instance, undefined, 2));*/


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
let indices={}
function getMaxSize(metric:EvalMetric|null){
    if(metric){
        return 1e7
    }
    else{
        return 1e8
    }
}
export function logMetric(metric:EvalMetric|null,obj:any){
    const PERC=0.05;
    if(Math.random()>PERC){
return ;
    }
    let metricName="null";
    if(metric){
        metricName=metric.getName()
    }
    let path="stuff/logs/"+metricName
    let content="";
    if(!(path in indices)){
        indices[path]=0;
    }
    let newPath=path+indices[path]
    if(fs.existsSync(newPath)){
        content=fs.readFileSync(newPath).toString()+"\n\n"
    }
   
    content+=JSON.stringify(obj,undefined,2)
    fs.writeFileSync(newPath,content)
    const MAX_SIZE=getMaxSize(metric)
    if(content.length>MAX_SIZE){
        indices[path]++
    }

}
export interface EvalMetric {
    eval(instance: InstanceGeneratedData, context: DataClumpRefactoringContext, analyzer?: EvalAnalyzer): Promise<any>
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
            if (data.name.length > 1 && data.type.length > 1) {
                relevantValues.push(data.name)
                relevantValues.push(data.type)
            }

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
    if(maxDc){
        logMetric(null,{
            input,
            dc:(context.getByType(DataClumpDetectorContext)!.createDataTypeNameClumpKey(maxDc!))
        })
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
        if (instance.responsePaths.length == 0) return 0;
        return notNull / instance.responsePaths.length;


    }
    getName(): string {
        return "ValidJSON"
    }

}

export abstract class DataClumpBasedMetric implements EvalMetric {
    async eval(instance: InstanceGeneratedData, context: DataClumpRefactoringContext, analyzer: EvalAnalyzer): Promise<any> {
        let dataClumps = analyzer.getDataClumps(instance, context)
        let values: number[] = []
        for (let dc of dataClumps) {
            values.push(await this.evaluateDataClump(dc, context))
        }
        return values;
    }
    abstract evaluateDataClump(dc: DataClumpTypeContext, context: DataClumpRefactoringContext): Promise<number>
    abstract getName(): string;


}

export class DataClumpOccurenceMetricEval extends DataClumpBasedMetric {

    async evaluateDataClump(dc: DataClumpTypeContext, context: DataClumpRefactoringContext): Promise<number> {
        let dcOccurenceMetric = new DataClumpOccurenceMetric()
        let v = await dcOccurenceMetric.evaluate(dc, context.getFirstByType(DataClumpDetectorContext)!);
        return v

    }
    getName(): string {
        return "DataClumpOccurence"
    }
}
export class DataClumpSizeMetric extends DataClumpBasedMetric {

    async evaluateDataClump(dc: DataClumpTypeContext, context: DataClumpRefactoringContext): Promise<number> {
        if (dc.data_clump_data) {
            let res = Object.values(dc.data_clump_data).length
            if (res > 30) {
                nop();
            }
            return res
        }
        return null as any;
    }

    getName(): string {
        return "DataClumpSize"
    }


}


export class FieldToFieldMetric extends DataClumpBasedMetric {
    async evaluateDataClump(dc: DataClumpTypeContext, context: DataClumpRefactoringContext): Promise<number> {
        if (dc.from_method_name == null && dc.to_method_name == null) {
            return 1
        }
        else {
            return 0
        }
    }


    getName(): string {
        return "FieldToField"
    }
}

export class ParametersToParametersMetric extends DataClumpBasedMetric {
    async evaluateDataClump(dc: DataClumpTypeContext, context: DataClumpRefactoringContext): Promise<number> {
        if (dc.from_method_name != null && dc.to_method_name != null) {
            return 1
        }
        else {
            return 0
        }
    }

    getName(): string {
        return "ParametersToParameters"
    }
}

class PreferNonPublicModifierMetric extends DataClumpBasedMetric {
    async evaluateDataClump(dc: DataClumpTypeContext, context: DataClumpRefactoringContext): Promise<number> {
        if (dc.data_clump_data) {
            let modifiers = Object.values(dc.data_clump_data)[0].modifiers
            if (modifiers?.includes("PUBLIC")) {
                return 0
            }
            else {
                return 1
            }
        }
        return null as any

    }
    getName(): string {
        return "PreferNonPublic"
    }
}

class PrimitiveTypesRatioMetric extends DataClumpBasedMetric {
    async evaluateDataClump(dc: DataClumpTypeContext, context: DataClumpRefactoringContext): Promise<number> {
        let counter = 0;
        let allCounter = 0;
        if (dc.data_clump_data) {
            for (let data of Object.values(dc.data_clump_data)) {
                if (this.isPrimitive((data as any).displayedType)) {
                    counter++;
                }
                allCounter++
            }
        }
        if (allCounter == 0) return null as any
        return counter / allCounter


    }
    isPrimitive(type: string) {
        return type == "byte" || type == "short" || type == "int" || type == "long" || type == "boolean" || type == "String" || type == "char"
    }
    getName(): string {
        return "PrimitiveTypes"
    }
}

class AffectedFilesMetricEval extends DataClumpBasedMetric {
    evaluateDataClump(dc: DataClumpTypeContext, context: DataClumpRefactoringContext): Promise<number> {
        let affectedFiles = new AffectedFilesMetric();
        return affectedFiles.evaluate(dc, context)
    }
    getName(): string {
        return "AffectedFiles"
    }
}

export function addDataClumpSpecificMetrics(metrics: EvalMetric[]) {
    metrics.push(new DataClumpSizeMetric())
    metrics.push(new DataClumpOccurenceMetricEval())
    metrics.push(new ParametersToParametersMetric())
    metrics.push(new FieldToFieldMetric())
    metrics.push(new PreferNonPublicModifierMetric())
    metrics.push(new PrimitiveTypesRatioMetric())
    metrics.push(new AffectedFilesMetricEval())
    metrics.push(new TimeMetric())
    metrics.push(new TokenMetric())


}
type StatTemplate={
    "completion_tokens": number,
    "prompt_tokens": number,
    "total_tokens": number,
    "elapsedTime": number
}
class TimeMetric implements EvalMetric{
    getName(): string {
        return "Time"
    }
    async eval(instance: InstanceGeneratedData, context: DataClumpRefactoringContext, analyzer?: EvalAnalyzer): Promise<any> {
        let result:number[]=[]
        
        for(let s of instance.statsPaths){
            let stat=JSON.parse(fs.readFileSync(s).toString()) as StatTemplate
            result.push(stat.elapsedTime/1000)

        }
        return result
    }
}
class TokenMetric implements EvalMetric{
    getName(): string {
        return "Price"
    }
    async eval(instance: InstanceGeneratedData, context: DataClumpRefactoringContext, analyzer?: EvalAnalyzer): Promise<any> {
        let result:number[]=[]
        const INPUT_PRICE=0.01;
        const OUTPUT_PRICE=0.03
        
        for(let s of instance.statsPaths){
            let stat=JSON.parse(fs.readFileSync(s).toString()) as StatTemplate
            let price=INPUT_PRICE*stat.prompt_tokens/1000+OUTPUT_PRICE*stat.completion_tokens/1000
            result.push(price)

        }
        return result
    }
}