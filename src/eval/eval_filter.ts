
import { PipeLineStep } from "../pipeline/PipeLineStep";
import { DataClumpSizeMetric } from "../pipeline/stepHandler/dataClumpFiltering/DataClumpSizeMetric";
import { DataClumpOccurenceMetric } from "../pipeline/stepHandler/dataClumpFiltering/DataClumpOccurenceMetric";
import { AffectedFileSizeMetric } from "../pipeline/stepHandler/dataClumpFiltering/AffectedFileSizeMetric";
import { Ranker } from "../util/filterUtils/Ranker";
import { DataClumpLanguageModelFilterStephandler } from "../pipeline/stepHandler/dataClumpFiltering/DataClumpLanguageModelFilterStepHandler";
import { AllFilesHandler, DataClumpCodeSnippetHandler, LargeLanguageModelHandler, SimpleInstructionHandler, SimplifiedDataClumpContextHandler } from "../pipeline/stepHandler/languageModelSpecific/ContextToModelHandlers";
import { MetricCombiner } from "../util/filterUtils/MetricCombiner";
import { registerFromName, resolveFromConcreteName, resolveFromInterfaceName } from "../config/Configuration";
import { AbstractLanguageModel } from "../util/languageModel/AbstractLanguageModel";
import {  writeFileSync } from "../util/Utils";
import { DataClumpTypeContext } from "data-clumps-type-context";
import { Arrayified, BaseEvaluator, getInstancePath, init, Instance, InstanceBasedFileIO, InstanceCombination, isDebug } from "./base_eval";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../context/DataContext";
import { FileIO } from "../util/FileIO";
import {resolve} from "path"
import { RandomRanker } from "../util/filterUtils/RandomRanker";
import { LanguageModelTemplateResolver } from "../util/languageModel/LanguageModelTemplateResolver";
import { Metric } from "../util/filterUtils/Metric";
import fs from "fs"
import { getRepoDataFromUrl } from "../util/vcs/VCS_Service";
import { FilterOrMetric } from "../util/filterUtils/SingleItemFilter";

type FilterEvalInstance = Instance & {
}

type FilterEvalInstanceCombination = Arrayified<FilterEvalInstance>
export class FilterEval extends BaseEvaluator {

    isProjectFullyAnalyzed(): boolean {
        return false;
    }
    async analyzeInstance(instance: FilterEvalInstance, context: DataClumpRefactoringContext): Promise<void> {
        let api=resolveFromInterfaceName("AbstractLanguageModel") as AbstractLanguageModel;
        let result={"llm":[]} as any;
        api.resetParameters(instance)
        let llmFilter=context.sharedData.llmFilter;
        let llmHandlers:LargeLanguageModelHandler[]=[
            new SimpleInstructionHandler({ instructionPath: `chatGPT_templates/dataClumpFiltering/${instance.inputFormat}.template` }),

        ];
        let resolver= resolveFromConcreteName("LanguageModelTemplateResolver") as LanguageModelTemplateResolver;
        let defPath="";
        if(instance.instructionType=="definitionBased"){
            defPath="chatGPT_templates/data_clump_def.template"
        }
        else if(instance.instructionType=="exampleBased"){
            defPath="chatGPT_templates/data_clump_examples.template"
        }
        else{
            defPath="chatGPT_templates/empty_file.template"
        }
        resolver.set("%{data_clump_def}", defPath);
        resolver.set("%{filter_output_format}","chatGPT_templates/dataClumpFiltering/outputFormat.template")
        resolver.set("%{identification_key}","chatGPT_templates/dataClumpFiltering/key.template")
        if(instance.inputFormat=="filter_code_snippet"){
            llmHandlers.push(new DataClumpCodeSnippetHandler({additionalMargin:instance.margin}));
        }
        else if(instance.inputFormat=="filter_full_code"){
            llmHandlers.push(new AllFilesHandler())
            resolver.set("%{identification_key}","chatGPT_templates/dataClumpFiltering/key_full_code.template")
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
            iteration: [0, 1, 2, 3, 4,5,6,7,8,9],
            projectName:[],
            inputFormat: [
                //Data clump type context
                "filter",
                // Code snippets
                "filter_code_snippet",
                //Full code
                "filter_full_code"],
            instructionType: [
                "definitionBased"
               // "exampleBased", 
                //"noDefinitionBased"
            ],
            margin: [
                0,
                 1,
                  2,
                  5, 
                  10
                ]
        }
        if(isDebug()){
            result.iteration=[0]
            result.temperature=[0.1]
        }
        return result
    }
    private all_result={}
    async initProject(url: string): Promise<DataClumpRefactoringContext | null> {
        registerFromName("RankSampler", "RankSampler", { "rankThreshold": 100, "differentDataClumps": true })
         let ranker = resolveFromInterfaceName("Ranker") as Ranker;
        let originalDcContext = await super.initProject(url) as DataClumpDetectorContext;

        let metrics = [
            resolveFromConcreteName("DataClumpSizeMetric"),
            resolveFromConcreteName("DataClumpOccurenceMetric"),
            resolveFromConcreteName("AffectedFilesMetric")
            ] as Metric[];

        for (let m of metrics) {
            let result = await ranker.rank(m, Object.values(originalDcContext.getDataClumpDetectionResult().data_clumps), originalDcContext)
            this.all_result[m.constructor.name] =[]
            for(let r of result){
                this.all_result[m.constructor.name].push({name:originalDcContext.createDataTypeNameClumpKey(r as DataClumpTypeContext), value:await m.evaluate(r,originalDcContext)})
            }

        }
        //save the most important data clumps per metric
        fs.writeFileSync(resolve(this.getProjectDataFolder(url),"basicMetrics.json"), JSON.stringify(this.all_result, null, 2));

        
    
    
        let llmFilter = new DataClumpLanguageModelFilterStephandler({handlers:[]});
        originalDcContext.sharedData.llmFilter = llmFilter;
        return originalDcContext;
    }

    simplifyInstance(instance: FilterEvalInstance): Instance {
        if(instance.inputFormat!="filter_code_snippet"){
           delete instance["margin" as any];
        }
        return instance;
    }

    getNumDataClumpsPerBlock(): number {
        return 3;
    }

}
    



async function main() {
   FileIO.instance=new InstanceBasedFileIO()
    let refactorEval = new FilterEval();
    refactorEval.analyzeProject(init());
}

if (require.main === module) {
    main();
}

