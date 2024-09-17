import { CodeObtainingContext, DataClumpRefactoringContext, FileFilteringContext } from "../context/DataContext";
import { CloneBasedProjectRetriever } from "../eval/project_list_retriever";
import { getRepoDataFromUrl } from "../util/vcs/VCS_Service";
import { resolve } from "path";
import {data} from "./data";
import * as fs from "fs";
import readlineSync from "readline-sync";
import { DataClumpDoctorStepHandler } from "../pipeline/stepHandler/dataClumpDetection/DataClumpDoctorStepHandler";
import { PipeLineStep } from "../pipeline/PipeLineStep";
export async function loadData(){
    for(let url of Object.keys(data)){
        let repoData=getRepoDataFromUrl(url);
        if(fs.existsSync("src/prData/typeContexts/"+repoData.repo+".json")){
            continue
        }
        url=url.replace(".com/"+repoData.owner,".com/compf")
        console.log(url)
        let projectLoader=new CloneBasedProjectRetriever(url,true);
        
        projectLoader.init();

        let context:DataClumpRefactoringContext=new CodeObtainingContext(resolve("cloned_projects/"+repoData.repo));
        let includeExclude=JSON.parse(fs.readFileSync("stuff/filter.json",{encoding:"utf-8"}));
        context=context.buildNewContext(new FileFilteringContext(includeExclude.include,includeExclude.exclude));
        let dcDoctor=new DataClumpDoctorStepHandler({})
        context=await dcDoctor.handle(PipeLineStep.DataClumpDetection,context,undefined);
        let data=JSON.parse(fs.readFileSync("stuff/output.json").toString())
        fs.writeFileSync("src/prData/typeContexts/"+repoData.repo+".json",JSON.stringify(data,null,2))
        console.log(repoData.repo)
        readlineSync.question("Search data clump")

    }
}
