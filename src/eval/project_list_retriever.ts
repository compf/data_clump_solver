import * as fs from 'fs';
import { GitHubService } from '../util/vcs/GitHubService';

export interface ProjectRetriever{
    init();
}

export class CloneBasedProjectRetriever implements ProjectRetriever{
   private url:string;
   private deletePrevious:boolean=false;
    async getProjectList(): Promise<string[]> {
        let file=fs.readFileSync("stuff/github_pulls", { encoding: "utf-8" });
        let parsed=JSON.parse(file)
        let urls=Object.keys(parsed).map((x)=>x.replace(".com",".com/compf/"));
        return Promise.resolve(Object.keys(parsed))
    }
    constructor(url:string,deletePrevious:boolean){
        this.url=url;
        this.deletePrevious=deletePrevious;
    }
    init() {
        let gitHelper = new GitHubService()
        if (this.deletePrevious && fs.existsSync("cloned_projects")) {
            fs.rmSync("cloned_projects", { recursive: true })
            fs.mkdirSync("cloned_projects")
        }
        gitHelper.clone(this.url)
    }
}
