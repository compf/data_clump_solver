import process from "node:process";
import { CodeObtainingContext, DataClumpRefactoringContext } from "../context/DataContext";
import { GitHubService } from "../util/vcs/GitHubService";
import { getRepoDataFromUrl } from "../util/vcs/VCS_Service";
import { DataClumpsTypeContext } from "data-clumps-type-context";
import { Configuration, PipeLineStepConf, loadConfiguration } from "../config/Configuration";
import { PipeLine } from "../pipeline/PipeLine";
import { PipeLineStep, PipeLineStepName } from "../pipeline/PipeLineStep";
import fs from "fs";
import { waitSync } from "../util/Utils";
type RepoState = {
    url: string,
    name: string,
    outPath: string,
    configPath:string,
    lastContextName:string,


}
let repoStates: { [key: string]: RepoState } = {}

async function main(args: string[]) {
    process.on('unhandledRejection', error => {
        console.error('Unhandled promise rejection:', error);
        //throw error;
      });
    let url=args[0];
    let configPath=args[1];

    let context=loadConfiguration(configPath);
    context.sharedData.url=url;
    let repoData =  getRepoDataFromUrl(url);
    let repoState = repoStates[url];
    if(repoState==undefined){
        repoState = {
            url: url,
            name: repoData.repo,
            outPath: "cloned_projects/"+repoData.repo.replace(".git",""),
            configPath:configPath,
            lastContextName:"CodeObtainingContext"
        }
        repoStates[url] = repoState;
    }
    context=await PipeLine.Instance.executeAllSteps(context)
    //repoState.lastContextName=context.constructor.name
    fs.mkdirSync("cloned_projects_meta/"+repoData.repo.replace(".git",""),{recursive:true})
    for(let path of fs.readdirSync("data")){
        fs.copyFileSync("data/"+path,repoState.outPath+"/"+path)
    }
}
if(require.main === module){
    (async ()=>{
        await  main(process.argv.slice(2));
        while(true){
         console.log("running")
         waitSync(1000)
     }
     
     })();
}


console.log("finish")