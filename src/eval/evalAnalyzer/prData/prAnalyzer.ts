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
abstract class FilterAndMetric{
    abstract eval(d:PR_Data_Entry):number
    abstract getValues():any[]
    abstract getMetricName():string;
    getFilterName(v:any){
        return this.getMetricName()+"="+v;
    }
     appendFilters(filters:{[key:string]:{(d:PR_Data_Entry):boolean}}){
        let values=this.getValues();
        for(let v of values){
            let k=this.getMetricName()
            filters[this.getFilterName(v)]=(d)=>d[k]==v;
        }
     }
}


class SimpleFilter extends FilterAndMetric{
    protected values:any[];
    protected key:string

    constructor(key:string, ...values:any){
        super();
        this.key=key;
        this.values=values
    }
    eval(d: PR_Data_Entry): number {
        return d[this.key]==this.values[0]?1:0
    }
   
    getValues(): any[] {
        return this.values;
    }
    getMetricName(): string {
        return this.key;
    }
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
class IncludeCommentFilter extends FilterAndMetric{
    private commentCategory:string
    getValues(): any[] {
        return Object.values(structures).slice(0,MAX_COUNTER_VALUE)
    }
    constructor(commentCategory:string){
        super()
        this.commentCategory=commentCategory;
    }
    getMetricName(): string {
        return this.commentCategory;
    }

    eval(d: PR_Data_Entry): number {

       let b=hasCommentCategory(this.commentCategory,d)
        return b ?1 :0;
    }
    appendFilters(filters: { [key: string]: { (d: PR_Data_Entry): boolean; }; }): void {
        let keys=Object.keys(structures).slice(0,MAX_COUNTER_VALUE-1)
        for(let k of keys){
            let k2=k;
            filters[k]=(d)=>hasCommentCategory(k2,d)
        }

        
    }
}

class DataClumpSizeMetric extends FilterAndMetric{
    getMetricName(): string {
        return "size"
    }

    eval(d: PR_Data_Entry): number {
        return d.size
    }

    getValues(): any[] {
        return makeUnique(Object.values(data).map((it)=>it.size))
    }
}

class MeaningFullCommentsMetric extends FilterAndMetric{
    getValues(): any[] {
        return []
    }
    eval(d: PR_Data_Entry): number {
        return d.reviewComments.length>0  || d.generalComments.length>0 ?1:0
        
    }
    getMetricName(): string {
        return "MeaningfulComments"
    }

    appendFilters(filters: { [key: string]: { (d: PR_Data_Entry): boolean; }; }): void {
        filters["meaningfulComments=true"]=(d)=>d.reviewComments.length>0  || d.generalComments.length>0
        filters["meaningfulComments=false"]=(d)=>!(d.reviewComments.length>0  || d.generalComments.length>0)

    }

}

class PositiveCommentsMetric extends FilterAndMetric{
    getValues(): any[] {
        return []
    }
    eval(d: PR_Data_Entry): number {
        return d.reviewComments.some((it)=>it>0)  ||d.generalComments.some((it)=>it>0) ?1:0
        
    }
    getMetricName(): string {
        return "PositiveComments"
    }

    appendFilters(filters: { [key: string]: { (d: PR_Data_Entry): boolean; }; }): void {
        filters["PositiveComments=true"]=(d)=> d.reviewComments.some((it)=>it>0)  ||d.generalComments.some((it)=>it>0)
        filters["PositiveComments=false"]=(d)=> !(d.reviewComments.some((it)=>it>0)  ||d.generalComments.some((it)=>it>0))

    }
}

let metrics:FilterAndMetric[]=[
    new SimpleFilter("merged",true,false),
    new SimpleFilter("state",open,closed),
    new SimpleFilter("type",fields_to_fields_data_clump,parameters_to_parameters_data_clump),
    new SimpleFilter("category", nameSuggestion, detectAndRefactor),
    new MeaningFullCommentsMetric(),
    new DataClumpSizeMetric(),
    new PositiveCommentsMetric(),
]
for(let c of Object.keys(structures).slice(0,MAX_COUNTER_VALUE-1)){
    metrics.push(new IncludeCommentFilter(c))
}




async function main() {
    let structures=require("./structures")
    let variables = Object.keys(structures).slice(0, MAX_COUNTER_VALUE-1)
    let filters: { [key: string]: { (d: PR_Data_Entry): boolean; }}={};

    for(let m of metrics){
        m.appendFilters(filters)
        
    }

    for (let d of Object.values(data)) {
        if (d.category == filterManual) {
            d.category = nameSuggestion
        }
        if (d.category == filterSnippet) {
            d.category = detectAndRefactor
        }
        (d as any).metrics={}
        for(let m of metrics){
            (d as any).metrics[m.getMetricName()]=m.eval(d)
        }
       
    }


   

    concatenateResultsPR("PR",  Object.values(data), filters, metrics)
}


function concatenateResultsPR(prefix: string, data:PR_Data_Entry[], filters: { [key: string]: { (d: PR_Data_Entry): boolean; }}, metrics:FilterAndMetric[] ) {
    let result = {}

    for (let functionKey of Object.keys(statFunctions)) {
        let f = statFunctions[functionKey]
        result[functionKey] = {}

        for (let metricKey of metrics.map((it) => it.getMetricName())) {



            result[functionKey][metricKey] = {}
            for (let filterKey of Object.keys(filters)) {
                let filter=filters[filterKey]
                let relevantInstances = data.filter((it) => filter(it))
                if (relevantInstances.length == 0) {
                    continue
                }
                let res = f(relevantInstances.map((it) => (it as any).metrics[metricKey]))
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

