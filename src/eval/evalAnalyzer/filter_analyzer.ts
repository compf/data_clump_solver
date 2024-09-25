import { all } from "axios";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../context/DataContext";
import { DataClumpLanguageModelFilter } from "../../pipeline/stepHandler/dataClumpFiltering/DataClumpLanguageModelFilter";
import { StubInterface } from "../../util/languageModel/StubInterface";
import { BaseEvaluator, Instance } from "../base_eval";
import { FilterEval } from "../eval_filter";
import { EvalAnalyzer, EvalMetric, getBestFittingDataClump } from "./base_analyzer";
import fs from "fs"
import { resolve } from "path";
import { DataClumpTypeContext } from "data-clumps-type-context";
export class FilterAnalyzer extends EvalAnalyzer {
    getEvaluator(): BaseEvaluator {
        return new FilterEval();
    }
    getMetrics(): EvalMetric[] {
        return [new PositionOnGroundTruthMetric(), new DataClumpSizeMetric()];
    }
}
export class PositionOnGroundTruthMetric implements EvalMetric {
    check(context: DataClumpDetectorContext, filterResults: { [key: string]: any[] }) {
        let reduced: { [key: string]: any[] } = {}
        let allDetected: Set<string> = new Set()
        for (let key of context.getDataClumpKeys()) {
            let dc = context.getDataClumpDetectionResult().data_clumps[key];
            let typeNameKey = context.createDataTypeNameClumpKey(dc)
            allDetected.add(typeNameKey)

        }


        for (let k of Object.keys(filterResults)) {
            if (!(k in reduced)) {
                reduced[k] = []
            }
            reduced[k]=(filterResults[k].filter((v) => allDetected.has(v))).map((it)=>it.name);
            
        }
        return reduced

    }
    async eval(instance: Instance, dirPath: string, context: DataClumpRefactoringContext, parsed:any) {

        let filterResults = JSON.parse(fs.readFileSync(resolve("evalData/filter",(instance as any).projectName,"basicMetrics.json"), { encoding: "utf-8" }).toString())
        let llm = new DataClumpLanguageModelFilter({ handlers: [] } as any)
        for(let f of Object.keys(filterResults)){
            filterResults[f]=filterResults[f].map((it)=>it.name)
        }
        let withNumericIds = llm.simplifyKeys(context.getByType(DataClumpDetectorContext)!.getDataClumpDetectionResult())
        context = context.buildNewContext(new DataClumpDetectorContext(withNumericIds));
       
        let bestFittingDataClump=getBestFittingDataClump(context,[parsed.key,parsed.justification])
        let k=bestFittingDataClump!.dataClump?.key
        if(k==undefined || k==null){
            return {}
        }
        



        let dc = context.getByType(DataClumpDetectorContext)!.getDataClumpDetectionResult().data_clumps[k];
        if(dc==undefined || dc==null){
            return {}
        }
        let key = (context as DataClumpDetectorContext).createDataTypeNameClumpKey(dc)
        let indices={}
        let reason=parsed.reason
        for (let fKey of Object.keys(filterResults) ) {
            let items=filterResults[fKey]
            let index=items.indexOf(key)
            indices[fKey]=index
            if(index!=-1){
            }
        }
        //console.log(key)
        //console.log("filterResults",filterResults)
        return indices
    }
    getName(): string {
        return "PositionOnGroundTruthMetric";
    }

}

class DataClumpSizeMetric implements EvalMetric{
    eval(instance: Instance, dirPath: string, context: DataClumpRefactoringContext,parsed) {
       let bestFittingDataClump = getBestFittingDataClump(context,[parsed.key,parsed.justification])
       if(bestFittingDataClump.dataClump==null){
              return {}
       }
        let size=Object.values(bestFittingDataClump!.dataClump!.data_clump_data).length
        return {"Size":size}
    }
    getName(): string {
        return "DataClumpSizeMetric";
    } 


}