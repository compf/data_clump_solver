import fs from "fs"
import { GitHubService } from "../util/vcs/GitHubService"
import { getRepoDataFromUrl } from "../util/vcs/VCS_Service"
import { CodeObtainingContext, createDataClumpsTypeContext, DataClumpDetectorContext, DataClumpRefactoringContext } from "../context/DataContext";
import { PipeLineStep } from "../pipeline/PipeLineStep";
import { resolve } from "path"
import { DataClumpDoctorStepHandler } from "../pipeline/stepHandler/dataClumpDetection/DataClumpDoctorStepHandler";
import { activateLoader, loadConfiguration, registerFromName, resolveFromInterfaceName } from "../config/Configuration";
import { CloneBasedProjectRetriever } from "./project_list_retriever";
import { FileIO } from "../util/FileIO";
import path from "path"
import { getCurrLabel, makeUnique, setCurrLabel } from "../util/Utils";
import { AbstractLanguageModel } from "../util/languageModel/AbstractLanguageModel";
import { SingleUseStubInterface, StubInterface } from "../util/languageModel/StubInterface";
import { ChatGPTInterface } from "../util/languageModel/ChatGPTInterface";
import { LanguageModelTemplateResolver } from "../util/languageModel/LanguageModelTemplateResolver";
import { MetricCombiner } from "../util/filterUtils/MetricCombiner";
import { DataClumpSizeMetric } from "../pipeline/stepHandler/dataClumpFiltering/DataClumpSizeMetric";
import { DataClumpOccurenceMetric } from "../pipeline/stepHandler/dataClumpFiltering/DataClumpOccurenceMetric";
import { AffectedFileSizeMetric } from "../pipeline/stepHandler/dataClumpFiltering/AffectedFileSizeMetric";
import { DataClumpTypeContext } from "data-clumps-type-context";
import GPT4Tokenizer from "gpt4-tokenizer";
import { FilterOrMetric, SingleItemFilter } from "../util/filterUtils/SingleItemFilter";
import { RandomRanker } from "../util/filterUtils/RandomRanker";
import { RankSampler } from "../util/filterUtils/Ranker";
import { MetricNegator } from "../util/filterUtils/MetricNegator";
import { AffectedFilesMetric } from "../pipeline/stepHandler/dataClumpFiltering/AffectedFilesMetric";
import { Metric } from "../util/filterUtils/Metric";
import { CloneObtainingStepHandler } from "../pipeline/stepHandler/codeObtaining/CloneObtainingStepHandler";
import { loadExistingContext } from "../context/ExistingContextLoader";
const constantScores = {
    "instanceType": -1000,
    "projectName": -999,
    "iteration": 1000,
    "validation": 1001
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
export function isDebug() {
    return DEBUG;
}
const DEBUG_API_NAME = "SingleUseStubInterface"
let CLONE_AGAIN = true
export function disableCloning() {
    CLONE_AGAIN = false
}
export abstract class BaseEvaluator {

    async initProject(url: string): Promise<DataClumpRefactoringContext | null> {
        console.log(url)

      let cloneHandler=new CloneObtainingStepHandler({url:url,alwaysClone:this.alwaysClone()})
       

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
        registerFromName(AffectedFilesMetric.name, AffectedFilesMetric.name, {})

        let obtainingContext = await cloneHandler.handle(PipeLineStep.CodeObtaining, new DataClumpRefactoringContext(), {}) as CodeObtainingContext
        let dcHandler = new DataClumpDoctorStepHandler({});
        let originalDcContext:DataClumpDetectorContext;
        let ctx=loadExistingContext(PipeLineStep.ASTGeneration,obtainingContext)
        if(ctx==null){
            ctx=obtainingContext;
        }
        else{
            ctx=obtainingContext.buildNewContext(ctx)
        }
         ctx=loadExistingContext(PipeLineStep.DataClumpDetection,ctx)
        if(ctx!=null){
            originalDcContext=ctx as DataClumpDetectorContext
        }
        else{
            originalDcContext=await dcHandler.handle(PipeLineStep.DataClumpDetection, obtainingContext, {}) as DataClumpDetectorContext
            originalDcContext.serialize()

        }
        let builder = new InterestingDataClumpContextBuilder(this.getCriteria(), this.getNumDataClumpsPerBlock(), this.getNumberIterations())
        let projectDataFolder = this.getProjectDataFolder(url)
        let submittedDataClumpsPath = resolve(projectDataFolder, "submittedDataClumps.json")
        let filtered: DataClumpDetectorContext;
        if (fs.existsSync(submittedDataClumpsPath)) {
            filtered = originalDcContext.buildNewContext(new DataClumpDetectorContext(JSON.parse(fs.readFileSync(submittedDataClumpsPath).toString()))) as DataClumpDetectorContext
        }
        else {
            filtered = await builder.run(originalDcContext);
            let typeNameKeys = Object.values(filtered.getDataClumpDetectionResult().data_clumps).map((it) => filtered.createDataTypeNameClumpKey(it)).sort()

            fs.writeFileSync(resolve(projectDataFolder, "typeNameKeys.json"), JSON.stringify(typeNameKeys, null, 2));
            fs.writeFileSync(submittedDataClumpsPath, JSON.stringify(filtered.getDataClumpDetectionResult(), null, 2));
        }

        return Promise.resolve(filtered);
    }
    alwaysClone(): boolean {
        return false;
    }
    getProjectDataFolder(url: string): string {
        let path = "evalData/" + this.createInstanceCombination().instanceType[0] + "/" + getRepoDataFromUrl(url).repo
        fs.mkdirSync(path, { recursive: true })
        return path
    }
    shallIgnore(instance: Instance): boolean {
        return fs.existsSync(getInstancePath(["evalData"], "/", instance))
    }
    prepareLargeLanguageModelAPI() {
        let apiName: string = ChatGPTInterface.name
        if (DEBUG) {
            apiName = DEBUG_API_NAME;
        }
        registerFromName(apiName, AbstractLanguageModel.name, {})
    }
    abstract analyzeInstance(instance: Instance, context: DataClumpRefactoringContext): Promise<void>;
    async analyzeProject(project: string) {

        let ctx = await this.initProject(project);
        if (ctx == null) {
            return;
        }

        let instanceCombination = this.createInstanceCombination();
        let keys = Object.keys(instanceCombination).sort(instanceKeyComparator)
        let allInstances = createInstanceCombination(instanceCombination, keys).map((it) => this.simplifyInstance(it)).map((it) => JSON.stringify(it));
        allInstances = makeUnique(allInstances)
        this.prepareLargeLanguageModelAPI();
        let api = resolveFromInterfaceName(AbstractLanguageModel.name) as AbstractLanguageModel



        let projectPath = ctx.getProjectPath()
        let fileIO = FileIO.instance as InstanceBasedFileIO
        for (let instanceStr of allInstances) {
            let instance = JSON.parse(instanceStr) as Instance
            instance["projectName"] = path.basename(ctx.getProjectPath())
            fileIO.instance = instance;
            console.log(instance)
            if (this.shallIgnore(instance)) {
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
        fs.writeFileSync("stuff/finish", Date.now().toString())




    }
    abstract createInstanceCombination(): InstanceCombination;
    getNumDataClumpsPerBlock(): number {
        return 5;
    }
    getNumberIterations(): number {
        return 1000;
    }
    getCriteria(): FilterOrMetric[] {
        return [
            new DataClumpSizeMetric({ normalize: false }),
            new DataClumpOccurenceMetric(),
            new RandomRanker()

        ]
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

export class InterestingDataClumpContextBuilder {
    private numDataClumpContextPerBlock = 5;
    private criteria: FilterOrMetric[] = [];
    private numIterations = 100;
    constructor(criteria: FilterOrMetric[], numDataClumpContextPerBlock = 3, numIterations = 10) {
        this.criteria = criteria;
        this.numDataClumpContextPerBlock = numDataClumpContextPerBlock;
        this.numIterations = numIterations;
    }
    async run(initialContext: DataClumpDetectorContext): Promise<DataClumpDetectorContext> {
        let currMin = Number.MAX_VALUE;
        let currMinContext: DataClumpDetectorContext | undefined = undefined;
        let allDataClumps = Object.values(initialContext.getDataClumpDetectionResult().data_clumps);
        let ranker = new RankSampler({ differentDataClumps: true, strictSize: true, rankThreshold: this.numDataClumpContextPerBlock });
        let shuffleRanker = new RankSampler({ differentDataClumps: true, strictSize: true, rankThreshold: allDataClumps.length });
        let iterationsNoImprovement = 0
        while (iterationsNoImprovement < this.numIterations) {
            allDataClumps = await shuffleRanker.rank(new RandomRanker(), allDataClumps, initialContext) as DataClumpTypeContext[]
            let currDataClumps: DataClumpTypeContext[] = [];
            for (let filterOrMetric of this.criteria) {
                if ("evaluate" in filterOrMetric) {
                    currDataClumps.push(...(await ranker.rank(filterOrMetric as Metric, allDataClumps, initialContext) as DataClumpTypeContext[]))
                }
                else {
                    let filter = filterOrMetric as SingleItemFilter;
                    let filtered = allDataClumps.filter((it) => filter.shallRemain(it, initialContext))
                    filtered = await ranker.rank(new RandomRanker(), filtered, initialContext) as DataClumpTypeContext[]
                }
            }
            let size = await this.calcSize(currDataClumps, initialContext);
            if (size < currMin) {
                iterationsNoImprovement = 0;
                console.log("new min", size)

                currMin = size;
                let withKeys: { [key: string]: DataClumpTypeContext } = {}
                for (let d of currDataClumps) {
                    withKeys[d.key] = d;
                }
                currMinContext = initialContext.buildNewContext(new DataClumpDetectorContext(createDataClumpsTypeContext(withKeys))) as DataClumpDetectorContext;
                for (let dc of Object.values(currMinContext.getDataClumpDetectionResult().data_clumps)) {
                    console.log(initialContext.createDataTypeNameClumpKey(dc).split(";"))
                    for (let m of this.criteria) {
                        if ("evaluate" in m) {
                            console.log(m.constructor.name, await (m.evaluate as any)(dc, initialContext))
                        }
                    }
                }
                let tokenSize = this.guessTokenSize(currMinContext);
                console.log("Estimated token size", tokenSize)
                console.log("################")
            }
            else {
                iterationsNoImprovement++;
            }
        }
        return currMinContext!;

    }
    guessTokenSize(context: DataClumpDetectorContext) {

        let tokenizer = new GPT4Tokenizer({ type: "gpt4" });

        let files = this.getFiles(Object.values(context.getDataClumpDetectionResult().data_clumps));
        let tokens = 0;
        let allContent = "";
        for (let file of files) {
            let content = fs.readFileSync(resolve(context.getProjectPath(), file)).toString();
            tokens += tokenizer.estimateTokenCount(content);
            allContent += "\n" + content;
        }
        fs.writeFileSync("stuff/allContent.txt", allContent)
        return tokens;


        //fileNumberFilter.getAffectedFiles(context)
    }
    getFiles(dataClumps: DataClumpTypeContext[]): Set<string> {
        let files: Set<string> = new Set();
        let sum = 0;
        for (let dataClump of dataClumps) {
            files.add(dataClump.from_file_path);
            files.add(dataClump.to_file_path);
        }
        return files;
    }
    async calcSize(dataClumps: DataClumpTypeContext[], context: DataClumpRefactoringContext): Promise<number> {

        let files = this.getFiles(dataClumps);
        let sum = 0;
        for (let file of files) {
            sum += fs.statSync(resolve(context.getProjectPath(), file)).size;
        }

        return sum;
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
        fs.writeFileSync("stuff/currInstance.json", JSON.stringify(this.instance, null, 2))
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
    else if (args.length >= 2) {
        DEBUG = true
    }
    let url = args[0]

    return url;
}