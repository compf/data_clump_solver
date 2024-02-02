import { DataClumpsTypeContext } from "data-clumps-type-context";
import fs from "fs"
import { resolve } from "path";
import { createHash } from 'node:crypto'
import { getRelevantFilesRec } from "./util/Utils";
import { ASTBuildingContext, CodeObtainingContext, DataClumpRefactoringContext, FileFilteringContext } from "./context/DataContext";
import { ChatMessage } from "./util/languageModel/LanguageModelInterface";
import { DataClumpDoctorASTGeneratorStep } from "./pipeline/stepHandler/astGeneration/DataClumpDoctorASTGeratorStep";
import { AST_Class, AST_Type } from "./context/AST_Type";




function get_output_file_paths(): string[] {
    let result = []
    getRelevantFilesRec("llm_results/refactor", result, new FileFilteringContext(["*output.json"], []))
    return result;
}
function parse_chat_file(path: string) {
    console.log(path)


    let chat = JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }))

   return chat[chat.length-1]


}

async function evaluateData(paths:string[],flag:boolean)  {
    const baseFolder="llm_results/evaluatorTest"
    const outPath="llm_results/evalJSON"
    const groundTruthPath="llm_results/ground_truth_refactor"
    let groundTruthPaths:string[]=[]
    getRelevantFilesRec(groundTruthPath,groundTruthPaths,new FileFilteringContext(["*.json"],[]))
    let groundTtruthContext=new ASTBuildingContext()
    for(let path of groundTruthPaths){
        groundTtruthContext.load(path)
    }
    for(let path of paths){
        let contents=parse_chat_file(path)["messages"][0]
        for(let sourcePath of Object.keys(contents)){
            fs.writeFileSync(resolve(baseFolder,sourcePath),contents[sourcePath])
          
        }
        let astGenerator=new DataClumpDoctorASTGeneratorStep(outPath);
        let compareContext=await astGenerator.handle(new CodeObtainingContext(baseFolder),null)
        compareAllASTOutputsWithGroundTruth(compareContext as ASTBuildingContext,groundTtruthContext);
        return null;
    }
    return null;
 
    
}
function median(array: number[]) {
    array.sort((a, b) => a - b)
    if (array.length % 2 == 0) {
        return (array[array.length / 2] + array[array.length / 2 - 1]) / 2
    }
    else {
        return array[Math.floor(array.length / 2)]
    }
}
function mean(array: number[]) {
    return array.reduce((a, b) => a + b, 0) / array.length

}



const dataTypeFilters = {
    "fromScratch": (x: string) => x.includes("fromScratch"),
    "givenContext": (x: string) => x.includes("givenContext"),

}
const dataSizeFilters = {
    "AllFiles": (x: string) => x.includes("AllFiles"),
    "PairOfFileAndSingle": (x: string) => x.includes("PairOfFileAndSingle")
}
const apiFilters = {
    "gpt-4": (x: string) => x.includes("gpt-4"),
    "gpt-3": (x: string) => x.includes("gpt-3"),
}
const temperatureFilters = {
    "0.1": (x: string) => x.includes("0.1"),
    "0.9": (x: string) => x.includes("0.9"),
}
const instructionFilters = {
    "definitionBased": (x: string) => x.includes("definitionBased"),
    "exampleBased": (x: string) => x.includes("exampleBased"),
    "noDefinition": (x: string) => x.includes("noDefinition"),
}
function getName(filters:any):string{
    if(filters==dataTypeFilters){
        return "dataType"
    }
    if(filters==dataSizeFilters){
        return "dataSize"
    }
    if(filters==apiFilters){
        return "api"
    }
    if(filters==temperatureFilters){
        return "temp"
    }
    if(filters==instructionFilters){
        return "instr"
    }
    return ""

}
let filtersPermutations = {
    "api_temp_instr_dataType_data_Size":[apiFilters, temperatureFilters, instructionFilters, dataTypeFilters, dataSizeFilters],
    "dataSize_dataType_instr_temp_api":[apiFilters, temperatureFilters, instructionFilters, dataTypeFilters, dataSizeFilters].reverse(),

}
let allFilters={
    "api":apiFilters,
    "temp":temperatureFilters,
    "instr":instructionFilters,
    "dataType":dataTypeFilters,
    "dataSize":dataSizeFilters,

}

function create_evaluation(key:string,permutation: any[]) {
    let evalResult = {all:evaluateData(get_output_file_paths(),true)}
    let allPaths = get_output_file_paths()

    for (let key0 of Object.keys(permutation[0])) {
        

        evalResult[key0] = { all: evaluateData(allPaths.filter(permutation[0][key0]),true) }
        for (let key1 of Object.keys(permutation[1])) {

            evalResult[key0][key1] = { all: evaluateData(allPaths.filter(permutation[0][key0]).filter(permutation[1][key1]),true) }
            for (let key2 of Object.keys(permutation[2])) {

                evalResult[key0][key1][key2] = { all: evaluateData(allPaths.filter(permutation[0][key0]).filter(permutation[1][key1]).filter(permutation[2][key2]),true) }
                for (let key3 of Object.keys(permutation[3])) {


                    evalResult[key0][key1][key2][key3] = { all: evaluateData(allPaths.filter(permutation[0][key0]).filter(permutation[1][key1]).filter(permutation[2][key2]).filter(permutation[3][key3]),true) }
                    for (let key4 of Object.keys(permutation[4])) {
                        let paths = allPaths.filter(permutation[0][key0]).filter(permutation[1][key1]).filter(permutation[2][key2]).filter(permutation[3][key3]).filter(permutation[4][key4])
                        let result = evaluateData(paths,true)
                        evalResult[key0][key1][key2][key3][key4] = result;

                    }
                }
            }
        }
    }

   
}
const basic=true;
function main() {
   
    {
        for(let key of Object.keys(filtersPermutations))   {
           
            create_evaluation(key,filtersPermutations[key])
          
        }
    }
   

}
main();



function compareAllASTOutputsWithGroundTruth(astContext: ASTBuildingContext, groundTtruthContext:ASTBuildingContext) {
    for(let key of astContext.getKeys()){
        let astClass=astContext.getByPath(key)
        let groundTruthClass=groundTtruthContext.getByPath(key)
        if(groundTruthClass==null){
            console.log("Could not find equivalent ground truth for "+key)
            continue;
        }
        compareSingleASTOutputWithGroundTruth(astClass,groundTruthClass)
    }
}
function compareSingleASTOutputWithGroundTruth(astClass:AST_Class,groundTruthClass:AST_Class):number{
    let similiarities={counter:0}
    increaseCounterIf(similiarities,()=>astClass.name==groundTruthClass.name);
    switch(astClass.name){
        case "MathStuff":
            compareMathStuff(astClass,groundTruthClass,similiarities)
            break;
    }
    
}

function increaseCounterIf(similiarities: { counter: number; }, predicate: () => boolean) {
    if(predicate()){
        similiarities.counter++
    };
}
function compareMathStuff(astClass:AST_Class,groundTruthClass:AST_Class,similiarities: { counter: number; }){
    let astMethods=astClass.methods
}

