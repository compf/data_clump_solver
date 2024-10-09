import * as fs from "fs";
import { data } from "./data"
import { detectAndRefactor,open,closed, fields_to_fields_data_clump, filterManual, filterSnippet, MAX_COUNTER_VALUE, nameSuggestion, parameters_to_parameters_data_clump, PR_Data, PR_Data_Entry, GenerializedCommentCategories, Disagree } from "./structures";
import { loadData } from "./dataClumpDataLoader";
import { makeUnique, nop } from "../../../util/Utils";
import { concatenateResults, createCompareObjects, EvalAnalyzer, EvalMetric, mean, statFunctions, SubSetChecker } from "../base_analyzer";
import { Arrayified } from "../../base_eval";
import {dirname, resolve } from "path"
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
    let i=Object.keys(structures).indexOf(cat)+1
    let b=   d.generalComments.includes(i) || d.reviewComments.includes(i) ||
    d.generalComments.includes(-i) || d.reviewComments.includes(-i) ||
    (d.likertData!=undefined && 
       d.likertData.some((it)=>it.some((it)=>it.comments!=undefined
        && (it.keywords?.includes(i) || it.keywords?.includes(-i)))));
        return b;
}

function hasPositiveCommentCategory(cat:string, d:PR_Data_Entry):boolean{
    let i=Object.keys(structures).indexOf(cat)+1
    let b=   d.generalComments.includes(i) || d.reviewComments.includes(i) ||
    (d.likertData!=undefined && 
       d.likertData.some((it)=>it.some((it)=>it.comments!=undefined
        && it.keywords?.includes(i))));
        return b;
}

function hasNegativeCommentCategory(cat:string, d:PR_Data_Entry):boolean{
    let i=Object.keys(structures).indexOf(cat)+1
    let b= d.generalComments.includes(-i) || d.reviewComments.includes(-i) ||
    (d.likertData!=undefined && 
       d.likertData.some((it)=>it.some((it)=>it.comments!=undefined
        && it.keywords?.includes(-i))));
        return b;
}






type Mapper={[key:string]:{(instances:PR_Data_Entry[]):number[]}};
async function main() {
    let structures=require("./structures")
    let variables = Object.keys(structures).slice(0, MAX_COUNTER_VALUE-1)
    let filters: { [key: string]: { (d: PR_Data_Entry): boolean; }}={};
    filters["all"]=()=>true
    filters["PositiveComments=true"]=(d)=> d.reviewComments.some((it)=>it>0)  ||d.generalComments.some((it)=>it>0)
    filters["PositiveComments=false"]=(d)=> !(d.reviewComments.some((it)=>it>0)  ||d.generalComments.some((it)=>it>0))
    filters["meaningfulComments=true"]=(d)=>d.reviewComments.length>0  || d.generalComments.length>0
    filters["meaningfulComments=false"]=(d)=>!(d.reviewComments.length>0  || d.generalComments.length>0)
    let keys=Object.keys(structures).slice(0,MAX_COUNTER_VALUE-1)
    for(let k of keys){
        let k2=k;
        filters[k]=(d)=>hasCommentCategory(k2,d)
        filters[k+"+"]=(d)=>hasPositiveCommentCategory(k2,d)
        filters[k+"-"]=(d)=>hasNegativeCommentCategory(k2,d)
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

  





    for (let d of Object.values(data)) {
        if (d.category == filterManual) {
            d.category = nameSuggestion
        }
        if (d.category == filterSnippet) {
            d.category = detectAndRefactor
        }
        d.categorizedComments=[]
        for(let c of d.generalComments){
            c=Math.abs(c)
            for(let k of Object.keys(GenerializedCommentCategories)){
                if(GenerializedCommentCategories[k].includes(c)){
                    d.categorizedComments!.push(Object.keys(GenerializedCommentCategories).indexOf(k))
                }
            }
            for(let c of d.reviewComments){
                c=Math.abs(c)
                for(let k of Object.keys(GenerializedCommentCategories)){
                    if(GenerializedCommentCategories[k].includes(c)){
                        d.categorizedComments!.push(Object.keys(GenerializedCommentCategories).indexOf(k))
                    }
                }
            }
        }
       
       
    }
    for(let k of Object.keys(GenerializedCommentCategories)){
        let k2=k;
        filters[k]=(d)=>d.categorizedComments!.includes(Object.keys(GenerializedCommentCategories).indexOf(k2))
    }
    for(let fKey of Object.keys(filters)){
        let f=filters[fKey]
        metrics[fKey]=(instances)=>instances.map((it)=>f(it)?1:0)
    }
    metrics["size"]=(instances)=>instances.map((it)=>it.size)


   

    concatenateResultsPR("PR",  Object.values(data), filters, metrics)
}
const permutator = (inputArr:any[]) => {
    let result:any[] = [];
  
    const permute = (arr, m = []) => {
      if (arr.length === 0) {
        result.push(m)
      } else {
        for (let i = 0; i < arr.length; i++) {
          let curr = arr.slice();
          let next = curr.splice(i, 1);
          permute(curr.slice(), m.concat(next))
       }
     }
   }
  
   permute(inputArr)
  
   return result;
  }
  let results:{[path:string]:any}={}
function saveResults(){
    for(let p of Object.keys(results)){
        fs.mkdirSync(dirname(p), { recursive: true })
        fs.writeFileSync(p,JSON.stringify(results[p],undefined,2))
    }
  

}

function createResults(prefix:string, path:string, keyNames:string[], keys:{[key:string]:string}, val:any){
    let outPath=resolve("evalDataResults",prefix,path,keys[keyNames[0]],keys[keyNames[1]])+".json"
    
    let obj={}
    if(outPath in results){
        obj=results[outPath]
    }
    obj[keys[keyNames[2]]]=val;
    results[outPath]=obj;   
}

function concatenateResultsPR(prefix: string, data:PR_Data_Entry[], filters: { [key: string]: { (d: PR_Data_Entry): boolean; }}, metrics:Mapper ) {
    let folderNames=["Function","Metric","Filter"]
    let keyNames=["functionKey", "metricKey", "filterKey"]

    let folderPermutations=permutator(folderNames)
    let keyPermutations=permutator(keyNames)
    
    let zipped:{[key:string]:string[]}={}
    for(let i=0;i<folderPermutations.length;i++){
        zipped[folderPermutations[i].join("")]=keyPermutations[i]
    }

    for (let functionKey of Object.keys(statFunctions)) {
        let f = statFunctions[functionKey]

        for (let metricKey of Object.keys(metrics)) {



            for (let filterKey of Object.keys(filters)) {
                let keys={
                    functionKey:functionKey,
                    metricKey:metricKey,
                    filterKey:filterKey
                }
                let filter=filters[filterKey]
                let relevantInstances = data.filter((it) => filter(it))
                if (relevantInstances.length == 0) {
                    continue
                }
                let mapped=metrics[metricKey](relevantInstances)
                let res = f(mapped)
                console.log(metricKey, filterKey, res)

                if (true) {
                    for( let folderKey of Object.keys(zipped)){
                        createResults(prefix,folderKey,zipped[folderKey],keys,res)
                    }
         
                }

            }
        }
    }
saveResults()
  
}
function getTextRating(value:number, isNegativeTwoToTwo:boolean){
    if(isNegativeTwoToTwo){
        value+=2;
    }
    let ratings=["Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"]
    let integerPart=Math.floor(value);
    let decimalPart=value-integerPart;
    let rating=ratings[integerPart]
    if(decimalPart<0.3){
        rating+="-"
    }
    else if(decimalPart>0.7){
        rating+="+"
    }
    return rating;
    
}
function likertData(){
    const numberQuestions=6;;

    let likertZeroToFour=new Array(numberQuestions).fill(0)
    let likertNegativeTwoToTwo=new Array(numberQuestions).fill(0)
    for(let d of Object.values(data)){
        if(d.likertData){
            
            for(let i=0;i<d.likertData.length;i++){
                console.log(d.likertData[i].length)
                for(let j=0;j<d.likertData![i].length;j++){
                    let val=d.likertData![i][j]
                    likertZeroToFour[j]+=val.scale
                    likertNegativeTwoToTwo[j]+=(val.scale-2)
                }
            }
        }

    }
    const questions=[
        "Data clumps are a code smell that should be fixed.",
        "Using LLMs in software development can be helpful to improve code quality.",
        "The proposed refactoring maintains or improves the quality of the code.",
        "The proposed refactoring has  adequately identified and preserved the original functionality and intent of the code.",
        "The name of the new extracted class(es), fields and methods are well-chosen.",
         "The location of the extracted class(es) are well-chosen.",
         "For how long have you been contributing to this project?",
        "For how long have you been a developer in Java ? ",
        "Please input the URL of the GitHub project from where you got to this survey.",
    ]
    let withQuestionNullToFour={}
    let withQuestionNegativeTwoToTwo={}
    let withRatingNullToFour={}
    let withRatingNegativeTwoToTwo={}
    for(let i=0;i<numberQuestions;i++){
        likertZeroToFour[i]/=numberQuestions;
        likertNegativeTwoToTwo[i]/=numberQuestions;
        withQuestionNullToFour[questions[i]]=likertZeroToFour[i]
        withQuestionNegativeTwoToTwo[questions[i]]=likertNegativeTwoToTwo[i]
        withRatingNullToFour[questions[i]]=getTextRating(likertZeroToFour[i],false)
        withRatingNegativeTwoToTwo[questions[i]]=getTextRating(likertNegativeTwoToTwo[i],true)

    }
    let meanZeroToFour=mean(likertZeroToFour)
    let meanNegativeTwoToTwo=mean(likertNegativeTwoToTwo)

    let meanRatingNullToFour=getTextRating(meanZeroToFour as number,false)
    let meanRatingNegativeTwoToTwo=getTextRating(meanNegativeTwoToTwo as number,true)
    console.log("meanZeroToFour",meanZeroToFour)
    console.log("meanNegativeTwoToTwo",meanNegativeTwoToTwo)

  
    let resultObj={
        likertZeroToFour:likertZeroToFour,
        likertNegativeTwoToTwo:likertNegativeTwoToTwo,
        meanZeroToFour:meanZeroToFour,
        meanNegativeTwoToTwo:meanNegativeTwoToTwo,
        withQuestionNullToFour:withQuestionNullToFour,
        withQuestionNegativeTwoToTwo:withQuestionNegativeTwoToTwo,
        withRatingNullToFour:withRatingNullToFour,
        withRatingNegativeTwoToTwo:withRatingNegativeTwoToTwo,
        meanRatingNullToFour:meanRatingNullToFour,
        meanRatingNegativeTwoToTwo:meanRatingNegativeTwoToTwo
    }
    fs.mkdirSync("evalDataResults/PR", { recursive: true })
    fs.writeFileSync("evalDataResults/PR/likert.json",JSON.stringify({
       resultObj:resultObj
    },undefined,2))


}

if (require.main === module) {
 likertData()
    main()
}

