import { CodeObtainingContext, DataClumpDetectorContext } from "../context/DataContext";
import { DataClumpDoctorASTGeneratorStep } from "../pipeline/stepHandler/astGeneration/DataClumpDoctorASTGeneratorStep";
import { SimpleCodeObtainingStepHandler } from "../pipeline/stepHandler/codeObtaining/SimpleCodeObtainingStepHandler";
import { GitHubService } from "../util/vcs/GitHubService";
import fs from "fs"
import { resolve } from "path"
import { DataClumpDetectorStep } from "../pipeline/stepHandler/dataClumpDetection/DataClumpDetectorStep";
import { PipeLineStep } from "../pipeline/PipeLineStep";
import { DataClumpSizeMetric } from "../pipeline/stepHandler/dataClumpFiltering/DataClumpSizeMetric";
import { DataClumpOccurenceMetric } from "../pipeline/stepHandler/dataClumpFiltering/DataClumpOccurenceMetric";
import { AffectedFileSizeMetric } from "../pipeline/stepHandler/dataClumpFiltering/AffectedFileSizeMetric";
import { RankSampler } from "../util/filterUtils/Ranker";
import { all } from "axios";
import { DataClumpLanguageModelFilter } from "../pipeline/stepHandler/dataClumpFiltering/DataClumpLanguageModelFilter";
import { SimpleInstructionHandler } from "../pipeline/stepHandler/languageModelSpecific/LargeLanguageModelHandlers";
import { MetricCombiner } from "../util/filterUtils/MetricCombiner";
import { registerFromName } from "../config/Configuration";
import { ProjectListByPullRequest } from "./project_list_retriever";
async function analyzeProject(url:string){
    let gitHelper=new GitHubService()
    if(fs.existsSync("cloned_projects")){
        fs.rmSync("cloned_projects",{recursive:true})
        fs.mkdirSync("cloned_projects")
    }
    gitHelper.clone(url)
    const MAX_ATTEMPTS=10;
    let attempt=0;
    let obtainingContext=new CodeObtainingContext(resolve("cloned_projects"))
    let dcHandler=new DataClumpDetectorStep({});

    let originalDcContext=await dcHandler.handle(PipeLineStep.DataClumpDetection,obtainingContext,{}) as DataClumpDetectorContext

    let metrics=[new DataClumpSizeMetric({normalize:false}), new DataClumpOccurenceMetric(), new AffectedFileSizeMetric()]

    let ranker=new RankSampler({rankThreshold:100, differentDataClumps:true})
    let all_result={}
    for(let m of metrics){
       let result= await  ranker.rank(m,Object.values(originalDcContext.getDataClumpDetectionResult().data_clumps),originalDcContext)
       all_result[m.constructor.name]=result

    }
    let llmFilter=new DataClumpLanguageModelFilter({
        handlers:[]
    });
    (llmFilter as any).handlers=[
        new SimpleInstructionHandler({instructionPath:"chatGPT_templates/dataClumpFiltering/filter.template"})
    ];
    registerFromName("DataClumpSizeMetric", "DataClumpSizeMetric", {});
    registerFromName("DataClumpOccurenceMetric", "DataClumpOccurenceMetric", {});
    registerFromName("AffectedFilesMetric", "AffectedFilesMetric", {});
    registerFromName("AffectedFileSizeMetric", "AffectedFileSizeMetric", {});



 
        let metricCombinerArgs = {
            metrics: [
                { name: "DataClumpSizeMetric", weight:1 },
                { name: "DataClumpOccurenceMetric", weight:1 },
                { name: "AffectedFilesMetric", weight: 1 },


            ]
        };
        (llmFilter as any).ranker = new MetricCombiner(metricCombinerArgs);



    for(let i =0;i<MAX_ATTEMPTS;i++){

        let llmFilteredContext=await llmFilter.handle(PipeLineStep.DataClumpFiltering,originalDcContext,{})!
        llmFilteredContext=llmFilteredContext.getByType(DataClumpDetectorContext)!
        console.log(llmFilteredContext)
        
    }



}

if(require.main===module){
    let urls= await (new ProjectListByPullRequest()).getProjectList()
    for(let url of urls){
        //await analyzeProject(url)
    }
}