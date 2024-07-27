// @ts-nocheck
import { resolveFromConcreteName, resolveFromInterfaceName } from "../../../config/Configuration";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../../context/DataContext";
import { AbstractLanguageModel } from "../../../util/languageModel/AbstractLanguageModel";
import { LanguageModelTemplateResolver } from "../../../util/languageModel/LanguageModelTemplateResolver";
import { TolerantOutputParser } from "../../../util/languageModel/TolerantOutputParser";
import { tryParseJSONWithSlice } from "../../../util/Utils";
import { PipeLineStepType } from "../../PipeLineStep";
import { LargeLanguageModelHandler, SystemInstructionHandler } from "../languageModelSpecific/LargeLanguageModelHandlers";
import { DataClumpFilterArgs, DataClumpFilterStepHandler } from "./DataClumpFilterStepHandler";
import fs from "fs";
export type DataClumpLanguageModelFilterArgs= DataClumpFilterArgs& {
    handlers:string[]
}
export class DataClumpLanguageModelFilter extends DataClumpFilterStepHandler{
   async handle(step: PipeLineStepType, context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
      context=await super.handle(step,context,params);
      let dcContext=context.getByType(DataClumpDetectorContext)!

       let api=resolveFromInterfaceName("AbstractLanguageModel") as AbstractLanguageModel
       let resolver=new LanguageModelTemplateResolver({})
       dcContext.getDataClumpDetectionResult().data_clumps=this.simplifyKeys(dcContext.getDataClumpDetectionResult()).data_clumps

       for(let h of this.handlers){
        h.handle(dcContext,api,resolver)
       }
       console.log("dcContext",dcContext.getDataClumpDetectionResult())
       let tolerantParser=new TolerantOutputParser(api,
        [
            (s,d)=>tryParseJSONWithSlice(s),
            (s,d)=>{
                let dcContext=d.getByType(DataClumpDetectorContext)!
                for(let key of dcContext.getDataClumpKeys()){
                    if(s.includes(key)){
                        return {key:key};
                    }
                }
                return null;
            },
            (s,d)=>{
                let maxKey="";
                let max=0
                let maxValues=[]
                for(let key of dcContext.getDataClumpKeys()){
                    let dcValue=dcContext.getDataClumpTypeContext(key);
                    let values=Object.values(dcValue).filter((it)=>typeof(it)=="string" && s.includes(it))
                    values.push(...(Object.values(dcValue.data_clump_data).map((it)=>it.name)))
                    values=new Set(values);
                    let cnt=values.size
                    if(cnt>max){
                        maxKey=key;
                        max=cnt;
                        maxValues=values;
                    }
                        
                    
                }
                return {key:maxKey}
                
            }
        ]
       );
       let result=await tolerantParser.send(false,dcContext)
       let parsed=result;
       console.log("parsed",result)
       fs.writeFileSync("stuff/justification" + new Date().getTime()+".json",(JSON.stringify(parsed,null,2)))

       let relevantDc= dcContext.getDataClumpDetectionResult().data_clumps[parsed.key]
       console.log("relevantDc",relevantDc)
       let related= dcContext.getRelatedDataClumpKeys(relevantDc)
       let filtered=dcContext.cloneLastItem();
       filtered.data_clumps={}

      
       for(let r of related){
        console.log("related",r.key)    
       filtered.data_clumps[r.key]=r

       }
       return dcContext.buildNewContext(new DataClumpDetectorContext(filtered))
       

    }
    private handlers:LargeLanguageModelHandler[]=[
    ]
    deserializeExistingContext(context: DataClumpRefactoringContext, step: PipeLineStepType): DataClumpRefactoringContext | null {
        return null;
    }
    constructor(args:DataClumpLanguageModelFilterArgs){
        super(args)
        for(let h of args.handlers){
            this.handlers.push(resolveFromConcreteName(h))
        }
    }

    getOriginalKey(numericKey:number):string{
        return this.counterMap[numericKey]
    }
    private counterMap: { [key: number]: string } = {}
    simplifyKeys(source: any): any {
        let counter = 0
        let fullTarget = {}
        source = source.data_clumps;
        for (let dcKey in source) {
            this.counterMap[counter] = dcKey
            let target=Object.assign({},source[dcKey])
            target.key=counter
            fullTarget[counter]=target
            let dataClumpData = source[dcKey].data_clump_data
            target.data_clump_data = {}
            for (let dcData of Object.keys(dataClumpData)) {
                let data = dataClumpData[dcData]
                target.data_clump_data[-counter] = dataClumpData[dcData]
                target.data_clump_data[-counter].key = counter
                counter++;

            }
            counter++;

        }


        console.log("fullTarget", fullTarget)
        return { data_clumps: fullTarget }
    }
    counter = 0
    
}