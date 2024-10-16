import { all } from "axios";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../context/DataContext";
import { DataClumpLanguageModelFilter } from "../../pipeline/stepHandler/dataClumpFiltering/DataClumpLanguageModelFilter";
import { StubInterface } from "../../util/languageModel/StubInterface";
import { BaseEvaluator, Instance } from "../base_eval";
import { FilterEval } from "../eval_filter";
import { EvalAnalyzer, EvalMetric, evaluateBestFittingDataClump, getBestFittingDataClump, InstanceGeneratedData, InvalidJsonMetric, MultipleValuesMetric } from "./base_analyzer";
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
        let metrics= [ new DataClumpSizeMetric(), new DataClumpOccurenceMetricEvalFilter(),
            new FieldsToFieldsMetric(), new ParametersToParametersMetric(),
            new InvalidJsonMetric(), new SuretyMetric()
        ];
        for(let r of reasons){
            metrics.push(new ReasonMetric(r))
        }
       for(let fKey of Object.keys(statFunctions)){
        metrics.push(new PositionOnGroundTruthMetric(statFunctions[fKey],fKey))
       }

        return metrics
    }

    getName(): string {
        return "filter"
    }
}
export class PositionOnGroundTruthMetric extends MultipleValuesMetric {
  
    async evalArray(instance:InstanceGeneratedData,context: DataClumpRefactoringContext):Promise<any> {

        let filterResults = JSON.parse(fs.readFileSync(resolve("evalData/filter",(instance.instance).projectName,"basicMetrics.json"), { encoding: "utf-8" }).toString())
        let llm = new DataClumpLanguageModelFilter({ handlers: [] } as any)
        for(let f of Object.keys(filterResults)){
            filterResults[f]=filterResults[f].map((it)=>it.name)
        }
        let withNumericIds = llm.simplifyKeys(context.getByType(DataClumpDetectorContext)!.getDataClumpDetectionResult())
        context = context.buildNewContext(new DataClumpDetectorContext(withNumericIds));
        let parsed=instance.responsesParsed[0]
        if(parsed==undefined || parsed==null || Object.keys(parsed).length==0){
            return null
        }
        let bestFittingDataClump=getBestFittingDataClump(context,[parsed.key,parsed.justification])
        let k=bestFittingDataClump!.dataClump?.key
        if(k==undefined || k==null){
            return null
        }
        



        let dc = context.getByType(DataClumpDetectorContext)!.getDataClumpDetectionResult().data_clumps[k];
        if(dc==undefined || dc==null){
            return null
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
        let s=0;
        let values:number[]=[]
        const UNKNOWN_DATA_CLUMP=1000
        for(let v of Object.values(indices)){
            if(v!=-1){
                values.push(v as number)
            }
            else{
                values.push(UNKNOWN_DATA_CLUMP)
            }
        }
        return values
    }
    getPrefix(): string {
        return "PositionOnGroundTruthMetric";
    }

}

class DataClumpSizeMetric implements EvalMetric{
   async  eval(instance:InstanceGeneratedData,context: DataClumpRefactoringContext):Promise<any> {
        let parsed=instance.responsesParsed[0]
        if(parsed==undefined || parsed==null || Object.keys(parsed).length==0){
            return null;
        }

       let bestFittingDataClump = getBestFittingDataClump(context,[parsed.key,parsed.justification])
       if(bestFittingDataClump.dataClump==null || bestFittingDataClump.dataClump==undefined){
              return null
       }
        let size=Object.values(bestFittingDataClump!.dataClump!.data_clump_data).length

        return  size
    }
    getName(): string {
        return "DataClumpSizeMetric";
    } 


}

class DataClumpOccurenceMetricEvalFilter implements EvalMetric{
    async  eval(instance:InstanceGeneratedData,context: DataClumpRefactoringContext):Promise<any> {
         let parsed=instance.responsesParsed[0]
         if(parsed==undefined || parsed==null || Object.keys(parsed).length==0){
             return null;
         }
 
        let bestFittingDataClump = getBestFittingDataClump(context,[parsed.key,parsed.justification])
        if(bestFittingDataClump.dataClump==null || bestFittingDataClump.dataClump==undefined){
               return null
        }
        let dcOccurenceMetric=new DataClumpOccurenceMetric()
         let size=await dcOccurenceMetric.evaluate(bestFittingDataClump.dataClump,context)
 
         return  size
     }
     getName(): string {
         return "DataClumpOccurence";
     } 
 
 
 }

 class FieldsToFieldsMetric implements EvalMetric{
    async  eval(instance:InstanceGeneratedData,context: DataClumpRefactoringContext):Promise<any> {
         let parsed=instance.responsesParsed[0]
         if(parsed==undefined || parsed==null || Object.keys(parsed).length==0){
             return null;
         }
 
        let bestFittingDataClump = getBestFittingDataClump(context,[parsed.key,parsed.justification])
        if(bestFittingDataClump.dataClump==null || bestFittingDataClump.dataClump==undefined){
               return null
        }
        
         if(bestFittingDataClump.dataClump.from_method_name ==null && bestFittingDataClump.dataClump.to_method_name==null){
            return 1
         }
         else{
            return 0;
         }
     }
     getName(): string {
         return "FieldsToFieldsMetric";
     } 
 
 
 }

 class ParametersToParametersMetric implements EvalMetric{
    async  eval(instance:InstanceGeneratedData,context: DataClumpRefactoringContext):Promise<any> {
         let parsed=instance.responsesParsed[0]
         if(parsed==undefined || parsed==null || Object.keys(parsed).length==0){
             return null;
         }
 
        let bestFittingDataClump = getBestFittingDataClump(context,[parsed.key,parsed.justification])
        if(bestFittingDataClump.dataClump==null || bestFittingDataClump.dataClump==undefined){
               return null
        }
        
         if(bestFittingDataClump.dataClump.from_method_name !=null && bestFittingDataClump.dataClump.to_method_name!=null){
            return 1
         }
         else{
            return 0;
         }
     }
     getName(): string {
         return "ParametersToParametersMetric";
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
            return null;
         }
     }
     getName(): string {
         return "reason="+this.reason
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
       return bestFittingDataClump.score
        
    }
  
    getName(): string {
        return "Surety";
    }

}