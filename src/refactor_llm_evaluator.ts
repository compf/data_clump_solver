import { DataClumpsTypeContext } from "data-clumps-type-context";
import fs from "fs"
import { resolve } from "path";
import { createHash } from 'node:crypto'
import { getRelevantFilesRec, waitSync } from "./util/Utils";
import { ASTBuildingContext, CodeObtainingContext, DataClumpRefactoringContext, FileFilteringContext, ValidationContext } from "./context/DataContext";
import { ChatMessage } from "./util/languageModel/LanguageModelInterface";
import { DataClumpDoctorASTGeneratorStep } from "./pipeline/stepHandler/astGeneration/DataClumpDoctorASTGeratorStep";
import { AST_Class, AST_Type } from "./context/AST_Type";
import { GradleBuildValidationStepHandler } from "./pipeline/validation/GradleBuildValidationStepHandler";




function get_output_file_paths(): string[] {
    let result = []
    getRelevantFilesRec("llm_results/refactor", result, new FileFilteringContext(["*output.json"], []))
    return result;
}
function parse_chat_file(path: string) {

    let chat = JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }))

   return chat[chat.length-1]


}
const groundTruthPath="llm_results/ground_truth_refactor"
let groundTruthPaths:string[]=[]
getRelevantFilesRec(groundTruthPath,groundTruthPaths,new FileFilteringContext(["*.json"],[]))
let groundTtruthContext=new ASTBuildingContext()
console.log(groundTruthPaths.length)
for(let path of groundTruthPaths){
    groundTtruthContext.load(path)
    console.log("loaded",path)
}
async function evaluateData(paths:string[],flag:boolean)  {
    const baseFolder="llm_results/evaluatorTest"
    const outPath="llm_results/evalJSON"
    const sourceLocation="src/main/java/org/example/"
    let evalResult={reachedPoints:0,allPoints:0,percentage:0}
    for(let path of paths){
        evalResult[path]={}
        console.log(path)
        let contents=parse_chat_file(path)["messages"][0]
        for(let fName of fs.readdirSync(resolve(baseFolder,sourceLocation))){
            fs.rmSync(resolve(baseFolder,sourceLocation,fName))
          
        }
        for(let sourceCodeFile of Object.keys(contents)){
            fs.writeFileSync(resolve(baseFolder,sourceCodeFile),contents[sourceCodeFile])
          
        }
        waitSync(1000)
        let astGenerator=new DataClumpDoctorASTGeneratorStep(outPath);
        let compareContext=await astGenerator.handle(new CodeObtainingContext(baseFolder),null)
        let comparisonResult=compareAllASTOutputsWithGroundTruth(compareContext as ASTBuildingContext,groundTtruthContext);
        evalResult["reachedPoints"]+=comparisonResult.counter
        evalResult["allPoints"]+=comparisonResult.allCounter
        evalResult["percentage"]=100*evalResult["reachedPoints"]/evalResult["allPoints"]
        evalResult[path]["source_files"]={}
        for(let sourceCodeFile of Object.keys(contents)){
            evalResult[path]["source_files"][sourceCodeFile]=contents[sourceCodeFile].split("\n")          
        }

        waitSync(1000)
        let validator=new GradleBuildValidationStepHandler();
        let result=await validator.handle(compareContext,null) as ValidationContext
        console.log(result.validationResult.success)
        evalResult[path]["validation"]=result.validationResult;
        
    }
    return evalResult;
 
    
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

async function create_evaluation(key:string,permutation: any[]) {
    let evalResult = {}
    let allPaths = get_output_file_paths()

    for (let key0 of Object.keys(permutation[0])) {
        

        evalResult[key0] = { }
        for (let key1 of Object.keys(permutation[1])) {

            evalResult[key0][key1] = {  }
            for (let key2 of Object.keys(permutation[2])) {

                evalResult[key0][key1][key2] = {  }
                for (let key3 of Object.keys(permutation[3])) {


                    evalResult[key0][key1][key2][key3] = {  }
                    for (let key4 of Object.keys(permutation[4])) {
                        let paths = allPaths.filter(permutation[0][key0]).filter(permutation[1][key1]).filter(permutation[2][key2]).filter(permutation[3][key3]).filter(permutation[4][key4])
                        let result = await evaluateData(paths,true)
                        evalResult[key0][key1][key2][key3][key4] = result;
                        console.log(key0, key1, key2, key3, key4, result)
                    }
                }
            }
        }
    }
    fs.writeFileSync("llm_results/refactorResults_"+key+".json", JSON.stringify(evalResult))

   
}
const basic=true;
async function main() {
   
    {
        for(let key of Object.keys(filtersPermutations))   {
           
           await  create_evaluation(key,filtersPermutations[key])
          
        }
    }
   

}
main();


type SimiliarityInfo={
    counter:number,
    allCounter:number,
    logs:string[]
}
function compareAllASTOutputsWithGroundTruth(astContext: ASTBuildingContext, groundTtruthContext:ASTBuildingContext) {
    let similiarities:SimiliarityInfo={counter:0,allCounter:0,logs:[]}
    let bothDataClassesExist=true;
    let oneNewClassFound=false;
    for(let key of astContext.getKeys()){
        let astClass=astContext.getByPath(key)
        let groundTruthClass=groundTtruthContext.getByPath(key)
        if(groundTruthClass==null){
            oneNewClassFound=true;
            bothDataClassesExist=bothDataClassesExist && analyzeDataClass(similiarities,astClass);
            console.log("Could not find equivalent ground truth for "+key)
            continue;
        }
        compareSingleASTOutputWithGroundTruth(similiarities,astClass,groundTruthClass)
        
    }
    increaseCounterIf("Both data classes do not exist",similiarities,()=>bothDataClassesExist && oneNewClassFound);
    console.log("Similiarity",100*similiarities.counter/similiarities.allCounter,"%")
    return similiarities
}
const pointTypes=["int","int","int"]
const pointNames=["x","y","z"]
const floatingPointTypes=["boolean","double","int"]
const floatingPointNames=["exponent","mantissa","sign"]
const pointGetters=["getX","getY","getZ"]
const pointSetters=["setX","setY","setZ"]
const floatingPointGetters=["getExponent","getMantissa","getSign"]
const floatingPointSetters=["setExponent","setMantissa","setSign"]

function analyzeDataClass(similiarities:SimiliarityInfo,astClass:AST_Class):boolean{
let fields=Object.values(astClass.fields)
let fieldNames=fields.map(it=>it.name).sort();
let fieldTypes=fields.map(it=>it.type).sort();
console.log(fieldNames)
let pointClassExists=false;
let floatingNumberClassExists=false;
for(let i=0;i<fieldNames.length;i++){
     let isPointClass=  fieldNames.length==pointNames.length && fieldNames[i]==pointNames[i] && fieldTypes[i]==pointTypes[i];
     let isFloatingPointClass=  fieldNames.length==floatingPointNames.length && fieldNames[i]==floatingPointNames[i] && fieldTypes[i]==floatingPointTypes[i];
    increaseCounterIf("fields different"+" "+fieldTypes[i]+" " + fieldNames[i],similiarities,()=>isPointClass || isFloatingPointClass);
    pointClassExists=pointClassExists || isPointClass;
    floatingNumberClassExists=floatingNumberClassExists || isFloatingPointClass;

}

return pointClassExists || floatingNumberClassExists;

}
function compareSingleASTOutputWithGroundTruth(similiarities:SimiliarityInfo,astClass:AST_Class,groundTruthClass:AST_Class){
    increaseCounterIf("Different class names "+astClass.name+" vs " +groundTruthClass.name,similiarities,()=>astClass.name==groundTruthClass.name);
    increaseCounterIf("Different method count "+ astClass.methods.length+" vs "+groundTruthClass.methods.length,similiarities,()=>astClass.methods.length==groundTruthClass.methods.length);
    increaseCounterIf("Different field count "+astClass.fields.length+" vs "+groundTruthClass.fields.length,similiarities,()=>astClass.fields.length==groundTruthClass.fields.length);
    console.log(astClass.name)
    let methodsFromLLM=Object.values(astClass.methods)
    let methodsFromGroundTruth=Object.values(groundTruthClass.methods)
    for(let m1 of methodsFromLLM){
        console.log(m1.name)
        let m2=methodsFromGroundTruth.find(it=>m1.name==it.name)
        if(m2==null){
            console.log("Additional method "+m1.name)
            continue;
        }
        increaseCounterIf("Different method parameters "+m1.parameters.length +" vs "+m2.parameters.length,similiarities,()=>m1.parameters.length==m2!.parameters.length);
    }

    
}

function increaseCounterIf(description:string,similiarities: SimiliarityInfo, predicate: () => boolean) {
    if(predicate()){
        similiarities.counter++
    }else{
        similiarities.logs.push(description)
    }
    similiarities.allCounter++;
}


