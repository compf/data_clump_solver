import fs from "fs"
import { GitHubService } from "../util/vcs/GitHubService"
import { getRepoDataFromUrl } from "../util/vcs/VCS_Service"
import { CodeObtainingContext, DataClumpDetectorContext, DataClumpRefactoringContext } from "../context/DataContext";
import { PipeLineStep } from "../pipeline/PipeLineStep";
import { resolve } from "path"
import { DataClumpDetectorStep } from "../pipeline/stepHandler/dataClumpDetection/DataClumpDetectorStep";
import { registerFromName } from "../config/Configuration";
import { ProjectListRetriever } from "./project_list_retriever";
export abstract class BaseEvaluator {

    abstract getOutputPath(): string
    abstract isProjectFullyAnaylzed(): boolean;
    async initProject(url: string): Promise<DataClumpRefactoringContext | null> {
        console.log(url)
        if (this.isProjectFullyAnaylzed()) {
            return Promise.resolve(null);
        }

        let gitHelper = new GitHubService()
        if (fs.existsSync("cloned_projects")) {
            fs.rmSync("cloned_projects", { recursive: true })
            fs.mkdirSync("cloned_projects")
        }
        gitHelper.clone(url)
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
            "%{llm_output_format}": "chatGPT_templates/use_markdown.template"
        })
        let originalDcContext = await dcHandler.handle(PipeLineStep.DataClumpDetection, obtainingContext, {}) as DataClumpDetectorContext
        return Promise.resolve(originalDcContext);
    }

    abstract  analyze(context:DataClumpRefactoringContext): Promise<void>;
    async analyzeProjects(retriever:ProjectListRetriever){
        let projects=await retriever.getProjectList();
        for(let p of projects){
            let ctx=await this.initProject(p);
            if(ctx==null){
                continue;
            }
            await this.analyze(ctx);

        }
            
    }
    createModelTemperaturesArray(models: string[], temperatures: number[], repeat: number): { model: string, temperature: number }[] {
        let result: { model: string, temperature: number }[] = []
        for (let m of models) {
            for (let t of temperatures) {
                for (let i = 0; i < repeat; i++) {
                    result.push({ model: m, temperature: t })
                }
            }
           
        }
        return result;
    }
}