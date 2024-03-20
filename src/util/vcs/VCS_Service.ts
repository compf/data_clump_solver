export abstract class VCS_Service{
    abstract clone(url:string);
    abstract commit(message:string);
    abstract push();
    abstract fork(url:string,newName:string|undefined);
    abstract pullRequest();
    abstract getWorkingDirectory():string;

    async forkAndClone(newName:string|undefined,url:string):Promise<string>{
         url=await this.fork(url,newName);
         this.clone(url);
         return url
       
    }
}
export type RepoData={
    owner: string,
    repo: string,
    
}
export function getRepoDataFromUrl(url:string):RepoData{
    let repoData:RepoData={owner:"",repo:""}
    let urlParts=url.split("/");
    repoData.owner=urlParts[urlParts.length-2];
    repoData.repo=urlParts[urlParts.length-1];
    return repoData;
}