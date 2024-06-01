// @ts-nocheck
import { resolveFromConcreteName, resolveFromInterfaceName } from "../../../config/Configuration";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../../context/DataContext";
import { LanguageModelInterface } from "../../../util/languageModel/LanguageModelInterface";
import { LanguageModelTemplateResolver } from "../../../util/languageModel/LanguageModelTemplateResolver";
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
       let simplified= this.simplifyJson(dcContext.getDataClumpDetectionResult())
       console.log(Object.keys(simplified.data_clumps).length)
       let api=resolveFromInterfaceName("LanguageModelInterface") as LanguageModelInterface
       let resolver=new LanguageModelTemplateResolver({})
       for(let h of this.handlers){
        h.handle(context,api,resolver)
       }
       api.prepareMessage(JSON.stringify(simplified),"input")
       let result=await api.sendMessages(true)
       let parsed=JSON.parse(result.messages[0])
       fs.writeFileSync("stuff/justification" + new Date().getTime()+".json",(JSON.stringify(parsed,null,2)))

       let relevantDc= dcContext.getDataClumpDetectionResult().data_clumps[parsed.key]
       let related= dcContext.getRelatedDataClumpKeys(relevantDc)
       console.log("related",related)
       dcContext.cloneLastItem()
       dcContext.getDataClumpDetectionResult().data_clumps={}
      
       for(let r of related){
        console.log("related",r.key)    
        dcContext.getDataClumpDetectionResult().data_clumps[r.key]=r

       }
       return dcContext
       

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
    simplifyJson(source:any):any{
        let template=this.filterTemplate

        let target={}
        this.simplifyJsonRec(source,target,template)
        return target
    }
    simplifyJsonRec(source:any,target:any,template:any){
        let templateKeys=Object.keys(template)
        if(templateKeys.length==1 && templateKeys[0]=="<all>"){
           for(let key in source){
               target[key]={}
               this.simplifyJsonRec(source[key],target[key],template["<all>"])
           }
           return
        }
        for(let key of templateKeys){
            let value=source[key]
            if( typeof value=="object" && value!=null){
                target[key]={}
                this.simplifyJsonRec(value,target[key],template[key])
            }
            else {
                target[key]=source[key]
            }

        }
    }
}