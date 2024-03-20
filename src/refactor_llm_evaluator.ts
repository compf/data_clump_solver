import { DataClumpsTypeContext } from "data-clumps-type-context";
import fs from "fs"
import { dirname } from "node:path"
import { resolve } from "path";
import { createHash } from 'node:crypto'
import { getRelevantFilesRec, waitSync } from "./util/Utils";
import { ASTBuildingContext, CodeObtainingContext, DataClumpRefactoringContext, FileFilteringContext, ValidationContext } from "./context/DataContext";
import { ChatMessage } from "./util/languageModel/LanguageModelInterface";
import { DataClumpDoctorASTGeneratorStep } from "./pipeline/stepHandler/astGeneration/DataClumpDoctorASTGeratorStep";
import { AST_Class, AST_Type } from "./context/AST_Type";
import { GradleBuildValidationStepHandler } from "./pipeline/stepHandler/validation/GradleBuildValidationStepHandler";
import { PipeLineStep } from "./pipeline/PipeLineStep";




function get_output_file_paths(): string[] {
    let result = []
    getRelevantFilesRec("llm_results/refactor", result, new FileFilteringContext(["*output.json"], []))
    return result;
}
function parse_chat_file(path: string) {

    let chat = JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }))

    return chat[chat.length - 1]


}
const groundTruthPath = "llm_results/ground_truth_refactor"
let groundTruthPaths: string[] = []
getRelevantFilesRec(groundTruthPath, groundTruthPaths, new FileFilteringContext(["*.json"], []))
let groundTtruthContext = new ASTBuildingContext()
console.log(groundTruthPaths.length)
for (let path of groundTruthPaths) {
    groundTtruthContext.load(path)
    console.log("loaded", path)
}
async function evaluateData(paths: string[]) {
    const baseFolder = "llm_results/evaluatorTest"
    const outPath = "llm_results/evalJSON"
    const sourceLocation = "src/main/java/org/example/"
    let evalResult = { reachedPoints: 0, allPoints: 0, percentage: 0, success: true }
    for (let path of paths) {
        evalResult[path] = {}
        console.log(path)
        let contents = parse_chat_file(path)["messages"][0]
        for (let fName of fs.readdirSync(resolve(baseFolder, sourceLocation))) {
            fs.rmSync(resolve(baseFolder, sourceLocation, fName), { recursive: true })

        }
        waitSync(1000)
        console.log("deleted")
        let breakingErrorDetected = false;
        for (let sourceCodeFile of Object.keys(contents)) {
            if (!contents[sourceCodeFile].includes("{")) {
                // never a valid source code file
                evalResult.success = false;
                breakingErrorDetected = true;
                break
            }
            let pathToSave = sourceCodeFile
            if (sourceCodeFile.startsWith("org.example.")) {
                pathToSave = sourceCodeFile.replace("org.example.", sourceLocation)
            }
            fs.mkdirSync((resolve(baseFolder, dirname(pathToSave))), { recursive: true })
            fs.writeFileSync(resolve(baseFolder, pathToSave), contents[sourceCodeFile])


        }

        waitSync(1000)
        if (!breakingErrorDetected) {
            console.log("written")
            let astGenerator = new DataClumpDoctorASTGeneratorStep(outPath);
            let compareContext = await astGenerator.handle(PipeLineStep.ASTGeneration,new CodeObtainingContext(baseFolder), null)
            console.log("created AST")
            let comparisonResult = compareAllASTOutputsWithGroundTruth(compareContext as ASTBuildingContext, groundTtruthContext);
            console.log("compared")

            evalResult[path]["source_files"] = {}
            for (let sourceCodeFile of Object.keys(contents)) {
                evalResult[path]["source_files"][sourceCodeFile] = contents[sourceCodeFile].split("\n")
            }

            waitSync(1000)
            let validator = new GradleBuildValidationStepHandler({});
            let result = await validator.handle(PipeLineStep.Validation,compareContext, null) as ValidationContext
            evalResult["reachedPoints"] += (result.validationResult.success ? comparisonResult.counter : 0)
            evalResult["allPoints"] += comparisonResult.allCounter
            evalResult["percentage"] = 100 * evalResult["reachedPoints"] / evalResult["allPoints"]
            console.log(result.validationResult.success)
            evalResult[path]["validation"] = result.validationResult;
            evalResult.success = evalResult.success && result.validationResult.success;
        }


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
function std(array: number[]) {
    let mean = array.reduce((a, b) => a + b, 0) / array.length
    let variance = array.map((x) => (x - mean) ** 2).reduce((a, b) => a + b, 0) / array.length
    return Math.sqrt(variance)
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
    //"PairOfFileAndSingle": (x: string) => x.includes("PairOfFileAndSingle")
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
const validationFilters = {
    "success": (x: string) => x.includes("true"),
    "failure": (x: string) => x.includes("false"),
}
const trueFilter = {
    "true": (x: string) => true
}
function getName(filters: any): string {
    if (filters == dataTypeFilters) {
        return "dataType"
    }
    if (filters == dataSizeFilters) {
        return "dataSize"
    }
    if (filters == apiFilters) {
        return "api"
    }
    if (filters == temperatureFilters) {
        return "temp"
    }
    if (filters == instructionFilters) {
        return "instr"
    }
    if (filters == validationFilters) {
        return "validation"
    }
    if (filters == trueFilter) {
        return "true"
    }
    return ""

}
const numberFilters = [apiFilters, temperatureFilters, instructionFilters, dataTypeFilters, dataSizeFilters].length;
function fillUp(array: any[]) {
    while (array.length < numberFilters) {
        array.push(trueFilter)
    }
    return array
}
let filtersPermutations = {
    "api_temp_instr_dataType_data_Size": [apiFilters, temperatureFilters, instructionFilters, dataTypeFilters, dataSizeFilters],
    "dataSize_dataType_instr_temp_api": [apiFilters, temperatureFilters, instructionFilters, dataTypeFilters, dataSizeFilters].reverse(),
    "validation": fillUp([validationFilters]),
    "validation_instType": fillUp([validationFilters, instructionFilters]),
    "instType_validation": fillUp([instructionFilters, validationFilters]),
    "instType": fillUp([instructionFilters]),
    "validation_temp": fillUp([validationFilters, temperatureFilters]),
    "temp_validation": fillUp([temperatureFilters, validationFilters]),
    "validation_api": fillUp([validationFilters, apiFilters]),
    "api_validation": fillUp([apiFilters, validationFilters]),
}
let allFilters = {
    "api": apiFilters,
    "temp": temperatureFilters,
    "instr": instructionFilters,
    "dataType": dataTypeFilters,
    "dataSize": dataSizeFilters,

}

async function create_evaluation(allPaths: string[], key: string, permutation: any[], flat_obj: any | undefined) {
    let evalResult = {}
    let _evaluateData = evaluateData
    if (flat_obj != undefined) {
        _evaluateData = async function (paths: string[]) {
            return Promise.resolve(evaluateBasicData(paths, flat_obj))
        }
    }

    for (let key0 of Object.keys(permutation[0])) {


        evalResult[key0] = { all: await _evaluateData(allPaths.filter(permutation[0][key0])) }
        for (let key1 of Object.keys(permutation[1])) {

            evalResult[key0][key1] = { all: await _evaluateData(allPaths.filter(permutation[0][key0]).filter(permutation[1][key1])) }
            for (let key2 of Object.keys(permutation[2])) {

                evalResult[key0][key1][key2] = { all: await _evaluateData(allPaths.filter(permutation[0][key0]).filter(permutation[1][key1]).filter(permutation[2][key2])) }
                for (let key3 of Object.keys(permutation[3])) {


                    evalResult[key0][key1][key2][key3] = { all: await _evaluateData(allPaths.filter(permutation[0][key0]).filter(permutation[1][key1]).filter(permutation[2][key2]).filter(permutation[3][key3])) }
                    for (let key4 of Object.keys(permutation[4])) {
                        let paths = allPaths.filter(permutation[0][key0]).filter(permutation[1][key1]).filter(permutation[2][key2]).filter(permutation[3][key3]).filter(permutation[4][key4])

                        let result = await _evaluateData(paths)
                        evalResult[key0][key1][key2][key3][key4] = result;

                    }
                }
            }
        }
    }
    fs.writeFileSync("llm_results/detectAndRefactor/refactorResults_" + key + ".json", JSON.stringify(evalResult, null, 2))

}
function evaluateBasicData(paths: string[], flat_obj: any | undefined) {
    let evalResult = { reachedPoints: 0, allPoints: 0, percentage: 0, success: true, counter: 0 }
    for (let path of paths) {
        console.log(path)

        evalResult[path] = flat_obj[path]
        evalResult["reachedPoints"] += flat_obj[path].reachedPoints
        evalResult["allPoints"] += flat_obj[path].allPoints
        evalResult["percentage"] = 100 * evalResult["reachedPoints"] / evalResult["allPoints"]
        evalResult["counter"]++;
        console.log(evalResult)
    }
    return evalResult
}
async function create_flat_evaluation() {
    let result = {}
    let allPaths = get_output_file_paths()
    let basicEvalResult = {}
    let sums = {}
    let totalSum = 0;

    //let evalResult = {all:_evaluateData(allPaths)}

    for (let p of allPaths) {
        let data = await evaluateData([p])
        let key = data.success + "/" + p
        result[key] = {
            "reachedPoints": data.reachedPoints,
            "allPoints": data.allPoints,
            "percentage": data.percentage,
            "success": data.success,
            "originalPath": p
        }




    }




    fs.writeFileSync("llm_results/detectAndRefactor/refactor_flat" + ".json", JSON.stringify(result, null, 2))
}
enum Mode { Full, Flat, Basic }
let mode = Mode.Basic;
async function main() {

    if (mode == Mode.Full) {
        for (let key of Object.keys(filtersPermutations)) {

            await create_evaluation(get_output_file_paths(), key, filtersPermutations[key], undefined)

        }
    }
    else if (mode == Mode.Flat) {

        await create_flat_evaluation()

    }
    else if (mode == Mode.Basic) {

        let flat_obj = JSON.parse(fs.readFileSync("llm_results/detectAndRefactor/refactor_flat.json", { encoding: "utf-8" }))
        for (let filterType of Object.keys(allFilters)) {
            let result = {}
            for (let filterKey of Object.keys(allFilters[filterType])) {
                result[filterKey] = { mean: 0, median: 0, std: 0, values: [] }
                for (let jsonKey of Object.keys(flat_obj)) {
                    if (flat_obj[jsonKey].originalPath.includes(filterKey)) {
                        result[filterKey].values.push(flat_obj[jsonKey].percentage)
                    }
                }
                result[filterKey].median = median(result[filterKey].values)
                result[filterKey].mean = mean(result[filterKey].values)
                result[filterKey].std = std(result[filterKey].values)
            }
            fs.writeFileSync("llm_results/detectAndRefactor/refactor_" + filterType + ".json", JSON.stringify(result, null, 2))
           

        }
    }


}
if(require.main==module){
    main();

}


type SimiliarityInfo = {
    counter: number,
    allCounter: number,
    logs: string[]
}
function getGroundTruthClass(key: string, groundTruthContext: ASTBuildingContext): AST_Class | null {
    const prefix = "src/main/java/org/example/"
    if (key.includes("BetterMathStuff")) {
        return groundTruthContext.getByPath(prefix + "BetterMathStuff.java")
    }
    else if (key.includes("MathStuff")) {
        return groundTruthContext.getByPath(prefix + "MathStuff.java")
    }
    else if (key.includes("Main")) {
        return groundTruthContext.getByPath(prefix + "Main.java")
    }
    else if (key.includes("MathUser")) {
        return groundTruthContext.getByPath(prefix + "MathUser.java")
    }
    else if (key.includes("Library")) {
        return groundTruthContext.getByPath(prefix + "Library.java")
    }
    return null;
}
const PENALTY_BOTH_CLASSES_NOT_EXISTS = 20
const PENALTY_ONE_CLASS_NOT_EXISTS = 10;
const PENALTY_NOT_CORRECTLY_REFACTORD = 5;
function compareAllASTOutputsWithGroundTruth(astContext: ASTBuildingContext, groundTtruthContext: ASTBuildingContext) {
    let similiarities: SimiliarityInfo = { counter: 0, allCounter: 0, logs: [] }
    let bothDataClassesExist = true;
    let oneNewClassFound = false;
    for (let key of astContext.getKeys()) {
        let astClass = astContext.getByPath(key)
        let groundTruthClass = getGroundTruthClass(key, groundTtruthContext)
        if (groundTruthClass == null) {
            oneNewClassFound = true;
            bothDataClassesExist = bothDataClassesExist && analyzeDataClass(similiarities, astClass);
            console.log("Could not find equivalent ground truth for " + key)
            continue;
        }
        compareSingleASTOutputWithGroundTruth(similiarities, astClass, groundTruthClass)

    }
    increaseCounterIf("Only one class does not exists", similiarities, () => !bothDataClassesExist && oneNewClassFound, PENALTY_ONE_CLASS_NOT_EXISTS);
    increaseCounterIf("Both data classes do not exist", similiarities, () => bothDataClassesExist && oneNewClassFound, PENALTY_BOTH_CLASSES_NOT_EXISTS);
    console.log("Similiarity", 100 * similiarities.counter / similiarities.allCounter, "%")
    return similiarities
}
const pointTypes = ["int", "int", "int"]
const pointNames = ["x", "y", "z"]
const floatingPointTypes = ["boolean", "double", "int"]
const floatingPointNames = ["exponent", "mantissa", "sign"]
const pointGetters = ["getX", "getY", "getZ"]
const pointSetters = ["setX", "setY", "setZ"]
const floatingPointGetters = ["getExponent", "getMantissa", "getSign"]
const floatingPointSetters = ["setExponent", "setMantissa", "setSign"]

function analyzeDataClass(similiarities: SimiliarityInfo, astClass: AST_Class): boolean {
    let fields = Object.values(astClass.fields)
    let fieldNames = fields.map(it => it.name).sort();
    let fieldTypes = fields.map(it => it.type).sort();
    console.log(fieldNames)
    let pointClassExists = false;
    let floatingNumberClassExists = false;
    for (let i = 0; i < fieldNames.length; i++) {
        let isPointClass = fieldNames.length == pointNames.length && fieldNames[i] == pointNames[i] && fieldTypes[i] == pointTypes[i];
        let isFloatingPointClass = fieldNames.length == floatingPointNames.length && fieldNames[i] == floatingPointNames[i] && fieldTypes[i] == floatingPointTypes[i];
        increaseCounterIf("fields different" + " " + fieldTypes[i] + " " + fieldNames[i], similiarities, () => isPointClass || isFloatingPointClass, PENALTY_NOT_CORRECTLY_REFACTORD);
        pointClassExists = pointClassExists || isPointClass;
        floatingNumberClassExists = floatingNumberClassExists || isFloatingPointClass;

    }

    return pointClassExists || floatingNumberClassExists;

}
function compareSingleASTOutputWithGroundTruth(similiarities: SimiliarityInfo, astClass: AST_Class, groundTruthClass: AST_Class) {
    increaseCounterIf("Different class names " + astClass.name + " vs " + groundTruthClass.name, similiarities, () => astClass.name == groundTruthClass.name, PENALTY_NOT_CORRECTLY_REFACTORD);
    increaseCounterIf("Different method count " + astClass.methods.length + " vs " + groundTruthClass.methods.length, similiarities, () => astClass.methods.length == groundTruthClass.methods.length, PENALTY_NOT_CORRECTLY_REFACTORD);
    increaseCounterIf("Different field count " + astClass.fields.length + " vs " + groundTruthClass.fields.length, similiarities, () => astClass.fields.length == groundTruthClass.fields.length, PENALTY_NOT_CORRECTLY_REFACTORD);
    console.log(astClass.name)
    let methodsFromLLM = Object.values(astClass.methods)
    let methodsFromGroundTruth = Object.values(groundTruthClass.methods)
    for (let m1 of methodsFromLLM) {
        console.log(m1.name)
        let m2 = methodsFromGroundTruth.find(it => m1.name == it.name)
        if (m2 == null) {
            console.log("Additional method " + m1.name)
            continue;
        }
        increaseCounterIf("Different method parameters " + m1.parameters.length + " vs " + m2.parameters.length, similiarities, () => m1.parameters.length == m2!.parameters.length, PENALTY_NOT_CORRECTLY_REFACTORD);
    }


}

function increaseCounterIf(description: string, similiarities: SimiliarityInfo, predicate: () => boolean, penalty: number) {
    if (predicate()) {
        similiarities.counter += penalty
    } else {
        similiarities.logs.push(description)
    }
    similiarities.allCounter += penalty;
}


