import { DataClumpTypeContext } from "data-clumps-type-context";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../context/DataContext";
import { FilterOrMetric } from "./SingleItemFilter";
import { Metric } from "./Metric";
import {InitializationRequiredMetric} from "./MetricCombiner"
function isInitializationRequired(object: any): object is InitializationRequiredMetric {
    // replace 'property' with a unique property of ReExecutePreviousHandlers
    return 'initialize' in object;
}
export type RankSamplerArgs={
    rankThreshold?:number,
    rankSign?:number,
    differentDataClumps?:boolean,
    strictSize?:boolean

}
import fs from "fs"
export  class   RankSampler{
      private rankThreshold:number|null=null
      private rankSign:number|null=null;
      private differentDataClumps:boolean=true;
    private strictSize: boolean=false;
      constructor(args:RankSamplerArgs){
          if(args.rankThreshold){
              this.rankThreshold=args.rankThreshold
          }
          if(args.rankSign){
              this.rankSign=args.rankSign
          }
          if(args.differentDataClumps!=undefined){
              this.differentDataClumps=args.differentDataClumps
          }
          if((args.strictSize!=undefined)){
              this.strictSize=args.strictSize
          }
      }
      protected getKey(data: string|DataClumpTypeContext, context:DataClumpRefactoringContext):string{
          if(typeof data==="string"){
              return data
          }
          else{
            let dcContext=context.getByType(DataClumpDetectorContext)!
              return dcContext.createDataTypeNameClumpKey(data)
          }
      }
      getItemByKey(key:string,context:DataClumpRefactoringContext):DataClumpTypeContext|string{
            let dcContext=context.getByType(DataClumpDetectorContext)
            if(dcContext==null){
                return key;
            }
            return dcContext.getFirstDataClumpByTypeNameKey(key)
        }
      async rank(metric:Metric,input:(string|DataClumpTypeContext)[],context:DataClumpRefactoringContext):Promise<(string|DataClumpTypeContext)[]>{
            if(this.rankThreshold==null){
                  this.rankThreshold=1
            }
            if(this.rankSign==null){
                  this.rankSign=-1
            }
            if(this.rankThreshold!<1){
                  this.rankThreshold=input.length*this.rankThreshold!
            }
            let dcContext=context.getByType(DataClumpDetectorContext)!
            let keys=Array.from(new Set(input.map((it)=>this.getKey(it,context))))
            let evaluateMap:{[key:string]:number}={}
            if(isInitializationRequired(metric)){
                for(let  key of keys){
                    let item=this.getItemByKey(key,context)
                   await  metric.initialize(item,context)
  
              }
            }
            let keyCounter=0
            for(let key of keys){
                let item=this.getItemByKey(key,context)
                  let value=await metric.evaluate(item,context)
                  evaluateMap[key]=value
                    keyCounter++

            }
            fs.writeFileSync("data/evaluateMap.json",JSON.stringify(evaluateMap))
          let result=keys.sort(  (a,b) =>this.rankSign!* (evaluateMap[a]-evaluateMap[b])).map((it)=>dcContext.getFirstDataClumpByTypeNameKey(it))
            //console.log("result",result)
          let slicedResult:DataClumpTypeContext[]=[]
          let counter=0;
          let previousKey=""
          let typeNameKeys_DataClumps={}
          for(let r of result){
            //if(1==1)throw "iteration"
            if (typeof r === "string") {
                break;
            }
            else if(Object.values(r.data_clump_data).some((it)=>it.name=="serialVersionUID")){
            continue
            }
            let typeNameKey=dcContext.createDataTypeNameClumpKey(r as DataClumpTypeContext)
            if(this.differentDataClumps){
                typeNameKeys_DataClumps[typeNameKey]=r as DataClumpTypeContext
            }
            else{
                typeNameKeys_DataClumps[typeNameKey]=[]
                for(let related of dcContext.getRelatedDataClumpKeys(r as DataClumpTypeContext)){
                    typeNameKeys_DataClumps[typeNameKey].push(related)
                }
            }
            const compareCount = !this.differentDataClumps ? Object.values(typeNameKeys_DataClumps).flat().length : Object.keys(typeNameKeys_DataClumps).length
            if(compareCount>this.rankThreshold!){
                //throw "csyc " + compareCount +" "+this.rankThreshold;
                break;
            }
          
            
          }

          slicedResult=Object.values(typeNameKeys_DataClumps).flat() as DataClumpTypeContext[]

          if(this.strictSize){
                slicedResult=slicedResult.slice(0,this.rankThreshold!)
               //throw "sliced "+slicedResult.length
                return slicedResult
          }
          return slicedResult
      }
      
}