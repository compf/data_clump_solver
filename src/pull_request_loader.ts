import { Octokit } from "octokit"
import { GitHubService } from "./util/vcs/GitHubService";
import { getRepoDataFromUrl } from "./util/vcs/VCS_Service";
import fs from "fs"
import { waitSync } from "./util/Utils";
let octokit=new Octokit(
  {
    auth:fs.readFileSync("tokens/GITHUB_TOKEN", "utf-8")
  }
);
async function listPRReviewComments(owner, repo, pullNumber) {
    const response = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/comments', {
      owner: owner,
      repo: repo,
      pull_number: pullNumber
    });
    return response.data;
  }
  async function listPRComments(owner, repo, pullNumber) {
    const response = await octokit.request('GET /repos/{owner}/{repo}/issues/{pull_number}/comments', {
      owner: owner,
      repo: repo,
      pull_number: pullNumber
    });
    return response.data;
  }
  async function processProject(url){
    let gitHubHelper=new GitHubService();
    let repoData=getRepoDataFromUrl(url)
    const prs = await octokit.rest.search.issuesAndPullRequests({
        q: `data clumps+type:pr+repo:${repoData.owner}/${repoData.repo}`,
        per_page: 100, // use the number you like
      });
      let nr=prs.data.items[0].number
     
      let prComments=await listPRComments(repoData.owner,repoData.repo,nr)

      let reviewComments=await listPRReviewComments(repoData.owner,repoData.repo,nr)

      return{
        "pull_request_data":prs.data,
        "prComments":prComments,
        "prReviewComments":reviewComments
      }
      

  }
async function main(){
   
   
    let lines=fs.readFileSync("stuff/github_projects",{encoding:"utf-8"}).split("\n")
    let result=JSON.parse( fs.readFileSync("stuff/github_pulls",{encoding:"utf-8"}))
    for(let line of lines){
      console.log(line)

      if(!(line in result)){
        result[line]=await processProject(line)
        fs.writeFileSync("stuff/github_pulls",JSON.stringify(result,undefined,2))
        waitSync(1000)
      }
       

       
    }
    fs.writeFileSync("stuff/github_pulls",JSON.stringify(result,undefined,2))
    

}

if(require.main==module){
    main();
}