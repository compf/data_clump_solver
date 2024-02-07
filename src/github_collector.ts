import * as fs from 'fs';
import { GitHubService } from './util/vcs/GitHubService';
import { spawnSync } from 'child_process';
import { waitSync } from './util/Utils';
let projects=fs.readFileSync("github_projects","utf-8").split("\n");

async function main(){ 
    let result={}
    for(let project of projects){
        console.log("Cloning: ",project);
        fs.mkdirSync("cloned_projects",)
        let github=new GitHubService();
        github.clone(project);
        waitSync(1000);
       let pullRequestUpdateTime= await github.getMostRecentPullRequestTime(project);
       let lines=countLines();
       let buildSystem=getBuildSystem();
      
       result[project]={"pullRequestUpdateTime":pullRequestUpdateTime,"lines":lines,"buildSystem":buildSystem,
       "doesCompile":doesCompile(buildSystem)};
       console.log(result[project]);
       fs.rmSync("cloned_projects",{recursive:true});
       waitSync(1000);
       fs.writeFileSync("github_projects_results.json",JSON.stringify(result,null,2));

    }
   

}
function getBuildSystem():string{
    if(fs.existsSync("cloned_projects/pom.xml")){
        return "maven";
    }
    if(fs.existsSync("cloned_projects/build.gradle")){
        return "gradle";
    }
    if(fs.existsSync("cloned_projects/build.gradle.kts")){
        return "gradle";
    }
    return "unknown";
}
function doesCompile(buildSystem:string):boolean{
    if(buildSystem=="maven"){
        let cp=spawnSync("mvn",["compile"],{cwd:"cloned_projects"})
        return cp.status==0;
    }
    if(buildSystem=="gradle"){
        let cp=spawnSync("gradle",["compileJava"],{cwd:"cloned_projects"})
        return cp.status==0;
    }
    return false;
}
 function countLines(){
     let cp=spawnSync("cloc",["cloned_projects","--json","--out","cloc_results.json"])
     console.log(cp.stdout.toString())
     
     waitSync(1000);
     console.log("cloc finished");
     let results=JSON.parse(fs.readFileSync("cloc_results.json","utf-8"));
     return {"java":results["Java"],"sum":results["SUM"]};
}
main();