import { DataClumpTypeContext } from "data-clumps-type-context";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../context/DataContext";
import { FilterOrMetric } from "./SingleItemFilter";
import { Metric } from "./Metric";
import fs from "fs"
export  class   RankSampler{
      private rankThreshold:number|null=null
      private rankSign:number|null=null;
      private differentDataClumps:boolean=false;
      constructor(args:{rankThreshold?:number,rankSign?:number,differentDataClumps?:boolean}){
          if(args.rankThreshold){
              this.rankThreshold=args.rankThreshold
          }
          if(args.rankSign){
              this.rankSign=args.rankSign
          }
          if(args.differentDataClumps){
              this.differentDataClumps=args.differentDataClumps
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

          let slicedResult:DataClumpTypeContext[]=[]
          let dcContext=context.getByType(DataClumpDetectorContext)!;
          let counter=0;
          let previousKey=""
          for(let r of result){
            if (typeof r === "string") {
                break;
            }
            else if(Object.values(r.data_clump_data).some((it)=>it.name=="serialVersionUID")){
            continue
            }
            slicedResult.push( ...dcContext.getRelatedDataClumpKeys(r as DataClumpTypeContext))
            if(this.differentDataClumps && counter >= this.rankThreshold || !this.differentDataClumps && slicedResult.length>this.rankThreshold!){
                //throw "slicedResult.length>this.rankThreshold! " + counter +" "+this.differentDataClumps;
                break;
            }
            let key=dcContext.createDataTypeNameClumpKey(r as DataClumpTypeContext)
            if(key!=previousKey){
                counter++
                previousKey=key
            }
            
          }
        
          return slicedResult
      }
      
}