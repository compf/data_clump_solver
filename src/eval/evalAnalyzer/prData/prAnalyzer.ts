import * as fs from "fs";
import { data } from "./data"
import { detectAndRefactor,open,closed, fields_to_fields_data_clump, filterManual, filterSnippet, MAX_COUNTER_VALUE, nameSuggestion, parameters_to_parameters_data_clump, PR_Data, PR_Data_Entry } from "./structures";
import { loadData } from "./dataClumpDataLoader";
import { makeUnique, nop } from "../../../util/Utils";
import { concatenateResults, createCompareObjects, EvalAnalyzer, EvalMetric, statFunctions, SubSetChecker } from "../base_analyzer";
import { Arrayified } from "../../base_eval";
let structures=require("./structures")

function analyze(fullResult: any, relevantData: PR_Data_Entry[], depth: number, relevantFilters: any, parentResult: any) {
    for (let filterName in relevantFilters) {
        let filter = relevantFilters[filterName]
        if (typeof (filter) == "object") {
            fullResult[filterName] = {}
            analyze(fullResult[filterName], relevantData, depth, relevantFilters[filterName], fullResult)
        }
        else {
            let result = relevantData.filter(d => filter(d))
            if (result.length == 1 && result[0].url == "https://github.com/spring-io/initializr") {
                // console.log("here",result,fullResult,filterName)
                nop()
            }

            if (result.length == 0) {
                continue;
            }
            fullResult[filterName] = {}
            fullResult[filterName]["all"] = [result.length, relevantData.length, result.length / relevantData.length * 100,
            result.map((it) => it.url)
            ]
            if (depth > 0) {
                analyze(fullResult[filterName], result, depth - 1, relevantFilters, fullResult[filterName])
            }
        }


    }
    let path = Object.keys(parentResult).join("_") + ".json"
    console.log("writing", path)
    console.log("fullResult", fullResult)
    //console.log(fullResult)
    fs.mkdirSync("src/prData/results", { recursive: true })
    fs.writeFileSync("src/prData/results/" + path, JSON.stringify(fullResult, undefined, 2))



}


function hasCommentCategory(cat:string, d:PR_Data_Entry):boolean{
    let i=Object.keys(structures).indexOf(cat)
    let b=   d.generalComments.includes(i) || d.reviewComments.includes(i) ||
    d.generalComments.includes(-i) || d.reviewComments.includes(-i) ||
    (d.likertData!=undefined && 
       d.likertData.some((it)=>it.some((it)=>it.comments!=undefined
        && it.keywords?.includes(i) || it.keywords?.includes(-i))));
        return b;
}






type Mapper={[key:string]:{(instances:PR_Data_Entry[]):number[]}};
async function main() {
    let structures=require("./structures")
    let variables = Object.keys(structures).slice(0, MAX_COUNTER_VALUE-1)
    let filters: { [key: string]: { (d: PR_Data_Entry): boolean; }}={};
    filters["PositiveComments=true"]=(d)=> d.reviewComments.some((it)=>it>0)  ||d.generalComments.some((it)=>it>0)
    filters["PositiveComments=false"]=(d)=> !(d.reviewComments.some((it)=>it>0)  ||d.generalComments.some((it)=>it>0))
    filters["meaningfulComments=true"]=(d)=>d.reviewComments.length>0  || d.generalComments.length>0
    filters["meaningfulComments=false"]=(d)=>!(d.reviewComments.length>0  || d.generalComments.length>0)
    let keys=Object.keys(structures).slice(0,MAX_COUNTER_VALUE-1)
    for(let k of keys){
        let k2=k;
        filters[k]=(d)=>hasCommentCategory(k2,d)
    }

    filters["merged=true"]=(d)=>d.merged
    filters["merged=false"]=(d)=>!d.merged
    filters["state=open"]=(d)=>d.state=="open"
    filters["state=closed"]=(d)=>d.state=="closed"
    filters["category=detectAndRefactor"]=(d)=>d.category==detectAndRefactor
    filters["category=nameSuggestion"]=(d)=>d.category==nameSuggestion
    filters["type="+fields_to_fields_data_clump]=(d)=>d.type==fields_to_fields_data_clump
    filters["type="+parameters_to_parameters_data_clump]=(d)=>d.type==parameters_to_parameters_data_clump
    
    let metrics:Mapper={}

    for(let fKey of Object.keys(filters)){
        let f=filters[fKey]
        metrics[fKey]=(instances)=>instances.map((it)=>f(it)?1:0)
    }
    metrics["size"]=(instances)=>instances.map((it)=>it.size)





    for (let d of Object.values(data)) {
        if (d.category == filterManual) {
            d.category = nameSuggestion
        }
        if (d.category == filterSnippet) {
            d.category = detectAndRefactor
        }
       
       
    }


   

    concatenateResultsPR("PR",  Object.values(data), filters, metrics)
}


function concatenateResultsPR(prefix: string, data:PR_Data_Entry[], filters: { [key: string]: { (d: PR_Data_Entry): boolean; }}, metrics:Mapper ) {
    let result = {}

    for (let functionKey of Object.keys(statFunctions)) {
        let f = statFunctions[functionKey]
        result[functionKey] = {}

        for (let metricKey of Object.keys(metrics)) {



            result[functionKey][metricKey] = {}
            for (let filterKey of Object.keys(filters)) {
                let filter=filters[filterKey]
                let relevantInstances = data.filter((it) => filter(it))
                if (relevantInstances.length == 0) {
                    continue
                }
                let mapped=metrics[metricKey](relevantInstances)
                let res = f(mapped)
                console.log(metricKey, filterKey, res)

                if (true) {
                    result[functionKey][metricKey][filterKey] = res;
                }

            }
        }
    }

    for (let functionKey of Object.keys(result)) {
        fs.mkdirSync("evalDataResults/" + prefix + "/" + functionKey, { recursive: true })
        for (let metricKey of Object.keys(result[functionKey])) {
            fs.writeFileSync("evalDataResults/" + prefix + "/" + functionKey + "/" + metricKey + ".json", JSON.stringify(result[functionKey][metricKey], undefined, 2))
        }
    }
    return result;
}



if (require.main === module) {
    main()
    //loadData()
}

