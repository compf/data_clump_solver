import * as fs from "fs";
import { data } from "./data"
import { detectAndRefactor, fields_to_fields_data_clump, filterManual, filterSnippet, MAX_COUNTER_VALUE, nameSuggestion, parameters_to_parameters_data_clump, PR_Data, PR_Data_Entry } from "./structures";
import { loadData } from "./dataClumpDataLoader";
import { makeUnique, nop } from "../../../util/Utils";
import { concatenateResults, createCompareObjects, EvalAnalyzer, EvalMetric, statFunctions, SubSetChecker } from "../base_analyzer";
import { Arrayified } from "../../base_eval";
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

let filters = {
    "merged": (d: PR_Data_Entry) => d.merged,
    "parameters_to_parameters": (d: PR_Data_Entry) => d.type == parameters_to_parameters_data_clump,
    "fields_to_fields": (d: PR_Data_Entry) => d.type == fields_to_fields_data_clump,
    "noComments": (d: PR_Data_Entry) => d.reviewComments.length == 0 && d.generalComments.length == 0 || d.noResponse,
    "closed": (d: PR_Data_Entry) => d.state == "closed",
    "project": (d: PR_Data_Entry, project: string) => d.url.includes(project),
    "positive": (d: PR_Data_Entry) => d.generalComments.concat(d.reviewComments).filter(c => c > 0).length > 0,
    "negative": (d: PR_Data_Entry) => d.generalComments.concat(d.reviewComments).filter(c => c < 0).length > 0,
    "neutral": (d: PR_Data_Entry) => d.generalComments.concat(d.reviewComments).filter(c => c == 0).length > 0,
    "all": (d: PR_Data_Entry) => true

}



function main() {
  
    for (let i = 1; i < MAX_COUNTER_VALUE; i++) {
        let variables = Object.keys(require("./structures"))

        filters[variables[i]] = (d: PR_Data_Entry) => d.generalComments.includes(i) || d.reviewComments.includes(i) || d.generalComments.includes(-i) || d.reviewComments.includes(-i)
    }
    let sizes = makeUnique(Object.values(data).map(d => d.size))
    for (let s of sizes) {
        filters["size" + s] = (d: PR_Data_Entry) => d.size == s
    }
    let allMetrics = Object.keys(filters).map(k => new ConditionalMetric(k, filters[k]))
    for(let d of Object.values(data)){
        if(d.category==filterManual){
            d.category=nameSuggestion
        }
        if(d.category==filterSnippet){
            d.category=detectAndRefactor
        }
        d["metrics"]={}
        for(let m of allMetrics){
            d["metrics"][m.getName()]=m.eval(d,undefined)
        }
    }

   
    let variables = Object.keys(require("./structures")).slice(0, MAX_COUNTER_VALUE)
    let instanceCombinations:Arrayified<any>={
        merged:[true,false],
        type:[parameters_to_parameters_data_clump,fields_to_fields_data_clump],
        category:[detectAndRefactor,nameSuggestion],
        size:Array.from({length: 20}, (x, i) => i).filter((it)=>it>=3),
        state:["closed","open"],
        generalComments:variables,
        hasKey:[true,false],



    }
 
    let compareObjects=createCompareObjects(instanceCombinations)
    concatenateResultsPR("PR",compareObjects,allMetrics,Object.values(data) as any,new PRSubsetChecker())
}

class PRSubsetChecker extends SubSetChecker{
    isSubset(superSet: any, subSet: any): boolean {
        for(let k of Object.keys(subSet)){
            if(k=="generalComments"){
                if(!superSet.generalComments.includes(subSet.generalComments[0])){
                    return false;
                }
            }
            if(superSet[k]!=subSet[k]){
                return false
            }
        }
        return true
    }
}
 function concatenateResultsPR(prefix:string,compareObjects:any[],metrics:EvalMetric[],instances: any[], subSetChecker:SubSetChecker) {
    let result = {}

    for (let functionKey of Object.keys(statFunctions)) {
        let f= statFunctions[functionKey]
        result[functionKey] = {}

        for (let cmp of compareObjects) {  
           
            let compareKey=Object.keys(cmp).map((it)=>it+ "= "+cmp[it]).join(" , ")
            let relevantInstances = instances.filter((it) => subSetChecker.isSubset(it, cmp))
           
            result[functionKey][compareKey] = {}
            for (let metricKey of metrics.map((it) => it.getName())) {
                
                let res=f(relevantInstances.map((it) => (it as any).metrics[metricKey]))
                if(!isNaN(res)){    
                    result[functionKey][compareKey][metricKey] = res
                }
               
            }
            if(Object.keys(result[functionKey][compareKey]).length==0){
                delete result[functionKey][compareKey]
            }
        }
    }
    fs.mkdirSync("evalDataResults/"+prefix+"/",{recursive:true})

    for(let functionKey of Object.keys(result)){
        fs.writeFileSync("evalDataResults/"+prefix+"/"+functionKey+".json",JSON.stringify(result[functionKey],undefined,2))
      
    }
    return result;
}

class ConditionalMetric implements EvalMetric {
    private filter: { (d: PR_Data_Entry): boolean };
    private name: string;
    constructor(name: string, filter: { (d: PR_Data_Entry): boolean }) {
        this.filter = filter;
        this.name = name;
    }

   async eval(instance: PR_Data_Entry, context: any):Promise<any> {
        console.log(this.getName())
        let b = this.filter(instance)
        return b ? 1 : 0
    }
    getName(): string {
        return this.name
    }
}

if (require.main === module) {
    main()
    //loadData()
}

