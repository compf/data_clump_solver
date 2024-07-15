import * as fs from 'fs';

export interface ProjectListRetriever{
    getProjectList():Promise<string[]>
}

export class ProjectListByPullRequest implements ProjectListRetriever{
   
    async getProjectList(): Promise<string[]> {
        let file=fs.readFileSync("stuff/github_pulls", { encoding: "utf-8" });
        let parsed=JSON.parse(file)
        let urls=Object.keys(parsed).map((x)=>x.replace(".com",".com/compf/"));
        return Promise.resolve(Object.keys(parsed))
    }
}