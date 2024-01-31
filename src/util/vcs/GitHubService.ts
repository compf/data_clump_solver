import { VCS_Service, getRepoDataFromUrl } from "./VCS_Service";
import {Octokit} from  "octokit"
import { spawn } from "child_process";
import fs from "fs"
const API_KEY=fs.readFileSync("GITHUB_TOKEN","utf-8");
export class GitHubService extends VCS_Service{
    
    pull(url: string) {
    
       console.log("pulling")
       spawn("git",["clone",url])
    }
    getWorkingDirectory(): string {
        return ""
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