import * as fs from "fs";
import { data } from "./data"
import { fields_to_fields_data_clump, MAX_COUNTER_VALUE, parameters_to_parameters_data_clump, PR_Data, PR_Data_Entry } from "./structures";
import { makeUnique, nop } from "../util/Utils";
import { loadData } from "./dataClumpDataLoader";
function analyze(fullResult:any,relevantData: PR_Data_Entry[], depth:number, relevantFilters:any, parentResult:any) {
    for(let filterName in relevantFilters){
        let filter=relevantFilters[filterName]
        if(typeof(filter)=="object"){
            fullResult[filterName]={}
            analyze(fullResult[filterName],relevantData,depth,relevantFilters[filterName],fullResult)
        }
        else{
            let result=relevantData.filter(d=>filter(d))
            if(result.length==1 && result[0].url==        "https://github.com/spring-io/initializr"){
               // console.log("here",result,fullResult,filterName)
                nop()
            }
            
            if(result.length==0){
                continue;
            }
            fullResult[filterName]={}
            fullResult[filterName]["all"]=[result.length,relevantData.length,result.length/relevantData.length*100,
                result.map((it)=>it.url)
            ]
            if(depth>0){
                analyze(fullResult[filterName],result,depth-1,relevantFilters,fullResult[filterName])
            }
        }
  
        
    }
    let path=Object.keys(parentResult).join("_")+".json"
    console.log("writing",path)
    console.log("fullResult",fullResult)
    //console.log(fullResult)
    fs.mkdirSync("src/prData/results",{recursive:true})
    fs.writeFileSync ("src/prData/results/"+path,JSON.stringify(fullResult,undefined,2))
   
   
   
}

let filters={
    "merged":(d:PR_Data_Entry)=>d.merged,
    "parameters_to_parameters":(d:PR_Data_Entry)=>d.type==parameters_to_parameters_data_clump,
    "fields_to_fields":(d:PR_Data_Entry)=>d.type==fields_to_fields_data_clump,
    "noComments":(d:PR_Data_Entry)=>d.reviewComments.length==0 && d.generalComments.length==0 || d.noResponse,
    "closed":(d:PR_Data_Entry)=>d.state=="closed",
    "sizes":{},
    "project":(d:PR_Data_Entry,project:string)=>d.url.includes(project),
    "positive":(d:PR_Data_Entry)=>d.generalComments.concat(d.reviewComments).filter(c=>c>0).length>0,
    "negative":(d:PR_Data_Entry)=>d.generalComments.concat(d.reviewComments).filter(c=>c<0).length>0,
    "neutral":(d:PR_Data_Entry)=>d.generalComments.concat(d.reviewComments).filter(c=>c==0).length>0,
    commentCategory:{},
    "all":(d:PR_Data_Entry)=>true

}
function initFiltersAdditionally(){
    for(let i=1;i<MAX_COUNTER_VALUE;i++){
    let variables=Object.keys(require("./structures"))

        filters.commentCategory[variables[i]]=(d:PR_Data_Entry)=>d.generalComments.includes(i) || d.reviewComments.includes(i) || d.generalComments.includes(-i) || d.reviewComments.includes(-i)
    }
    let sizes=makeUnique(Object.values(data).map(d=>d.size))
    for(let s of sizes){
        filters["sizes"]["size"+s]=(d:PR_Data_Entry)=>d.size==s
    }
}
function main() {
    let fullResult={}
   initFiltersAdditionally()
   let all=Object.values(data)
   analyze(fullResult,all,2,filters,fullResult)
    fs.writeFileSync("stuff/results.json",JSON.stringify(fullResult,undefined,2)) 

}

if (require.main === module) {
    main()
    //loadData()
}