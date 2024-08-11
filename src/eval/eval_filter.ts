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
import { DataClumpCodeSnippetHandler, SimpleInstructionHandler } from "../pipeline/stepHandler/languageModelSpecific/LargeLanguageModelHandlers";
import { MetricCombiner } from "../util/filterUtils/MetricCombiner";
import { registerFromName, resolveFromInterfaceName } from "../config/Configuration";
import { ProjectListByPullRequest } from "./project_list_retriever";
import { AbstractLanguageModel } from "../util/languageModel/AbstractLanguageModel";
import { nop, prettyInvalidJson, randInt, tryParseJSON } from "../util/Utils";
import { getRepoDataFromUrl } from "../util/vcs/VCS_Service";
import { DataClumpTypeContext } from "data-clumps-type-context";
const MAX_ATTEMPTS=5;
const model="codegemma"

async function analyzeProject(url:string){
    console.log(url)
    let gitHelper=new GitHubService()
      if(fs.existsSync("cloned_projects")){
      fs.rmSync("cloned_projects",{recursive:true})
        fs.mkdirSync("cloned_projects")
    }
    let repo=getRepoDataFromUrl(url).repo
    let path="stuff/results_"+repo+"_"+model+".json"
    if(fs.existsSync(path)){
        let loaded=JSON.parse(fs.readFileSync(path,{encoding:"utf-8"}))
        if(loaded["llm"].length>=MAX_ATTEMPTS){
            return;

        }
    }
    gitHelper.clone(url)
    let attempt=0;
    let obtainingContext=new CodeObtainingContext(resolve("cloned_projects"))
    let dcHandler=new DataClumpDetectorStep({});

    let originalDcContext=await dcHandler.handle(PipeLineStep.DataClumpDetection,obtainingContext,{}) as DataClumpDetectorContext

    let metrics=[new DataClumpSizeMetric({normalize:false}), new DataClumpOccurenceMetric(), new AffectedFileSizeMetric()]

    let ranker=new RankSampler({rankThreshold:100, differentDataClumps:true})
    let all_result={llm:[]}
    for(let m of metrics){
       let result= await  ranker.rank(m,Object.values(originalDcContext.getDataClumpDetectionResult().data_clumps),originalDcContext)
       all_result[m.constructor.name]=result.map((it)=>originalDcContext.createDataTypeNameClumpKey(it as DataClumpTypeContext))
       console.log(result)

    }
    fs.writeFileSync(path,JSON.stringify(all_result,null,2));
    let llmFilter=new DataClumpLanguageModelFilter({
        handlers:[],
        rankThreshold:20
    });
    (llmFilter as any).handlers=[
        new SimpleInstructionHandler({instructionPath:"chatGPT_templates/dataClumpFiltering/filter_code_snippet.template"}),
        new DataClumpCodeSnippetHandler({additionalMargin:0}),
    ];
    
    const uniqueTemperatures=[0.1,0.5,0.9];
    let temperatures:number[]=[]
    for(let temp of uniqueTemperatures){
        for(let i=0;i<MAX_ATTEMPTS;i++){
            temperatures.push(temp)
        }
    }
    registerFromName("DataClumpSizeMetric", "DataClumpSizeMetric", {});
    registerFromName("DataClumpOccurenceMetric", "DataClumpOccurenceMetric", {});
    registerFromName("AffectedFilesMetric", "AffectedFilesMetric", {});
    registerFromName("AffectedFileSizeMetric", "AffectedFileSizeMetric", {});
    registerFromName("LanguageModelTemplateResolver","LanguageModelTemplateResolver",{
        "${programming_language}": "Java",
        "%{examples}": "chatGPT_templates/DataClumpExamples.java",
        "%{refactor_instruction}": "chatGPT_templates/refactor_one_data_clump.template",
        "%{detected_data_clumps}": "chatGPT_templates/refactor/detected_data_clumps_minified.json",
        "%{output_format_refactor}":"chatGPT_templates/json_format_refactor_piecewise.json",
        "%{llm_output_format}":"chatGPT_templates/use_markdown.template"
    })
    registerFromName("OllamaInterface","AbstractLanguageModel",{"model":"codegemma","temperature":0.1, "responsePath":"stuff/phindra_output.txt"})
    let api=resolveFromInterfaceName(AbstractLanguageModel.name) as AbstractLanguageModel;


    console.log("registered")



 
        let metricCombinerArgs = {
            metrics: [
                { name: "DataClumpSizeMetric", weight:1 },
                { name: "DataClumpOccurenceMetric", weight:1 },
                { name: "AffectedFilesMetric", weight: 1 },


            ]
        };
        (llmFilter as any).ranker = new MetricCombiner(metricCombinerArgs);


        let index=all_result["llm"].length
    let lastElapsed:number|null=null;
    while(all_result["llm"].length<MAX_ATTEMPTS*uniqueTemperatures.length){
        let temp=temperatures[index];
        index++;
        api.resetParameters({temperature:temp,model:model })
        let startTime=new Date().getTime();
        prettyInvalidJson((api as any).messages)
        let projectInformation={
            startTime:startTime,
            lastElapsed:lastElapsed,
            url:url,
            
        };
        fs.writeFileSync("stuff/project_info.json",JSON.stringify(projectInformation,null,2))
        api.clear()
        let llmFilteredContext=await (await llmFilter.handle(PipeLineStep.DataClumpFiltering,originalDcContext,{})).getByType(DataClumpDetectorContext)!;
        let elapsed=new Date().getTime()-startTime;
        elapsed=elapsed/1000/60
        lastElapsed=elapsed;
        console.log(elapsed/1000/60)
        let typeNameKey=llmFilteredContext.createDataTypeNameClumpKey(llmFilteredContext.getDataClumpTypeContext(llmFilteredContext.getDataClumpKeys()[0]));
       (all_result["llm"] as any).push(
        
        {
        temperature:temp,
        model:model,
        key:typeNameKey
        }
   

    )
        
    fs.writeFileSync(path,JSON.stringify(all_result,null,2));
    }

    
    fs.writeFileSync(path,JSON.stringify(all_result,null,2))



}
async function main(){
    let urls= await (new ProjectListByPullRequest()).getProjectList()
    for(let url of urls){
        await analyzeProject(url)
    }
}

if(require.main===module){
  main();
}