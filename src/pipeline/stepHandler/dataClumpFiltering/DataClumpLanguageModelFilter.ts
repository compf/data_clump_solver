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
import { writeFileSync } from "../../../util/Utils";
import readlineSync from "readline-sync"
export type DataClumpLanguageModelFilterArgs= DataClumpFilterArgs& {
    handlers:string[]
}
export class DataClumpLanguageModelFilter extends DataClumpFilterStepHandler{
   async handle(step: PipeLineStepType, context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
      context=await super.handle(step,context,params);
      let dcContext=context.getByType(DataClumpDetectorContext)!

       let api=resolveFromInterfaceName("AbstractLanguageModel") as AbstractLanguageModel
       let resolver=resolveFromConcreteName("LanguageModelTemplateResolver") as LanguageModelTemplateResolver
       dcContext.getDataClumpDetectionResult().data_clumps=this.simplifyKeys(dcContext.getDataClumpDetectionResult()).data_clumps

       for(let h of this.handlers){
        await h.handle(dcContext,api,resolver)
       }
       console.log("dcContext",dcContext.getDataClumpDetectionResult())
      try{
       let parsed=await this.parseOutput(api,dcContext);
       console.log("parsed",parsed)
       writeFileSync("justification" + new Date().getTime()+".json",(JSON.stringify(parsed,null,2)))

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
    catch(e){
        return dcContext
    }
       

    }
    private handlers:LargeLanguageModelHandler[]=[
    ]
    async parseOutput(api:AbstractLanguageModel, dcContext:DataClumpDetectorContext): any {
        let tolerantParser=new TolerantOutputParser(api,
            [
                (s,d)=>{
                    let res=tryParseJSONWithSlice(s)
                    let dcContext=d.getByType(DataClumpDetectorContext)!
                    let keys=Array.from(dcContext.getDataClumpKeys());
                    if(keys.includes(res.key)){
                        return res; 
                    }
                    else{
                        return null;
                    }
                   
                },
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
                        let values=Object.values(dcValue).filter((it)=>typeof(it)=="string")
                        values.push(...(Object.values(dcValue.data_clump_data).map((it)=>it.name).filter((it)=>it.length>1)))
                        values=new Set(values.filter((it)=>  s.includes(it)));
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
           return Promise.resolve(result);
    }
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


        return { data_clumps: fullTarget }
    }
    counter = 0
    
}

export class MultipleAlternativesLanguageModelFilter extends DataClumpLanguageModelFilter{
    private numberAlternatives:number=10;
    async parseOutput(api: AbstractLanguageModel, dcContext: DataClumpDetectorContext) {
        let tolerantParser=new TolerantOutputParser(api,
            [
                (s,d)=>tryParseJSONWithSlice(s).proposals,
                (s,d)=>{
                    let result=[]
                    let dcContext=d.getByType(DataClumpDetectorContext)!
                    for(let key of dcContext.getDataClumpKeys()){
                        if(s.includes(key)){
                            result.push({key:key});
                        }
                    }
                    return null;
                },
                (s,d)=>{
                    let maxKey="";
                    let keyScores:{score:number,key:string}=[]
                    let max=0
                    let maxValues=[]
                    for(let key of dcContext.getDataClumpKeys()){
                        let dcValue=dcContext.getDataClumpTypeContext(key);
                        let values=Object.values(dcValue).filter((it)=>typeof(it)=="string" && s.includes(it))
                        values.push(...(Object.values(dcValue.data_clump_data).map((it)=>it.name)))
                        values=new Set(values);
                        keyScores.push({score:values.size,key:key})
                        
                            
                        
                    }
                    return keyScores.sort((a,b)=>b.score-a.score).slice(0,this.numberAlternatives).map((it)=>{return {key:it.key}})
                    
                }
            ]
           );
           let result=await tolerantParser.send(false,dcContext);
           if(!Array.isArray(result)){
            result=[result]
           }
           let dataClumpInformation=result.map((it,i)=>{
                let dc=dcContext.getDataClumpTypeContext(it.key)
                return JSON.stringify(
                  
                    {
                    index:i,
                    key:it.key,
                    from_file_path:dc.from_file_path,
                    from_class_name:dc.from_class_or_interface_name,
                    from_method_name:dc.from_method_name,

                    to_file_path:dc.to_file_path,
                    to_class_name:dc.to_class_or_interface_name,
                    to_method_name:dc.to_method_name,
                    WHITESPACE:"##############################",
                    number_items:Object.keys(dc.data_clump_data).length,
                    data_clump_data:Object.values(dc.data_clump_data).map((it)=>it.type +" "+it.name)
                    },undefined,2)})
           

           let question=dataClumpInformation.join("\n\n\n")
           do{
                let index= readlineSync.question("Choose a data clump:\n "+question);
                if(index==""){
                     return null;
                }
                if(!isNaN(index)  && index>=0 && index<dataClumpInformation.length){
                     return  Promise.resolve(result[index]);
                }
                
           }while(true)
          
           


    }
}