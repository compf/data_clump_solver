import { DataClumpsTypeContext } from "data-clumps-type-context";
import fs from "fs"
import { createHash } from 'node:crypto'
import { getRelevantFilesRec } from "./util/Utils";
import { FileFilteringContext } from "./context/DataContext";
import { ChatMessage } from "./util/languageModel/LanguageModelInterface";

const ground_truth = JSON.parse(fs.readFileSync("llm_results/dataClumpDetectorContext.json", { encoding: "utf-8" }))
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

function get_output_file_paths(): string[] {
    let result = []
    getRelevantFilesRec("llm_results", result, new FileFilteringContext(["*output.json"], []))
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
    let result = array.reduce((a, b) => a + b, 0) / array.length
    if (isNaN(result)) {
        console.log(array)
        for (let i of array) {
            console.log(i)
        }
        console.log("sum", array.reduce((a, b) => a + b, 0))
        console.log("length", array.length)
        //throw ""
    }
    return result;
}
function findBestMethod(paths: string[]) {
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
        SensitivityBest: max_d_in_o * 100,
        SpecifityBest: max_o_in_d * 100,
        SensitivityBestPath: max_d_in_o_path,
        SpecifityBestPath: max_o_in_d_path,
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
    "0.9": (x: string) => x.includes("0.9"),
}
const instructionFilters = {
    "definitionBased": (x: string) => x.includes("definitionBased"),
    "exampleBased": (x: string) => x.includes("exampleBased"),
    "noDefinition": (x: string) => x.includes("noDefinition"),
}
let filtersPermutations = {
    "api_temp_instr_dataType_data_Size":[apiFilters, temperatureFilters, instructionFilters, dataTypeFilters, dataSizeFilters],
    "dataSize_dataType_instr_temp_api":[apiFilters, temperatureFilters, instructionFilters, dataTypeFilters, dataSizeFilters].reverse(),

}
function create_evaluation(key:string,permutation: any[]) {
    let evalResult = {}
    for (let key0 of Object.keys(permutation[0])) {
        

        let allPaths = get_output_file_paths()
        evalResult[key0] = { all: findBestMethod(allPaths.filter(permutation[0][key0])) }

        for (let key1 of Object.keys(permutation[1])) {

            evalResult[key0][key1] = { all: findBestMethod(allPaths.filter(permutation[0][key0]).filter(permutation[1][key1])) }

            for (let key2 of Object.keys(permutation[2])) {

                evalResult[key0][key1][key2] = { all: findBestMethod(allPaths.filter(permutation[0][key0]).filter(permutation[1][key1]).filter(permutation[2][key2])) }

                for (let key3 of Object.keys(permutation[3])) {


                    evalResult[key0][key1][key2][key3] = { all: findBestMethod(allPaths.filter(permutation[0][key0]).filter(permutation[1][key1]).filter(permutation[2][key2]).filter(permutation[3][key3])) }

                    for (let key4 of Object.keys(permutation[4])) {
                        let paths = allPaths.filter(permutation[0][key0]).filter(permutation[1][key1]).filter(permutation[2][key2]).filter(permutation[3][key3]).filter(permutation[4][key4])
                        let result = findBestMethod(paths)
                        evalResult[key0][key1][key2][key3][key4] = result;

                        console.log()
                    }
                }
            }
        }
    }

    fs.writeFileSync("llm_results/"+key+".json", JSON.stringify(evalResult, null, 2))
}
function main() {
    for(let key of Object.keys(filtersPermutations))   {
        create_evaluation(key,filtersPermutations[key])
    }

}
main();



