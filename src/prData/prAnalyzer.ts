import * as fs from "fs";
import { data } from "./data"
import { fields_to_fields_data_clump, parameters_to_parameters_data_clump, PR_Data, PR_Data_Entry } from "./structures";
import { makeUnique } from "../util/Utils";
import { loadData } from "./dataClumpDataLoader";
let fullResult:any={}
function analyze(name:string,relevantData: PR_Data_Entry[]) {
    let reviewCounter: { [key: string]: number } = {}
    let variable = Object.keys(require("./structures"))
    let positive = 0
    let merged = 0
    let closed = 0
    let noComments=0
    let bySize:{[size:number]:number}={}
    let commentCounter = 0;
    let projectCounter=0
    let param_to_param = 0
    for (let d of Object.values(relevantData)) {
        if(d.merged){
            merged++
        }
        if(d.type==parameters_to_parameters_data_clump){
            param_to_param++
        }
        if(d.state=="closed"){
            closed++
        }
        if(d.reviewComments.length==0 && d.generalComments.length==0){
            noComments++
        }
        if(!bySize[d.size]){
            bySize[d.size]=0
        }
        bySize[d.size]++
        for (let c of d.generalComments) {
            let key = c > 0 ? "+" : "-"
            key = key + "" + variable[Math.abs(c) - 1]
            if (!reviewCounter[key]) {
                reviewCounter[key] = 0
            }
            reviewCounter[key]++

            if (c > 0) {
                positive++
            }
            commentCounter++
        }

        for (let c of d.reviewComments) {
            let key = c > 0 ? "+" : "-"

            key = key + "" + variable[Math.abs(c) - 1]
            if (!reviewCounter[key]) {
                reviewCounter[key] = 0
            }
            reviewCounter[key]++

            if (c > 0) {
                positive++
            }
            commentCounter++
        }
        projectCounter++
    }
    for(let s in bySize){
        bySize[s]=bySize[s]/projectCounter*100
    }
    fullResult[name]={
        merged:merged/projectCounter*100,
        param_to_param:param_to_param/projectCounter*100,
        closed:closed/projectCounter*100,
        bySize:bySize,
        projects:relevantData.map(d=>d.url),
        reviews:reviewCounter,
    }
    fs.writeFileSync("stuff/fullResult.json",JSON.stringify(fullResult,null,2))
    console.log("###",name,"###")
   console.log()
    console.log("Merged", merged/projectCounter*100, "%")
    console.log("Parameters to parameters",param_to_param/projectCounter*100, "%")
    console.log("Closed", closed/projectCounter*100, "%")
    console.log("Sizes",bySize)
    console.log()
    console.log(relevantData.map(d=>d.url))
    console.log("### end",name,"  ###")
    console.log()
}


function main() {
    let all=Object.values(data)
    let manual = Object.values(data).filter(d => d.category == "filterManual" || d.category == "nameSuggestion")
    let llm = Object.values(data).filter(d => d.category == "detectAndRefactor" || d.category == "filterSnippet")
    let merged=Object.values(data).filter(d=>d.merged)
    let parameters_to_parameters = Object.values(data).filter(d=>d.type==parameters_to_parameters_data_clump)
    let fields_to_fields = Object.values(data).filter(d=>d.type==fields_to_fields_data_clump)

    let sizes=makeUnique(Object.values(data).map(d=>d.size))
    

    analyze("All",all)
    analyze("Manual",manual)
    analyze("LLM",llm)
    analyze("Merged",merged)
    analyze("Parameters to parameters",parameters_to_parameters)
    analyze("Fields to fields",fields_to_fields);

    for(let s of sizes){
        analyze("Size "+s,Object.values(data).filter(d=>d.size==s))
    }
}

if (require.main === module) {
    //main()
    loadData()
}