import { DataClumpsTypeContext } from "data-clumps-type-context";
import fs from "fs"
import { createHash } from 'node:crypto'
import { getRelevantFilesRec } from "./util/Utils";
import { FileFilteringContext } from "./context/DataContext";
import { ChatMessage } from "./util/languageModel/LanguageModelInterface";

const ground_truth = JSON.parse(fs.readFileSync("llm_results/detect/dataClumpDetectorContext.json", { encoding: "utf-8" }))
function standardize(dcData: DataClumpsTypeContext) {
    let result: DataClumpsTypeContext = {} as any
    result.data_clumps = {}
    for (let dcKey of Object.keys(dcData.data_clumps)) {
        let dcValue = dcData.data_clumps[dcKey];
        if (dcValue["key"] == undefined) continue
        dcValue.key = undefined as any
        dcValue.from_method_key = undefined as any
        dcValue.to_method_key = undefined as any
        let newDCData = {}

        dcValue.from_class_or_interface_key = undefined as any
        dcValue.to_class_or_interface_key = undefined as any

        for (let dcDataKey of Object.keys(dcValue.data_clump_data)) {
            let dcDataValue = dcValue.data_clump_data[dcDataKey]
            if (dcDataValue.to_variable) {
                dcDataValue.to_variable.key = undefined as any
            }
            dcDataValue.key = undefined as any
            let hashed = sha256(JSON.stringify(dcDataValue))
            dcDataValue.key = hashed
            newDCData[hashed] = dcDataValue

        }
        dcValue.data_clump_data = newDCData
        let hashed = sha256(JSON.stringify(dcValue))
        dcValue.key = hashed
        result.data_clumps[hashed] = dcValue

    }
    return result
}
type BasicEvaluationResult = {
    sensitivityBest: number,
    specifityBest: number,

    medianSensitivity: number,
    meanSensitivity: number,

    medianSpecifity: number,
    meanSpecifity: number,
    stdSensitivity: number,
    stdSpecifity: number,

}
const BasicEvaluationKeys=["sensitivityBest","specifityBest","medianSensitivity","medianSpecifity","meanSensitivity","meanSpecifity","stdSensitivity","stdSpecifity"]
type EvaluationResult = BasicEvaluationResult & {
   
    sensitivityBestPath: string,
    specifityBestPath: string,
    sensitivies: number[],
    specifities: number[],
    whiteSpace: string,
    SensitivityWorst: number,
    SpecifityWorst: number,
    SensitivityWorstPath: string,
    SpecifityWorstPath: string,
    whiteSpace2: string,
   
}
function get_output_file_paths(): string[] {
    let result = []
    getRelevantFilesRec("llm_results/detect/", result, new FileFilteringContext(["*output.json"], []))
    return result;
}
function parse_chat_file(path: string) {
    let chat = JSON.parse(fs.readFileSync(path, { encoding: "utf-8" })) as ChatMessage[]
    let outputs = chat.filter((x) => x.messageType == "output" && x.messages.length > 0 && x.messages[0]["data_clumps"] != undefined);
    let combined: DataClumpsTypeContext = {
        data_clumps: {}
    } as any;
    let tooLarge = outputs.some((x) => x.messages.length > 1)
    for (let output of outputs) {
        let msg = output.messages[0] as any as DataClumpsTypeContext
        let standardized = standardize(msg)

        for (let key of Object.keys(standardized.data_clumps)) {
            combined.data_clumps[key] = standardized.data_clumps[key]
        }

    }

    return combined

}
function sha256(content: string): string {
    return createHash('sha256').update(content).digest('hex')
}
function get_class_method_tuples(dcContext: DataClumpsTypeContext): string[] {
    let detectedClassMethodPairs: string[] = []
    for (let dcKey of Object.keys(dcContext.data_clumps)) {
        let dc = dcContext.data_clumps[dcKey]
        let class_identifier = [dc.from_class_or_interface_name, dc.to_class_or_interface_name].sort()
        if (class_identifier.includes("X_y_z") || class_identifier.includes("Exponent_mantissa_sign")) {
            continue;
        }
        let method_identifier = [dc.from_method_name, dc.to_method_name].sort()
        let all = [...class_identifier, ...method_identifier]
        let stringified = JSON.stringify(all)
        detectedClassMethodPairs.push(stringified)

    }
    return detectedClassMethodPairs;
}
let ground_truth_standardized = standardize(ground_truth)
let original = get_class_method_tuples(ground_truth_standardized)
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
function std(array: number[]) {
    let mean = array.reduce((a, b) => a + b, 0) / array.length
    let variance = array.map((x) => (x - mean) ** 2).reduce((a, b) => a + b, 0) / array.length
    return Math.sqrt(variance)
}
let failures={}
function evaluateData(paths: string[],fullEval:boolean):EvaluationResult {
    let max_d_in_o = 0;
    let max_o_in_d = 0;
    let max_d_in_o_path = ""
    let max_o_in_d_path = ""

    let min_d_in_o = 1;
    let min_o_in_d = 1;
    let min_d_in_o_path = ""
    let min_o_in_d_path = ""
    let originalInDetected: number[] = []
    let detectedInOriginal: number[] = []

    for (let p of paths) {
        let combined = parse_chat_file(p)
        let detected = get_class_method_tuples(combined)
        let original_in_detected = 0;
        let detected_in_original = 0;
        for (let o of original) {
            if (detected.includes(o)) {

                original_in_detected++;
            }
            else {
                //console.log(p, "Unknown in detected", o)

            }
        }
        for (let d of detected) {
            if (original.includes(d)) {
                detected_in_original++;
            }
            else {
                //console.log(p, "Unknown in original", d)

            }
        }
        if (detected.length > 0) {
            detected_in_original /= detected.length

        }
        if (original.length > 0) {
            original_in_detected /= original.length
        }
        if(detected_in_original==0 && fullEval){
            failures[p]=combined
        }
        if(original_in_detected==0){
            failures[p]=combined
        }
        originalInDetected.push(original_in_detected)
        detectedInOriginal.push(detected_in_original)
        if (detected_in_original > max_d_in_o) {
            max_d_in_o = detected_in_original
            max_d_in_o_path = p

        }
        if (original_in_detected > max_o_in_d) {
            max_o_in_d = original_in_detected
            max_o_in_d_path = p
        }
        if (detected_in_original < min_d_in_o) {
            min_d_in_o = detected_in_original
            min_d_in_o_path = p

        }
        if (original_in_detected < min_o_in_d) {
            min_o_in_d = original_in_detected
            min_o_in_d_path = p
        }


    }
    return {
        sensitivityBest: max_d_in_o * 100,
        specifityBest: max_o_in_d * 100,
        sensitivityBestPath: max_d_in_o_path,
        specifityBestPath: max_o_in_d_path,
        sensitivies: detectedInOriginal.map((it) => 100 * it),
        specifities: originalInDetected.map((it) => it * 100),
        whiteSpace: "##############################################################################",
        SensitivityWorst: min_d_in_o * 100,
        SpecifityWorst: min_o_in_d * 100,
        SensitivityWorstPath: min_d_in_o_path,
        SpecifityWorstPath: min_o_in_d_path,
        whiteSpace2: "##############################################################################",
        medianSensitivity: median(detectedInOriginal) * 100,
        medianSpecifity: median(originalInDetected) * 100,
        meanSensitivity: mean(detectedInOriginal) * 100,
        meanSpecifity: mean(originalInDetected) * 100,
        stdSensitivity: std(detectedInOriginal) * 100,
        stdSpecifity: std(originalInDetected) * 100,

    }
}
function makeResultBasic(result:EvaluationResult):BasicEvaluationResult{
    return {
        sensitivityBest: Math.floor(result.sensitivityBest),
        specifityBest: Math.floor(result.specifityBest),
        medianSensitivity: Math.floor(result.medianSensitivity),
        medianSpecifity: Math.floor(result.medianSpecifity),
        meanSensitivity:Math.floor( result.meanSensitivity),
        meanSpecifity: Math.floor(result.meanSpecifity),
        stdSensitivity: Math.floor(result.stdSensitivity),
        stdSpecifity: Math.floor(result.stdSpecifity),
    }
}
const dataTypeFilters = {
    "Source": (x: string) => x.includes("source"),
    "ast": (x: string) => x.includes("ast"),

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
    "0.5": (x: string) => x.includes("0.5"),
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
function create_basic_evaluation(firstFilter:any) {
    let tempResult={}
    let allPaths = get_output_file_paths()
    let basicEvalResult={}
    let sums={}
    let totalSum=0;
   

    let evalResult = {all:evaluateData(allPaths,false)}
    for (let key0 of Object.keys(firstFilter)) {
        evalResult[key0] = { all: evaluateData(allPaths.filter(firstFilter[key0]),false) }
        tempResult[key0]=makeResultBasic(evalResult[key0].all)
        sums[key0]=0;
        for(let statKey of  BasicEvaluationKeys){
            if(basicEvalResult[statKey]==undefined){
                basicEvalResult[statKey]={}
            }
            basicEvalResult[statKey][key0]=tempResult[key0][statKey];
            if(statKey!="sensitivityBest" && statKey!="specifityBest"){
                sums[key0]+=tempResult[key0][statKey]
                totalSum+=tempResult[key0][statKey]
            }
            
        }
    }
    for(let key0 of Object.keys(firstFilter)){
        sums[key0]/=totalSum;
    }
    basicEvalResult["sums"]=sums;
    

    let latex="\\begin{table}\n\\begin{tabular}{c|c|c|c|c|c}\n";
    latex+="Median Sensitivity & Median Specifity & Mean Sensitivity & Mean Specifity & Std Sensitivity & Std Specifity \\\\ \n"
    for(let key0 of Object.keys(firstFilter)){
        latex+=tempResult[key0].medianSensitivity+" & "+tempResult[key0].medianSpecifity+" & "+tempResult[key0].meanSensitivity+" & "+tempResult[key0].meanSpecifity+" & "+tempResult[key0].stdSensitivity+" & "+tempResult[key0].stdSpecifity+" \\\\ \n"
    }
    latex+="\\end{tabular}\n\\end{table}"
    fs.writeFileSync("llm_results/detect/basic_"+getName(firstFilter)+".latex", latex)
    fs.writeFileSync("llm_results/detect/basic_"+getName(firstFilter)+".json", JSON.stringify(basicEvalResult, null, 2))
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

    fs.writeFileSync("llm_results/detect/"+key+".json", JSON.stringify(evalResult, null, 2))
    fs.writeFileSync("llm_results/detect/failures.json", JSON.stringify(failures, null, 2))
}
const basic=true;
function main() {
    if(basic){
        for(let key of Object.keys(allFilters))   {
           
            create_basic_evaluation(allFilters[key]);
                
           
        }
    }
    else{
        for(let key of Object.keys(filtersPermutations))   {
           
            create_evaluation(key,filtersPermutations[key])
          
        }
    }
   

}
if (require.main == module) {
    main();

}



