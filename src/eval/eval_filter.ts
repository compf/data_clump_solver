
import { PipeLineStep } from "../pipeline/PipeLineStep";
import { DataClumpSizeMetric } from "../pipeline/stepHandler/dataClumpFiltering/DataClumpSizeMetric";
import { DataClumpOccurenceMetric } from "../pipeline/stepHandler/dataClumpFiltering/DataClumpOccurenceMetric";
import { AffectedFileSizeMetric } from "../pipeline/stepHandler/dataClumpFiltering/AffectedFileSizeMetric";
import { RankSampler } from "../util/filterUtils/Ranker";
import { DataClumpLanguageModelFilter } from "../pipeline/stepHandler/dataClumpFiltering/DataClumpLanguageModelFilter";
import { AllFilesHandler, DataClumpCodeSnippetHandler, LargeLanguageModelHandler, SimpleInstructionHandler, SimplifiedDataClumpContextHandler } from "../pipeline/stepHandler/languageModelSpecific/LargeLanguageModelHandlers";
import { MetricCombiner } from "../util/filterUtils/MetricCombiner";
import { registerFromName, resolveFromConcreteName, resolveFromInterfaceName } from "../config/Configuration";
import { AbstractLanguageModel } from "../util/languageModel/AbstractLanguageModel";
import {  writeFileSync } from "../util/Utils";
import { DataClumpTypeContext } from "data-clumps-type-context";
import { Arrayified, BaseEvaluator, DEBUG, init, Instance, InstanceBasedFileIO, InstanceCombination } from "./base_eval";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../context/DataContext";
import { FileIO } from "../util/FileIO";
import { RandomRanker } from "../util/filterUtils/RandomRanker";
const MAX_ATTEMPTS = 5;
const model = "codegemma"
type FilterEvalInstance = Instance & {
    inputType: string,
    margin: number
}

type FilterEvalInstanceCombination = Arrayified<FilterEvalInstance>
export class FilterEval extends BaseEvaluator {

    isProjectFullyAnalyzed(): boolean {
        return false;
    }
    async analyzeInstance(instance: FilterEvalInstance, context: DataClumpRefactoringContext): Promise<void> {
        let api=resolveFromInterfaceName("AbstractLanguageModel") as AbstractLanguageModel;
        writeFileSync("filterResult", JSON.stringify(this.all_result, null, 2));
        let result={"llm":[]} as any;
        api.resetParameters(instance)
        let llmFilter=context.sharedData.llmFilter;
        let llmHandlers:LargeLanguageModelHandler[]=[
            new SimpleInstructionHandler({ instructionPath: `chatGPT_templates/dataClumpFiltering/${instance.inputType}.template` }),

        ];

        if(instance.inputType=="filter_code_snippet"){
            llmHandlers.push(new DataClumpCodeSnippetHandler({additionalMargin:instance.margin}));
        }
        else if(instance.inputType=="filter_full_code"){
            llmHandlers.push(new AllFilesHandler())
        }
        else{
            llmHandlers.push(new SimplifiedDataClumpContextHandler())
        }


        (llmFilter as any).handlers = llmHandlers;
        let llmFilteredContext = await (await llmFilter.handle(PipeLineStep.DataClumpFiltering, context, {})).getByType(DataClumpDetectorContext)!;

        let typeNameKey = llmFilteredContext.createDataTypeNameClumpKey(llmFilteredContext.getDataClumpTypeContext(llmFilteredContext.getDataClumpKeys()[0]));
        result["llm"].push(
            typeNameKey
        )
    }
    createInstanceCombination(): FilterEvalInstanceCombination {
        let result= {
            instanceType: ["filter"],
            model: ["gpt-4-1106-preview"],
            temperature: [0.1, 0.5, 0.9],
            iteration: [0, 1, 2, 3, 4],
            inputType: ["filter","filter_code_snippet","filter_full_code"],
            margin: [0, 1, 2, 5, 10]
        }
        if(DEBUG){
            result.iteration=[0]
            result.temperature=[0.1]
        }
        return result
    }
    private all_result={}
    async initProject(url: string): Promise<DataClumpRefactoringContext | null> {
        registerFromName("RankSampler", "RankSampler", { "rankThreshold": 100, "differentDataClumps": true })
         let ranker = resolveFromInterfaceName("RankSampler") as RankSampler;
        let originalDcContext = await super.initProject(url) as DataClumpDetectorContext;

        let metrics = [
            resolveFromConcreteName("DataClumpSizeMetric"),
            resolveFromConcreteName("DataClumpOccurenceMetric"),
            resolveFromConcreteName("AffectedFilesMetric")
            ];

        for (let m of metrics) {
            let result = await ranker.rank(m, Object.values(originalDcContext.getDataClumpDetectionResult().data_clumps), originalDcContext)
            this.all_result[m.constructor.name] = result.map((it) => originalDcContext.createDataTypeNameClumpKey(it as DataClumpTypeContext))
            console.log(result)

        }
        
    
    
        let llmFilter = new DataClumpLanguageModelFilter({
            handlers: [],
            rankThreshold: this.getRankerThreshold(),
            rankerName: "MetricCombiner",
        });
        llmFilter.metrics.push(new RandomRanker())
        originalDcContext.sharedData.llmFilter = llmFilter;
        return originalDcContext;
    }

    simplifyInstance(instance: FilterEvalInstance): Instance {
        if(instance.inputType!="filter_code_snippet"){
           delete instance["margin" as any];
        }
        return instance;
    }
}
    

/*async function analyzeProject(url: string) {
    console.log(url)
    let gitHelper = new GitHubService()
    if (fs.existsSync("cloned_projects")) {
        fs.rmSync("cloned_projects", { recursive: true })
        fs.mkdirSync("cloned_projects")
    }
    let repo = getRepoDataFromUrl(url).repo
    let path = "stuff/results_" + repo + "_" + model + ".json"
    if (fs.existsSync(path)) {
        let loaded = JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }))
        if (loaded["llm"].length >= MAX_ATTEMPTS) {
            return;

        }
    }
    gitHelper.clone(url)
    let attempt = 0;
    let obtainingContext = new CodeObtainingContext(resolve("cloned_projects"))
    let dcHandler = new DataClumpDetectorStep({});

    let originalDcContext = await dcHandler.handle(PipeLineStep.DataClumpDetection, obtainingContext, {}) as DataClumpDetectorContext



    const uniqueTemperatures = [0.1, 0.5, 0.9];
    let temperatures: number[] = []
    for (let temp of uniqueTemperatures) {
        for (let i = 0; i < MAX_ATTEMPTS; i++) {
            temperatures.push(temp)
        }
    }
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
        "%{llm_output_format}": "chatGPT_templates/use_markdown.template"
    })
    registerFromName("OllamaInterface", "AbstractLanguageModel", { "model": "codegemma", "temperature": 0.1, "responsePath": "stuff/phindra_output.txt" })
    let api = resolveFromInterfaceName(AbstractLanguageModel.name) as AbstractLanguageModel;


    console.log("registered")





    let lastElapsed: number | null = null;
    while (all_result["llm"].length < MAX_ATTEMPTS * uniqueTemperatures.length) {
        let temp = temperatures[index];
        index++;
        api.resetParameters({ temperature: temp, model: model })
        let startTime = new Date().getTime();
        prettyInvalidJson((api as any).messages)
        let projectInformation = {
            startTime: startTime,
            lastElapsed: lastElapsed,
            url: url,

        };
        fs.writeFileSync("stuff/project_info.json", JSON.stringify(projectInformation, null, 2))
        api.clear()
        let llmFilteredContext = await (await llmFilter.handle(PipeLineStep.DataClumpFiltering, originalDcContext, {})).getByType(DataClumpDetectorContext)!;
        let elapsed = new Date().getTime() - startTime;
        elapsed = elapsed / 1000 / 60
        lastElapsed = elapsed;
        console.log(elapsed / 1000 / 60)
        let typeNameKey = llmFilteredContext.createDataTypeNameClumpKey(llmFilteredContext.getDataClumpTypeContext(llmFilteredContext.getDataClumpKeys()[0]));
        (all_result["llm"] as any).push(

            {
                temperature: temp,
                model: model,
                key: typeNameKey
            }


        )

        fs.writeFileSync(path, JSON.stringify(all_result, null, 2));
    }


    fs.writeFileSync(path, JSON.stringify(all_result, null, 2))



}*/

async function main() {
   FileIO.instance=new InstanceBasedFileIO()
    let refactorEval = new FilterEval();
    refactorEval.analyzeProjects(init());
}

if (require.main === module) {
    main();
}