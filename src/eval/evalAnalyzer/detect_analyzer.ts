import { DataClumpTypeContext } from "data-clumps-type-context/ignoreCoverage/DataClumpTypeContext";
import { DataClumpRefactoringContext } from "../../context/DataContext";
import { BaseEvaluator } from "../base_eval";
import { DetectEval } from "../eval_detect";
import { addDataClumpSpecificMetrics, EvalAnalyzer, EvalMetric, evaluateBestFittingDataClump, getBestFittingDataClump, InstanceGeneratedData, InvalidJsonMetric, logMetric } from "./base_analyzer";
import fs from "fs"
import { resolve } from "path"
import { DataClumpsTypeContext } from "data-clumps-type-context";
import simpleGit from "simple-git";
import { EvalDetectSyn } from "../eval_detect_syn";
export class DetectAnalyzer extends EvalAnalyzer {
    getEvaluator(): BaseEvaluator {
        return new DetectEval();
    }
    getMetrics(): EvalMetric[] {
        let result: EvalMetric[] = [
            new SuretyMetric(),
            new NumberOfDataClumpsDetected(),
            new OutputFormatCorrectnessMetric(),
            new InvalidJsonMetric()
        ]
        addDataClumpSpecificMetrics(result)

        return result;
    }
    getName(): string {
        return "detect"
    }
    getDataClumps(instance: InstanceGeneratedData, context: DataClumpRefactoringContext): DataClumpTypeContext[] {
        let parsed = getDataClumpTypeContext(instance)
        if (Array.isArray(parsed)) {
            parsed = parsed[0]
        }
        if (parsed == undefined || parsed == null || Object.keys(parsed).length == 0 || parsed.data_clumps == undefined) {
            return [];
        }
        let dataClumps: DataClumpTypeContext[] = []
        for (let dcOrigin of Object.values(parsed.data_clumps)) {
            let dc = getBestFittingDataClump(context, dcOrigin)
            if (dc.dataClump) {
                dataClumps.push(dc.dataClump)

            }
        }

        return dataClumps
    }
}

class SuretyMetric implements EvalMetric {
    async eval(instance: InstanceGeneratedData, context: DataClumpRefactoringContext): Promise<any> {
        console.log("Instance: " + JSON.stringify(instance))
        let parsed = instance.responsesParsed[0]
        if (parsed == undefined || parsed == null || Object.keys(parsed).length == 0) {
            return null;
        }
        if (Array.isArray(parsed)) {
            parsed = parsed[0]
        }
        let byLLM = parsed.data_clumps


        const THRESHOLD_MATCH = 0.9
        const THRESHOLD_MISS = 0.2

        let fullCounter = 0;
        let noCounter = 0;
        let unsureCounter = 0;
        let allCounter = 0;

        let counters = {
            "match": 0,
            "prettySure": 0,
            "prettyUnsure": 0,
            "miss": 0
        }
        for (let llmDC of Object.values(byLLM)) {
            let category = evaluateBestFittingDataClump(context, llmDC as DataClumpTypeContext)
            counters[category] = (counters[category] ?? 0) + 1
            allCounter++

        }


        console.log(counters)
        console.log()
        let result = counters.match + 0.75 * counters.prettySure - 1.25 * counters.prettyUnsure - 2 * counters.miss
        logMetric(this, {
            result,
            counters
        })
        return result
    }
    createPathLineMap(dataClump: DataClumpTypeContext[]) {
        let result: { [key: string]: Set<number> } = {}

        for (let dc of dataClump) {

            let relevantData = [
                {
                    path: dc.from_file_path,
                    lines: new Set(Object.values(dc.data_clump_data).map((it) => it.position.startLine))
                },
                {
                    path: dc.to_file_path,
                    lines: new Set(Object.values(dc.data_clump_data).map((it) => it.to_variable.position.startLine))
                }
            ]

            for (let relevant of relevantData) {
                if (!(relevant.path in result)) {
                    result[relevant.path] = new Set()
                }
                for (let line of relevant.lines) {
                    result[relevant.path].add(line)
                }
            }
        }
        return result
    }
    getName(): string {
        return "Surety";
    }

}
class NumberOfDataClumpsDetected implements EvalMetric {
    async eval(instance: InstanceGeneratedData, context: DataClumpRefactoringContext, analyzer?: EvalAnalyzer): Promise<any> {
        let dataClumps = analyzer!.getDataClumps(instance, context).length
        return dataClumps

    }
    getName(): string {
        return "Number data clumps"
    }

}
function getDataClumpTypeContext(instance: InstanceGeneratedData): DataClumpsTypeContext {

    let parsed = instance.responsesParsed[0]
    if (parsed == undefined || parsed == null || Object.keys(parsed).length == 0) {
        return { data_clumps: {} } as any;
    }

    return parsed
}

class OutputFormatCorrectnessMetric implements EvalMetric {
    async eval(instance: any, context: DataClumpRefactoringContext): Promise<any> {
        let parsed = getDataClumpTypeContext(instance)
        if (parsed == undefined || parsed == null || Object.keys(parsed).length == 0) {
            return null;
        }
        let counters: { match: number, miss: number } = { match: 0, miss: 0 }
        if ("data_clumps" in parsed) {
            parsed = parsed.data_clumps as any
        }
        else {
            counters.miss = 1
        }
        this.checkCorrectness(parsed, counters)
        logMetric(this, {
            counters,
            parsed
        }
        )
        if(counters.match+counters.miss==0){
            return 0;
        }
        return counters.match / (counters.match + counters.miss)
    }
    checkCorrectness(byLLM: any, counters: { match: number, miss: number }) {
        let values = this.checkCorrectnessKey(byLLM, counters)
        for (let v of values) {
            this.checkCorrectnessDataClumpOuter(v, counters)
        }
    }
    checkCorrectnessData(byLLM: any, counters: { match: number, miss: number }, template: any, notRelevant: string[], optional: string[]) {
        if (byLLM == null || byLLM == undefined) {
            counters.miss++
            return
        }
        for (let key of Object.keys(template)) {
            if (notRelevant.includes(key)) {
                continue;
            }
            if (key in byLLM && typeof byLLM[key] == typeof template[key] || optional.includes(key) && (byLLM[key] == null || byLLM[key] == undefined)) {
                counters.match++
            }
            else {

                counters.miss++
            }
        }
    }
    checkCorrectnessKey(byLLM: any, counters: { match: number, miss: number }): any[] {
        let result: any[] = []
        if (byLLM == null || byLLM == undefined) {
            counters.miss++
            return []
        }
        for (let key of Object.keys(byLLM)) {
            if ("key" in byLLM[key] && key == byLLM[key].key) {
                counters.match++
            }
            else {

                counters.miss++
            }
            result.push(byLLM[key])
        }
        return result
    }

    checkCorrectnessDataClumpOuter(byLLM: any, counters: { match: number, miss: number }) {

        let example = this.exampleDataClump()
        let notRelevantKeys = ["type", "probability", "key", "data_clump_type"]
        let optional = ["from_method_name",
            "from_method_key",
            "to_method_key",
            "to_method_name"]
        this.checkCorrectnessData(byLLM, counters, example, notRelevantKeys, optional)
        let toCheck = this.checkCorrectnessKey(byLLM.data_clump_data, counters)
        for (let dcData of toCheck) {
            this.checkCorrectnessLayerDataClumpInner(dcData, counters)
        }


    }

    checkCorrectnessLayerDataClumpInner(byLLM: any, counters: { match: number, miss: number }) {
        let notRelevantKeys = ["key", "probability", "modifiers"]
        let example = Object.values(this.exampleDataClump().data_clump_data)[0]
        this.checkCorrectnessData(byLLM, counters, example, notRelevantKeys, [])
        this.checkCorrectnessDataClumpPosition(byLLM.position, counters)

        this.checkCorrectnessData(byLLM.to_variable, counters, example.to_variable, notRelevantKeys, [])
        this.checkCorrectnessDataClumpPosition(byLLM.to_variable?.position, counters)
    }
    checkCorrectnessDataClumpPosition(byLLM: any, counters: { match: number, miss: number }) {
        if (byLLM == undefined || byLLM == null) {
            counters.miss++
            return
        }
        let example = Object.values(this.exampleDataClump().data_clump_data)[0].position
        let notRelevantKeys = ["endLine", "endColumn"]
        this.checkCorrectnessData(byLLM, counters, example, notRelevantKeys, [])
    }


    exampleDataClump(): DataClumpTypeContext {
        return {
            "type": "data_clump",
            "key": "fields_to_fields_data_clump-src\\main\\java\\org\\example\\MathUser.java-org.example.MathUser-org.example.MathStuff-exponentsignmantissa",
            "probability": 1,
            "from_file_path": "src\\main\\java\\org\\example\\MathUser.java",
            "from_class_or_interface_name": "MathUser",
            "from_class_or_interface_key": "org.example.MathUser",
            "from_method_name": "",
            "from_method_key": "",
            "to_file_path": "src\\main\\java\\org\\example\\MathStuff.java",
            "to_class_or_interface_key": "org.example.MathStuff",
            "to_class_or_interface_name": "MathStuff",
            "to_method_key": "",
            "to_method_name": "",
            "data_clump_type": "fields_to_fields_data_clump",
            "data_clump_data": {
                "org.example.MathUser/memberField/exponent": {
                    "key": "org.example.MathUser/memberField/exponent",
                    "name": "exponent",
                    "type": "int",
                    "probability": 1,
                    "modifiers": [
                        "PRIVATE"
                    ],
                    "position": {
                        "startLine": 6,
                        "startColumn": 17,
                        "endLine": 6,
                        "endColumn": 25
                    },
                    "to_variable": {
                        "key": "org.example.MathStuff/memberField/exponent",
                        "name": "exponent",
                        "type": "int",
                        "modifiers": [
                            "PRIVATE"
                        ],
                        "position": {
                            "startLine": 6,
                            "startColumn": 17,
                            "endLine": 6,
                            "endColumn": 25
                        }
                    },
                }

            }

        }
    }



    getName(): string {
        return "OutputFormatCorrectness"
    }

}

export class DetectSynAnalyzer extends DetectAnalyzer {
    getName(): string {
        return "detectSyn"
    }
    getMetrics(): EvalMetric[] {
        let metrics = super.getMetrics();
        metrics.push(new SimilarVariableMetric("typo"))
        metrics.push(new SimilarVariableMetric("synonym"))
        metrics.push(new SimilarVariableMetric("type"))
        return metrics
    }
    getEvaluator(): BaseEvaluator {
        return new EvalDetectSyn()
    }
}
let allChanges = {}

class SimilarVariableMetric implements EvalMetric {
    constructor(private cause: string) { }
    getName(): string {
        return "cause=" + this.cause;
    }
    async eval(instance: InstanceGeneratedData, context: DataClumpRefactoringContext, analyzer?: EvalAnalyzer): Promise<any> {
        let dataClumps = Object.values( getDataClumpTypeContext(instance).data_clumps)
        if (!(context.getProjectPath() in allChanges)) {
            let git = simpleGit(context.getProjectPath())
            await git.checkout("contextSyn")
            allChanges[context.getProjectPath()] = JSON.parse(fs.readFileSync(resolve(context.getProjectPath(), "changes.json")).toString()).changes

        }
        let counter = 0;
        let allCounter=0;
        let changes = allChanges[context.getProjectPath()].filter((it)=>it.type==this.cause)
        for (let dc of dataClumps) {
            for (let c of changes) {
                if (c.path == dc.from_file_path || c.path == dc.to_file_path) {
                    let matches=Object.values(dc.data_clump_data).filter((it) => (it.name == changes.newName || 
                    it.to_variable.name == c.newName) && it.name!=it.to_variable.name ||
                    (it.type == c.newType || it.to_variable.type == c.newType) && it.type!=it.to_variable.type)

                    if (matches.length>0) {
                            counter++;

                    }
                    
                }
            }
        }
        return counter


    }
}


