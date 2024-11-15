import { all } from "axios";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../context/DataContext";
import { DataClumpLanguageModelFilter } from "../../pipeline/stepHandler/dataClumpFiltering/DataClumpLanguageModelFilter";
import { StubInterface } from "../../util/languageModel/StubInterface";
import { BaseEvaluator, Instance } from "../base_eval";
import { FilterEval } from "../eval_filter";
import { addDataClumpSpecificMetrics, DataClumpBasedMetric, EvalAnalyzer, EvalMetric, evaluateBestFittingDataClump, getBestFittingDataClump, InstanceGeneratedData, InvalidJsonMetric, logMetric } from "./base_analyzer";
import fs from "fs"
import { resolve } from "path";
import { DataClumpTypeContext } from "data-clumps-type-context";
import { tryParseJSON } from "../../util/Utils";
import { DataClumpOccurenceMetric } from "../../pipeline/stepHandler/dataClumpFiltering/DataClumpOccurenceMetric";
import { statFunctions } from "./utils";
const reasons=[
    "size" ,
    "occurrence" ,
    "affected_files" ,
    "domain" ,
    "other",
]
export class FilterAnalyzer extends EvalAnalyzer {
    getEvaluator(): BaseEvaluator {
        return new FilterEval();
    }
    getMetrics(): EvalMetric[] {
        let metrics:EvalMetric[]= [
            new InvalidJsonMetric(), new SuretyMetric()
        ];
        for(let r of reasons){
            metrics.push(new ReasonMetric(r))
        }
        metrics.push(new PositionOnGroundTruthMetric());
  
       addDataClumpSpecificMetrics(metrics)
       //metrics=[new ReasonMetric("domain")]
        return metrics
    }

    getName(): string {
        return "filter"
    }
     getDataClumps(instance: InstanceGeneratedData, context: DataClumpRefactoringContext): DataClumpTypeContext[] {
        let parsed = instance.responsesParsed[0]
        if(parsed==undefined || parsed==null || Object.keys(parsed).length==0){
            return [];
        }
        let llm = new DataClumpLanguageModelFilter({ handlers: [] } as any)

        let withNumericIds = llm.simplifyKeys(context.getByType(DataClumpDetectorContext)!.getDataClumpDetectionResult())

        context = context.buildNewContext(new DataClumpDetectorContext(withNumericIds));

       let bestFittingDataClump = getBestFittingDataClump(context,[parsed.key,parsed.justification])
       if(bestFittingDataClump.dataClump==null || bestFittingDataClump.dataClump==undefined){
              return []
       }
       return[bestFittingDataClump.dataClump]
    }
}
export class PositionOnGroundTruthMetric extends DataClumpBasedMetric {

private instance?:InstanceGeneratedData
   async eval(instance: InstanceGeneratedData, context: DataClumpRefactoringContext, analyzer: EvalAnalyzer): Promise<any> {
        this.instance=instance
        return await  super.eval(instance,context,analyzer)
    }
    async  evaluateDataClump(dc: DataClumpTypeContext, context: DataClumpRefactoringContext):Promise<any> {

        let filterResults = JSON.parse(fs.readFileSync(resolve("evalData/filter",(this.instance!.instance).projectName,"basicMetrics.json"), { encoding: "utf-8" }).toString())
        for(let f of Object.keys(filterResults)){
            filterResults[f]=filterResults[f].map((it)=>it.name)
        }



        if(dc==undefined || dc==null){
            return null
        }
        let key = (context as DataClumpDetectorContext).createDataTypeNameClumpKey(dc)
        let indices={}
        for (let fKey of Object.keys(filterResults) ) {
            let items=filterResults[fKey]
            let index=items.indexOf(key)
            indices[fKey]=index
            if(index!=-1){
            }
        }
        //console.log(key)
        //console.log("filterResults",filterResults)
        let s=0;
        let values:number[]=[]
        const UNKNOWN_DATA_CLUMP=1000
        let min=50000;
        for(let v of Object.values(indices)){
            if(v as number < min){
                min=v as number;
            }
            if(v!=-1){
            }
            else{
               min=UNKNOWN_DATA_CLUMP
            }
        }
        
        return min
    }
    getName(): string {
        return "PositionOnGroundTruthMetric";
    }

}



 class ReasonMetric implements EvalMetric{
    constructor(private reason:string){

    }
    async eval(instance: InstanceGeneratedData, context: DataClumpRefactoringContext): Promise<any> {
         let obj=instance.responsesParsed[0]
         if(obj!=null && obj!=undefined){
            return obj.reason==this.reason?1:0;
         }
         else{
            let text=fs.readFileSync(instance.responsePaths[0]).toString();
            if(text.includes("\""+this.reason+"\"")){
                return 1;
            }
            return 0;
         }
     }
     getName(): string {
         return "RefactoringReason="+this.reason
     }

 }

 class SuretyMetric implements EvalMetric {
    async eval(instance: InstanceGeneratedData, context: DataClumpRefactoringContext):Promise<any> {
       
        let parsed = instance.responsesParsed[0]
        if(parsed==undefined || parsed==null || Object.keys(parsed).length==0){
            return null;
        }

       let bestFittingDataClump = getBestFittingDataClump(context,[parsed.key,parsed.justification])
       if(bestFittingDataClump.dataClump==null || bestFittingDataClump.dataClump==undefined){
              return null
       }
       logMetric(this,
        bestFittingDataClump
       )
       return bestFittingDataClump.score
        
    }
  
    getName(): string {
        return "Surety";
    }

}