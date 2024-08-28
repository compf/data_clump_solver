import { DataClumpTypeContext } from "data-clumps-type-context/ignoreCoverage/DataClumpTypeContext";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../context/DataContext";
import { BaseEvaluator, Instance } from "../base_eval";
import { DetectEval } from "../eval_detect";
import { EvalAnalyzer, EvalMetric } from "./base_analyzer";
import fs from "fs"
export class DetectAnalyzer extends EvalAnalyzer {
    getEvaluator(): BaseEvaluator {
        return new DetectEval();
    }
    getMetrics(): EvalMetric[] {
        return [new SensitivitySpecifityMetric()];
    }
}
export class SensitivitySpecifityMetric implements EvalMetric {
    eval(instance: Instance, dirPath: String, context: DataClumpRefactoringContext) {
        
        let detectionResult = JSON.parse(fs.readFileSync(dirPath + "/detectResult.json", { encoding: "utf-8" }))

        let byLLM = Object.values(JSON.parse(detectionResult.messages[0]).data_clumps) as DataClumpTypeContext[]
        let groundTruthUnFiltered = Object.values(context.getFirstByType(DataClumpDetectorContext)!.getDataClumpDetectionResult().data_clumps)
        let groundTruthFiltered = Object.values(context.getByType(DataClumpDetectorContext)!.getDataClumpDetectionResult().data_clumps)


        let pathLineMapLLm=this.createPathLineMap(byLLM)
        let pathLineMapGT=this.createPathLineMap(groundTruthFiltered)
        let pathLineMapGTUnFiltered=this.createPathLineMap(groundTruthUnFiltered)

        let inGTButNotInLLM=0
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
        console.log()

    

        

        //console.log(byLLM)
        //console.log(context)
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
        return "stub";
    }

}