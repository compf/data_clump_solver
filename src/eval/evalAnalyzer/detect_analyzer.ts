import { DataClumpTypeContext } from "data-clumps-type-context/ignoreCoverage/DataClumpTypeContext";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../context/DataContext";
import { BaseEvaluator, Instance } from "../base_eval";
import { DetectEval } from "../eval_detect";
import { compareObjects, EvalAnalyzer, EvalMetric, evaluateBestFittingDataClump, getBestFittingDataClump, getProbabilityCorrectDataClump, Surety } from "./base_analyzer";
import fs from "fs"
export class DetectAnalyzer extends EvalAnalyzer {
    getEvaluator(): BaseEvaluator {
        return new DetectEval();
    }
    getMetrics(): EvalMetric[] {
        return [new SuretyMetric(),new DataClumpSizeMetric()];
    }
}

export class SuretyMetric implements EvalMetric {
    eval(instance: Instance, dirPath: string, context: DataClumpRefactoringContext, parsed:any){
        console.log("Instance: "+JSON.stringify(instance))
        let byLLM = parsed.data_clumps
        

        const THRESHOLD_MATCH=0.9
        const THRESHOLD_MISS=0.2
    
        let fullCounter=0;
        let noCounter=0;
        let unsureCounter=0;
        let allCounter=0;

        let counters={
            "match":0,
            "prettySure":0,
            "prettyUnsure":0,
            "miss":0
        }
        for(let llmDC of byLLM){
            let category=evaluateBestFittingDataClump(context,llmDC)
           counters[category]=(counters[category] ?? 0)+1
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
        return counters
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

export class DataClumpSizeMetric implements EvalMetric{
    eval(instance: Instance, dirPath: string, context: DataClumpRefactoringContext,parsed) {
        let sizes:number[]=[]
        let byLLM = Object.values(parsed.data_clumps) as DataClumpTypeContext[]
        for(let dc of byLLM){
            sizes.push(Object.values(dc.data_clump_data).length)
        }
        console.log(sizes)
        return sizes
    }
    getName(): string {
        return "DataClumpSizeMetric";
    } 


}