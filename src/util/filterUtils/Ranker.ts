import { DataClumpTypeContext } from "data-clumps-type-context";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../context/DataContext";
import { FilterOrMetric } from "./SingleItemFilter";
import { Metric } from "./Metric";
import fs from "fs"
export  class   RankSampler{
      private rankThreshold:number|null=null
      private rankSign:number|null=null;
      constructor(args:{rankThreshold?:number,rankSign?:number}){
          if(args.rankThreshold){
              this.rankThreshold=args.rankThreshold
          }
          if(args.rankSign){
              this.rankSign=args.rankSign
          }
      }
      protected getKey(data: string|DataClumpTypeContext):string{
          if(typeof data==="string"){
              return data
          }
          else{
              return data.key
          }
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
            let evaluateMap:{[key:string]:number}={}
            for(let item of input){
                  let key=this.getKey(item)
                  let value=await metric.evaluate(item,context)
                  evaluateMap[key]=value

            }
            fs.writeFileSync("data/evaluateMap.json",JSON.stringify(evaluateMap))
          let result=input.sort(  (a,b) =>this.rankSign!* (evaluateMap[this.getKey(a)]-evaluateMap[this.getKey(b)]))
        
          return result.slice(0,this.rankThreshold!)
      }
      
}