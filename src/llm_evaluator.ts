import { DataClumpsTypeContext } from "data-clumps-type-context";
import fs from "fs"
import { createHash } from 'node:crypto'
import { getRelevantFilesRec } from "./util/Utils";
import { FileFilteringContext } from "./context/DataContext";
import { ChatMessage } from "./util/languageModel/LanguageModelInterface";

const ground_truth=JSON.parse(fs.readFileSync("llm_results/dataClumpDetectorContext.json",{encoding:"utf-8"}))
function standardize(dcData:DataClumpsTypeContext){
    let result:DataClumpsTypeContext={} as any
    result.data_clumps={}
    for(let dcKey of Object.keys(dcData.data_clumps)){
        let dcValue=dcData.data_clumps[dcKey];
        if(dcValue["key"]==undefined)continue
        dcValue.key=undefined as any
        dcValue.from_method_key=undefined as any
        dcValue.to_method_key=undefined as any
        let newDCData={}

        dcValue.from_class_or_interface_key=undefined as any
        dcValue.to_class_or_interface_key=undefined as any

        for( let dcDataKey of Object.keys(dcValue.data_clump_data)){
            let dcDataValue=dcValue.data_clump_data[dcDataKey]
            dcDataValue.to_variable.key=undefined as any
            dcDataValue.key=undefined as any
            let hashed=sha256(JSON.stringify(dcDataValue))
            dcDataValue.key=hashed
            newDCData[hashed]=dcDataValue

        }
        dcValue.data_clump_data=newDCData
        let hashed=sha256(JSON.stringify(dcValue))
        dcValue.key=hashed
      result.data_clumps[hashed]=dcValue

    }
    return result
}
function main(){
}
function get_output_file_paths():string[]{
    let result=[]
    getRelevantFilesRec("llm_results",result,new FileFilteringContext(["*output.json"],[]))
    return result;
}
function parse_chat_file(path:string){
    let chat=JSON.parse(fs.readFileSync(path,{encoding:"utf-8"})) as ChatMessage[]
    let outputs=chat.filter((x)=>x.messageType=="output" && x.messages.length>0 && x.messages[0]["data_clumps"]!=undefined);
    let combined:DataClumpsTypeContext={
        data_clumps:{}
    } as any;
    let tooLarge=outputs.some((x)=>x.messages.length>1)
    for(let output of outputs){
        let msg=output.messages[0] as any as DataClumpsTypeContext
        let standardized=standardize(msg)

        for(let key of Object.keys(standardized.data_clumps)){
            combined.data_clumps[key]=standardized.data_clumps[key]
        }

    }

    return combined

}
function sha256(content:string):string {  
    return createHash('sha256').update(content).digest('hex')
}
function get_class_method_tuples(dcContext:DataClumpsTypeContext):string[]{
    let detectedClassMethodPairs:string[]=[]
    for(let dcKey of Object.keys(dcContext.data_clumps)){
        let dc=dcContext.data_clumps[dcKey]
        let class_identifier=[dc.from_class_or_interface_name,dc.to_class_or_interface_name].sort()
        if(class_identifier.includes("X_y_z") || class_identifier.includes("Exponent_mantissa_sign")){
            continue;
        }
        let method_identifier=[dc.from_method_name,dc.to_method_name].sort()
        let all=[...class_identifier,...method_identifier]
        let stringified=JSON.stringify(all)
        detectedClassMethodPairs.push(stringified)

    }
    return detectedClassMethodPairs;
}
let ground_truth_standardized=standardize(ground_truth)
let paths=get_output_file_paths();
let max_d_in_o=0;
let max_o_in_d=0;
let max_d_in_o_path=""
let max_o_in_d_path=""
console.log(paths)
let original=get_class_method_tuples(ground_truth_standardized)
for(let p of paths){
    let combined=parse_chat_file(p)
    let detected=get_class_method_tuples(combined)
    let original_in_detected=0;
    let detected_in_original=0;
    for(let o of original){
        if(detected.includes(o)){

            original_in_detected++;
        }
        else{
            console.log(p,"Unknown in detected",o)

        }
    }
    for(let d of detected){
        if(original.includes(d)){
            detected_in_original++;
        }
        else{
            console.log(p,"Unknown in original",d)

        }
    }
    detected_in_original/=detected.length
    original_in_detected/=original.length
    if(detected_in_original>max_d_in_o && p.includes("source")){
        max_d_in_o=detected_in_original
        max_d_in_o_path=p
    
    }
    if(original_in_detected>max_o_in_d && p.includes("source")){
        max_o_in_d=original_in_detected
        max_o_in_d_path=p
    }
    console.log(p,"D in O",detected_in_original*100,"%","O in D",original_in_detected*100,"%")

    
}
console.log()
console.log();
console.log("Max D in O",max_d_in_o*100,"%",max_d_in_o_path)
console.log("Max O in D",max_o_in_d*100,"%",max_o_in_d_path)
