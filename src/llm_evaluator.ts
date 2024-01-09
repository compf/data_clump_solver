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
    console.log(ground_truth)
}
function get_output_file_paths(){
    let result=[]
    getRelevantFilesRec("llm_results",result,new FileFilteringContext(["*output.json"],[]))
    return result;
}
function parse_chat_file(path:string){
    let chat=JSON.parse(fs.readFileSync(path,{encoding:"utf-8"})) as ChatMessage[]
    let outputs=chat.filter((x)=>x.messageType=="output");
    console.log(outputs)

}
function sha256(content:string):string {  
    return createHash('sha256').update(content).digest('hex')
}
let ground_truth_standardized=standardize(ground_truth)
let paths=get_output_file_paths();
console.log(paths)
for(let p of paths){
    parse_chat_file(p)
}