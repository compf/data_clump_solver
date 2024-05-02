import process from "node:process";
import { CodeObtainingContext, DataClumpDetectorContext, DataClumpRefactoringContext } from "../context/DataContext";
import { GitHubService } from "../util/vcs/GitHubService";
import { getRepoDataFromUrl } from "../util/vcs/VCS_Service";
import { DataClumpsTypeContext } from "data-clumps-type-context";
import { Configuration, PipeLineStepConf, loadConfiguration, registerFromName } from "../config/Configuration";
import { PipeLine } from "../pipeline/PipeLine";
import { PipeLineStep, PipeLineStepName } from "../pipeline/PipeLineStep";
import fs from "fs";
import * as url from "url";
import { waitSync } from "../util/Utils";
import https from "https"
import { SimpleCodeObtainingStepHandler } from "../pipeline/stepHandler/codeObtaining/SimpleCodeObtainingStepHandler";
import { DataClumpDetectorStep } from "../pipeline/stepHandler/dataClumpDetection/DataClumpDetectorStep";
import { DataClumpFilterStepHandler } from "../pipeline/stepHandler/dataClumpFiltering/DataClumpFilterStepHandler";
import { MetricCombiner } from "../util/filterUtils/MetricCombiner";
import { spawnSync } from "child_process";
const allMetricWeights = [
    [1,1,0],
    [1,1,-100],
    [100,1,0],
    [1,100,0],
    [100,1,-100],
    [1,100,-100]]
const NUMBER_DATA_CLUMPS = 5;
async function getDataClumpData() {
    let result = {}
    let dataClumpStats={}
    let context = new DataClumpRefactoringContext();
    context = await new SimpleCodeObtainingStepHandler({ path: "/home/compf/data/uni/master/sem4/data_clump_solver/cloned_projects", useArgPath: false }).handle(PipeLineStep.CodeObtaining, context, null);
    let detector = new DataClumpDetectorStep({});
    context = await detector.handle(PipeLineStep.DataClumpDetection, context, null);
    let obj=Object.assign(dataClumpStats,context.getByType(DataClumpDetectorContext)?.getDataClumpDetectionResult().report_summary);
    console.log("finished", obj)
    registerFromName("DataClumpSizeMetric", "DataClumpSizeMetric", {});
    registerFromName("DataClumpOccurenceMetric", "DataClumpOccurenceMetric", {});
    registerFromName("AffectedFilesMetric", "AffectedFilesMetric", {});
   
    
    for (let metricWeights of allMetricWeights) {
        let metricCombinerArgs = {
            metrics: [
                { name: "DataClumpSizeMetric", weight: metricWeights[0] },
                { name: "DataClumpOccurenceMetric", weight: metricWeights[1] },
                { name: "AffectedFilesMetric", weight: metricWeights[2] }
    
            ]
        }
        let filterHandler = new DataClumpFilterStepHandler({ rankThreshold: NUMBER_DATA_CLUMPS });
        (filterHandler as any).ranker = new MetricCombiner(metricCombinerArgs);
        context=DataClumpDetectorContext.fromArray([JSON.parse(fs.readFileSync("stuff/output.json","utf-8"))]);
       
        context = await filterHandler.handle(PipeLineStep.DataClumpFiltering, context, null);
        let data_clumps = context.getByType(DataClumpDetectorContext)?.getDataClumpDetectionResult().data_clumps;
        for (let dc of Object.values(data_clumps!)) {
            result[metricWeights + ""] = dc["metrics"]

        }
        console.log("finished", dataClumpStats)
        result["dataClumpStats"]=dataClumpStats
        console.log("finished", result)
       
    }
    return result
}


async function getProjectList() {
    const outputPath = "github_data/github_projects_data.json"
    if ( fs.existsSync(outputPath)) {
        let data = fs.readFileSync(outputPath, "utf-8")
        let json = JSON.parse(data)
        return json;
    }

    let items: any[] = [];
    for (let page = 1; page <= 40; page++) {
        console.log("page", page);
        const minFollowers = 100;
        const minStars = 100;
        const programmingLanguage = "java";
        const queryString = `stars:>=${minStars} language:${programmingLanguage}`;
        const urlString = `https://api.github.com/search/repositories?q=${queryString}&followers:>=${minFollowers}&sort=stars&order=desc&page=${page}`;
        let urlObject = new URL(urlString);

        const options: https.RequestOptions = {
            hostname: urlObject.hostname,
            path: urlObject.pathname + urlObject.search,
            headers: {
                'User-Agent': 'request'
            }
        };

        await new Promise((resolve, reject) => {
            https.get(options, (res) => {
                let allData = "";
                res.on("data", (data) => {
                    allData += data.toString();
                });
                res.on("end", () => {
                    try {
                        let json = JSON.parse(allData);
                        console.log(json);
                        if (json.items) {
                            items = items.concat(json.items);
                        }
                        resolve(true);
                    } catch (e) {
                        reject(e);
                    }
                });
                res.on("error", (err) => {
                    reject(err);
                });
            });
        });
        waitSync(1000*30);
    }

    fs.writeFileSync(outputPath, JSON.stringify({items: items}, null, 2));
    return {items: items};
}


function countLines() {
    let cp = spawnSync("cloc", ["cloned_projects", "--json", "--out", "cloc_results.json"])

    console.log("cloc finished");
    let results = JSON.parse(fs.readFileSync("cloc_results.json", "utf-8"));
    if(!("Java" in results)){
        return null;
    }
    let resultsJava=results["Java"]["code"]
    return resultsJava
}
async function analyzeProject(projectData: any) {
    let url = projectData.html_url
    console.log("Analyzing project", url)
    let githubService = new GitHubService()
    githubService.clone(url)
    waitSync(1000)
    let pullRequestUpdateTime = await githubService.getMostRecentPullRequestTime(url)
    let lines = countLines()
    let data = await getDataClumpData()
    const minYear=new Date().getFullYear()
    let minLines=10000
    if(pullRequestUpdateTime.getFullYear()<2024 ){
        return {
            "dataClumps": data,
            "skipped":true,
            "reason": "no pull requests "+pullRequestUpdateTime.toISOString(),
        };
    }
    
    
    else if(lines==null){
        return {
            "dataClumps": data,
            "skipped":true,
            "reason": "no java files",
        };
    }
    else if (lines<minLines) {
        return {
            "dataClumps": data,
            "skipped":true,
            "reason": "not enough lines "+lines,
        };

    }
   
    let json = {
        "pullRequestUpdateTime": pullRequestUpdateTime.toISOString(),
         "lines": lines,
          "dataClumps": data,
        stars: projectData.stargazers_count,
        watchers: projectData.watchers_count,
    }
    return json
}

async function main() {
    const outPath="github_data/github_projects_results.json"
    let result = {}
    if(fs.existsSync(outPath)){
        result=JSON.parse(fs.readFileSync(outPath,"utf-8"))
    }
    let projects = await getProjectList()
    while (true) {
        if (fs.existsSync("cloned_projects")) {
            fs.rmSync("cloned_projects", { recursive: true })
        }
        let randomProject = projects.items[Math.floor(Math.random() * projects.items.length)]
        if (randomProject.html_url in result) {
            continue;
        }
        let data = await analyzeProject(randomProject)
        
        result[randomProject.html_url] = data
        fs.writeFileSync("github_data/github_projects_results.json", JSON.stringify(result, null, 2));
        waitSync(1000)}


}
if (require.main === module) {
    main();

}


console.log("finish")


