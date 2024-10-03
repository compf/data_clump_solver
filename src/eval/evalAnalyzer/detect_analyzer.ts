import { DataClumpTypeContext } from "data-clumps-type-context/ignoreCoverage/DataClumpTypeContext";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../context/DataContext";
import { BaseEvaluator, Instance } from "../base_eval";
import { DetectEval } from "../eval_detect";
import { compareObjects, EvalAnalyzer, EvalMetric, evaluateBestFittingDataClump, getBestFittingDataClump, getProbabilityCorrectDataClump, InstanceGeneratedData, InvalidJsonMetric, MultipleValuesMetric, statFunctions, Surety } from "./base_analyzer";
import fs from "fs"
import { parseInvalidJSON, tryParseJSON } from "../../util/Utils";
import { DataClumpsTypeContext, Dictionary } from "data-clumps-type-context";
import { DataClumpOccurenceMetric } from "../../pipeline/stepHandler/dataClumpFiltering/DataClumpOccurenceMetric";
export class DetectAnalyzer extends EvalAnalyzer {
    getEvaluator(): BaseEvaluator {
        return new DetectEval();
    }
    getMetrics(): EvalMetric[] {
        let result:EvalMetric[] = [
            new SuretyMetric(),
            new OutputFormatCorrectnessMetric(),
            new InvalidJsonMetric()
        ]

        for(let n of Object.keys(statFunctions)){
            result.push(new DataClumpSizeMetric(statFunctions[n],n))
            result.push(new DataClumpOccurenceMetricEval(statFunctions[n],n))
            result.push(new FieldToFieldMetric(statFunctions[n],n))
            result.push(new ParametersToParametersMetric(statFunctions[n],n))
        }
        return result;
    }
    getName(): string {
        return "Detect"
    }
}

export class SuretyMetric implements EvalMetric {
    async eval(instance: InstanceGeneratedData, context: DataClumpRefactoringContext):Promise<any> {
        console.log("Instance: " + JSON.stringify(instance))
        let parsed = instance.responsesParsed[0]
        if (parsed == undefined || parsed == null || Object.keys(parsed).length == 0) {
            return 0;
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


        /*let inGTButNotInLLM
        =0
        let inLLMButNotInGT=0
        let all=0

        for(let p of Object.keys(pathLineMapGTUnFiltered)){
            if(!(p in pathLineMapGT)){
               continue;
            }
            let linesLLM=pathLineMapLLm[p] ?? new Set()
            let linesGT=pathLineMapGT[p]
            let linesGTUnFiltered=pathLineMapGTUnFiltered[p]

            for(let l of linesGTUnFiltered){

                if (linesGT.has(l) && !linesLLM.has(l)){
                    inGTButNotInLLM++
                    //console.log("False Negative: "+p+":"+l)
                }
                else if(!linesGT.has(l) && linesLLM.has(l)){
                    inLLMButNotInGT++
                    //console.log("False Positive: "+p+":"+l)
                }
                else if (linesGT.has(l)){
                    //console.log("True Positive: "+p+":"+l)
                }
                all++
            }
           
        }
        console.log("Instance: "+JSON.stringify(instance))
        console.log("Sensitivity: "+(1-inGTButNotInLLM/all)*100,"%")
        console.log("Specifity: "+(1-inLLMButNotInGT/all)*100,"%")
        console.log()*/





        //console.log(byLLM)
        //console.log(context)
        let result = counters.match + 0.75 * counters.prettySure - 0.75 * counters.prettyUnsure - counters.miss
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
function getDataClumpTypeContext(instance:InstanceGeneratedData) :DataClumpsTypeContext{
   
    let parsed =instance.responsesParsed[0]
    if (parsed == undefined || parsed == null || Object.keys(parsed).length == 0) {
        return {data_clumps:{}} as any;
    }
    
    return parsed
}
class DataClumpSizeMetric extends MultipleValuesMetric {
  async   evalArray(instance: InstanceGeneratedData, context: DataClumpRefactoringContext):Promise<any[]> {
        let sizes: number[] = []
        let byLLM=Object.values(getDataClumpTypeContext(instance).data_clumps)
        for (let dc of byLLM) {
            dc=getBestFittingDataClump(context,dc).dataClump as any
            if(dc.data_clump_data){
                let s=Object.values(dc.data_clump_data).length
                if(s){
                    sizes.push(s)
    
                }
            }
           
        }
        console.log(sizes)
        if (sizes.length == 0) {
            return[]
        }
        return sizes
    }
    getPrefix(): string {
        return "DataClumpSize"
    }


}

class OutputFormatCorrectnessMetric implements EvalMetric {
   async  eval(instance: any, context: DataClumpRefactoringContext) :Promise<any> {
        let parsed=getDataClumpTypeContext(instance)
        if (parsed == undefined || parsed == null || Object.keys(parsed).length == 0) {
            return 0;
        }
        let counters: { match: number, miss: number } = { match: 0, miss: 0 }
        if ("data_clumps" in parsed) {
            parsed = parsed.data_clumps as any
        }
        else {
            counters.miss = 1
        }
        this.checkCorrectness(parsed, counters)
        return counters.match / (counters.match + counters.miss)
    }
    checkCorrectness(byLLM: any, counters: { match: number, miss: number }) {
        let values=this.checkCorrectnessKey(byLLM,counters)
        for(let v of values){
            this.checkCorrectnessDataClumpOuter(v,counters)
        }
    }
    checkCorrectnessData(byLLM: any, counters: { match: number, miss: number }, template:any, notRelevant:string[]) {
       if(byLLM==null || byLLM==undefined){
            counters.miss++
            return
       }
        for (let key of Object.keys(template)) {
            if (notRelevant.includes(key)) {
                continue;
            }
            if (key in byLLM && typeof byLLM[key] == typeof template[key]) {
                counters.match++
            }
            else {
                counters.miss++
            }
        }
    }
    checkCorrectnessKey(byLLM: any, counters: { match: number, miss: number }):any[] {
        let result:any[]=[]
        if(byLLM==null || byLLM==undefined){
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

        let example=this.exampleDataClump()
        let notRelevantKeys=["type", "probability","key","data_clump_type"]
        this.checkCorrectnessData(byLLM, counters, example, notRelevantKeys)
        let toCheck=this.checkCorrectnessKey(byLLM.data_clump_data,counters)
        for(let dcData of toCheck){
            this.checkCorrectnessLayerDataClumpInner(dcData,counters)
        }
    

    }
   
    checkCorrectnessLayerDataClumpInner(byLLM: any, counters: { match: number, miss: number }) {
        let notRelevantKeys=["key","probability"]
        let example=Object.values(this.exampleDataClump().data_clump_data)[0]
        this.checkCorrectnessData(byLLM, counters, example, notRelevantKeys)
        this.checkCorrectnessDataClumpPosition(byLLM.position,counters)

        this.checkCorrectnessData(byLLM.to_variable,counters,example.to_variable,notRelevantKeys)
        this.checkCorrectnessDataClumpPosition(byLLM.to_variable?.position,counters)
    }
    checkCorrectnessDataClumpPosition(byLLM: any, counters: { match: number, miss: number }) {
        if(byLLM==undefined || byLLM==null){
            counters.miss++
            return
        }
        let example = Object.values(this.exampleDataClump().data_clump_data)[0].position
        let notRelevantKeys=["endLine","endColumn"]
        this.checkCorrectnessData(byLLM, counters, example,notRelevantKeys)
    }


    exampleDataClump(): DataClumpTypeContext {
        return {
            "type": "data_clump",
            "key": "fields_to_fields_data_clump-src\\main\\java\\org\\example\\MathUser.java-org.example.MathUser-org.example.MathStuff-exponentsignmantissa",
            "probability": 1,
            "from_file_path": "src\\main\\java\\org\\example\\MathUser.java",
            "from_class_or_interface_name": "MathUser",
            "from_class_or_interface_key": "org.example.MathUser",
            "from_method_name": null,
            "from_method_key": null,
            "to_file_path": "src\\main\\java\\org\\example\\MathStuff.java",
            "to_class_or_interface_key": "org.example.MathStuff",
            "to_class_or_interface_name": "MathStuff",
            "to_method_key": null,
            "to_method_name": null,
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


class DataClumpOccurenceMetricEval extends MultipleValuesMetric{
    async evalArray(instance: any, context: DataClumpRefactoringContext): Promise<any[]> {
        let values:number[]=[]
        let parsed=getDataClumpTypeContext(instance)
        if (parsed == undefined || parsed == null || Object.keys(parsed).length == 0 || parsed.data_clumps==undefined) {
            return [];
        }

        let byLLM = Object.values(parsed.data_clumps) as DataClumpTypeContext[]
        let dcOccurenceMetric=new DataClumpOccurenceMetric()
       
        for (let dc of byLLM) {
            dc=getBestFittingDataClump(context,dc).dataClump as any
            if(dc==null){
                continue;
            }
            console.log(dc)
            dcOccurenceMetric.evaluate(dc,context).then((result)=>{
                values.push(result)
            })
        }
        if (values.length == 0) {
            return[]
        }
        return values
    }
    getPrefix(): string {
        return "DataClumpOccurence"
    }
}

class FieldToFieldMetric extends MultipleValuesMetric{
   async  evalArray(instance: any, context: DataClumpRefactoringContext): Promise<any[]> {
        let values: number[] = []
        let parsed=getDataClumpTypeContext(instance)
        if (parsed == undefined || parsed == null || Object.keys(parsed).length == 0) {
            return [];
        }

        let byLLM = Object.values(parsed.data_clumps) as DataClumpTypeContext[]
       
        for (let dc of byLLM) {
           if(dc.from_method_name==null && dc.to_method_name==null){
                values.push(1)
           }
           else{
                values.push(0)
           }
        }
        if (values.length == 0) {
            return[]
        }
        return values
    }
    getPrefix(): string {
        return "FieldToField"
    }
}

class ParametersToParametersMetric extends MultipleValuesMetric{
    async evalArray(instance: any, context: DataClumpRefactoringContext): Promise<any[]> {
        let values: number[] = []
        let parsed=getDataClumpTypeContext(instance)
        if (parsed == undefined || parsed == null || Object.keys(parsed).length == 0) {
            return [];
        }

        let byLLM = Object.values(parsed.data_clumps) as DataClumpTypeContext[]
       
        for (let dc of byLLM) {
           if(dc.from_method_name!=null && dc.to_method_name!=null){
                values.push(1)
           }
           else{
                values.push(0)
           }
        }
        if (values.length == 0) {
            return[]
        }
        return values
    }
    getPrefix(): string {
        return "ParametersToParameters"
    }
}
