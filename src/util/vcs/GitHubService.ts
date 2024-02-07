import { VCS_Service, getRepoDataFromUrl } from "./VCS_Service";
import {Octokit} from  "octokit"
import { spawnSync } from "child_process";
import fs from "fs"
const API_KEY=fs.readFileSync("GITHUB_TOKEN","utf-8");
export class GitHubService extends VCS_Service{
    
    clone(url: string) {
    
       console.log("pulling")
       spawnSync("git",["clone",url,"cloned_projects"])
    }
    getWorkingDirectory(): string {
        return ""
    }
    async getMostRecentPullRequestTime(url:string):Promise<Date>{
        let data=getRepoDataFromUrl(url);
        let octokit=this.createOctokitObject();
       let result=await  octokit.rest.pulls.list({
            repo: data.repo,
            owner: data.owner,
            "state":"closed",
            sort:"created",
            direction:"desc"
           
    }
    )
     
    return new Date(result.data[0].updated_at);
}
    commit(message: string) {
        throw new Error("Method not implemented.");
    }
    push() {
        throw new Error("Method not implemented.");
    }
    createOctokitObject():Octokit{
        return new Octokit({
            auth: API_KEY,
          
        });
    }
    fork(url: string,newName:string|undefined,callback:(string)=>void) {
        let octokit=this.createOctokitObject();
        let repoData=getRepoDataFromUrl(url);
        console.log("Forking Repo: ",repoData.owner,repoData.repo);
        octokit.rest.repos.createFork({
            owner: repoData.owner,
            repo: repoData.repo,
            name:newName

          })
          .then(({ data }) => {
            console.log("Forked Repo: ", data.ssh_url);
            callback(data.ssh_url);
          })
          .catch(error => {
            // Handle any error
            console.error("Error forking the repo: ", error);
          });
    }
    pullRequest() {
        
    }

}