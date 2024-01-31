export abstract class VCS_Service{
    abstract pull(url:string);
    abstract commit(message:string);
    abstract push();
    abstract fork(url:string,newName:string|undefined,callback:(string)=>void);
    abstract pullRequest();
    abstract getWorkingDirectory():string;

    forkAndPull(newName:string|undefined,url:string){
        this.fork(url,newName,(newUrl)=>{
            this.pull(newUrl);
        });
       
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