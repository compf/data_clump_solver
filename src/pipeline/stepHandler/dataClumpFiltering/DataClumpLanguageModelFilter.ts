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
        let dcContext =(await super.handle(step,context,params)).getByType(DataClumpDetectorContext)!
        dcContext.serialize()
       // console.log("filtering",dcContext.getDataClumpDetectionResult())
       let simplified= this.simplifyJson(dcContext.getDataClumpDetectionResult())
      // console.log(Object.keys(simplified.data_clumps).length)
       let api=resolveFromInterfaceName("AbstractLanguageModel") as AbstractLanguageModel
       let resolver=new LanguageModelTemplateResolver({})
       for(let h of this.handlers){
        h.handle(context,api,resolver)
       }
       console.log("simplified",Object.keys(simplified.data_clumps).length);
       //if(1==1)throw "sds"
       api.prepareMessage(JSON.stringify(simplified),"input")
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
            }
        ]
       );
       let result=await tolerantParser.send(false,dcContext)
       let parsed=result;
       console.log("parsed",result)
       fs.writeFileSync("stuff/justification" + new Date().getTime()+".json",(JSON.stringify(parsed,null,2)))

       let relevantDc= dcContext.getDataClumpDetectionResult().data_clumps[this.counterMap[parsed.key]]
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
    private filterTemplate={
        "data_clumps": {
            "<all>":{
                "key":true,
                "from_file_path": true,
                "from_class_or_interface_name":true,
                "from_class_or_interface_key": true,
                "from_method_name": true,
                "from_method_key": true,
                "to_file_path": true,
                "to_class_or_interface_name": true,
                "to_class_or_interface_key": true,
                "to_method_name": true,
                "to_method_key": true,
                "data_clump_type": true,
                "data_clump_data":{
                    "<all>":{
                    "name": true,
                    "type": true,
                    "modifiers": true
                    }
                }
            }
        }
    }
    constructor(args:DataClumpLanguageModelFilterArgs){
        super(args)
        for(let h of args.handlers){
            this.handlers.push(resolveFromConcreteName(h))
        }
    }
    private counterMap:{[key:number]:string}={}
    simplifyJson(source:any):any{
        let template=this.filterTemplate
        let counter=0
        let fullTarget={}
        source=source.data_clumps;
        for(let dcKey in source){
            this.counterMap[counter]=dcKey
            let target={
                key:counter,
                data_clump_type:source[dcKey].data_clump_type,
                from_file_path:source[dcKey].from_file_path,
                from_class_or_interface_name:source[dcKey].from_class_or_interface_name,
                from_method_name:source[dcKey].from_method_name,
                to_file_path:source[dcKey].to_file_path,
                to_class_or_interface_name:source[dcKey].to_class_or_interface_name,
                to_method_name:source[dcKey].to_method_name,
                data_clump_data:{}



            }
           fullTarget[counter]=target
            for(let dcData of Object.keys(source[dcKey].data_clump_data)){
                let data=source[dcKey].data_clump_data[dcData]
                target.data_clump_data[-counter]={
                    name:data.name,
                    type:data.type,
                    modifiers:data.modifiers
                }
                counter++;
                
            }
            counter++;
           
        }
      
     
        console.log("fullTarget",fullTarget)
      return {data_clumps:fullTarget}
    }
    counter=0
    
}