import { Minimatch } from "minimatch";
import { FileFilteringContext } from "../context/DataContext";
import fs from "fs"
import path from "path";
import {createHash} from "crypto"
import { FileIO } from "./FileIO";
export const MiniMatchConf = { dot: true, matchBase: true,debug:false };
  /** 
* Recursively traverse through the directory and find all relavant files
* @param baseDir the current directory to enumerate the files there
* @param resultArray will be filled during the recursion to store all relevant files
*/
export function getRelevantFilesRec(baseDir: string, resultArray: string[],fileFilteringContext:FileFilteringContext|null): void {
    let entries = fs.readdirSync(baseDir, { withFileTypes: true });
    for (let entry of entries) {
        let fullname = path.join(baseDir, entry.name);
        if (entry.isDirectory()) {
            getRelevantFilesRec(fullname, resultArray,fileFilteringContext);
        } else {
            if (shallIgnore(fullname,fileFilteringContext)) {
                continue;
            }
            shallIgnore(fullname,fileFilteringContext)
            resultArray.push(fullname);
        }
    }
}
export function  shallIgnore(filePath: string,fileFilteringContext:FileFilteringContext|null): boolean {

    if (fileFilteringContext == null) {
        return false
    }

    let includeGlobs = fileFilteringContext.includeGlobs
    let excludeGlobs = fileFilteringContext.excludeGlobs
    let isIncluded = includeGlobs.length == 0
    let isExcluded = false
    let includePrevails=fileFilteringContext.includePrevails
    for (let includeGlob of includeGlobs) {
        
       

        if (filePath.match(includeGlob)) {
            isIncluded = true
            break
        }
    }
    for (let excludeGlob of excludeGlobs) {
        if (filePath.match(excludeGlob)) {
            isExcluded = true
            break
        }
    }
    return  (includePrevails && (isExcluded || !isIncluded)) || (!includePrevails && (isExcluded ))
}

export function checkPath(path:string, include:string[],exclude:string[], includePrevails:boolean):boolean{
    let isIncluded = include.length == 0
    let isExcluded = false
    for (let includeGlob of include) {
        if (path.endsWith(includeGlob)|| new Minimatch(includeGlob,MiniMatchConf).match(path,true)) {
            isIncluded = true
            break
        }
    }
    for (let excludeGlob of exclude) {
        if (new Minimatch(excludeGlob,MiniMatchConf).match(path)) {
            isExcluded = true
            break
        }
    }
    return (isIncluded && !isExcluded) || (includePrevails && isIncluded)
}

export async function wait(ms:number){
    return new Promise((resolve,reject)=>{
        setTimeout(resolve,ms)
    })
}
export function waitSync(ms:number){
    let start = Date.now();
    while (Date.now() < start + ms);
}
export function compareTo(a:number,b:number){
    if(a==b){
        return 0
    }
    if(a>b){
        return 1
    }
    return -1
}
export function tryParseJSON(jsonString:string){
    try{
        return JSON.parse(jsonString)
    }catch(e){
       // console.log("JSON Error",e)
        return null
    }
}
export function tryParseJSONWithSlice(jsonString:string, remainaing?:{remaining:string}){
    let original=jsonString;
    let parsed=tryParseJSON(jsonString);
    if(parsed==null){
        let start=jsonString.indexOf("{")
        let end=jsonString.lastIndexOf("}")+1
        jsonString=jsonString.slice(start,end);
        if(remainaing){
            remainaing.remaining=original.replace(jsonString,"")
        }
        return tryParseJSON(jsonString);
    }
    return parsed;
}
export function parseJSONDetailed(json:string):{jsonResult:any,errorMessage?:string} {
    try {
        let result= JSON.parse(json);
        return {jsonResult:result,errorMessage:undefined}
    } catch (e:any) {
         let errorMessage=""
        if (e instanceof SyntaxError) {
            const match = /position (\d+)/.exec(e.message);
           
            if (match) {
                const ContextSize=40
                const position = parseInt(match[1], 10);
                errorMessage='Invalid JSON at position:'+ position+'\nError near: ' + json.slice(Math.max(0, position - ContextSize), position) + ContextSize+"\n"+json.charAt(position)

            } else {
                errorMessage=e.message;
            }
            console.error(errorMessage)
            return {jsonResult:null,errorMessage}
        } else {
            errorMessage=e.message;
        }
        console.error(errorMessage)
        return {jsonResult:null,errorMessage}
        
    }
}



export function indexOfSubArray(array:any[],subArray:any[]){
    for(let i=0;i<array.length-subArray.length;i++){
        let found=true;
        for(let j=0;j<subArray.length;j++){
            if(array[i+j]!=subArray[j]){
                console.log(array[i+j],subArray[j])
                found=false;
                break;
            }
        }
        if(found){
            return i;
        }
    }
    return -1;
}

export function randInt(max:number){
    return Math.floor(max*Math.random())
}

export function nop(){}

export function makeUnique<T>(array:T[], keyFunction?:{(o:T):string}):T[]{
    if(keyFunction){
        let keys=new Set<string>();
        let result:T[]=[]
        for(let a of array){
            if(!keys.has(keyFunction(a))){
                keys.add(keyFunction(a))
            }
            else{
                continue;
            }
            result.push(a);
        }
        return Array.from(result)
    }
    return Array.from(new Set(array))
}

export function prettyInvalidJson(obj:any){
    let  result=prettyInvalidJsonRec(obj,0)
    return result;

}
function prettyInvalidJsonRec(obj:any, depth:number):string{
    let text=""
    let indent="\t".repeat(depth)
    if(obj==null || obj==undefined)return ""
    if(typeof(obj)=="string"){
        return "\""+obj+"\"";
    }
    for(let key of Object.keys(obj)){
        if(key=="modifiers"){
            nop();
        }
        text+=indent+key+":"
        let value=obj[key];
         if( typeof(value)!="string"  && Array.isArray(value)){
            text+="\n"+indent+"[\n"
            for(let v of value){
        
                let result=prettyInvalidJsonRec(v,depth+1);
                text+=result+",\n"


                
               

            }
            text+="\n"+indent+"],\n"
        }
        else if(typeof(value)=="object"){
            text+="\n{\n"+indent+prettyInvalidJsonRec(value,depth+1)+indent+"\n}\n";
        }
      
        else if(typeof(value)=="string"){
            let r={remaining:""}
            let parsed=tryParseJSONWithSlice(value,r);
            if(parsed){
                text+="\n{\n"+r.remaining+indent+prettyInvalidJsonRec(parsed,depth+1)+indent+"\n}\n";

            }
            else{
                value=value.replaceAll("\n","\n"+indent)
                value=value.replaceAll("\\n","\n"+indent)
                text+="\""+"\n"+indent+value +indent+"\n"+"\",\n"
            }
        }
        else{
            text+="\""+indent+value+"\",\n"
        }
    }
    return text;
}

export function writeFileSync(key:string,content:string){
    let fileIO=FileIO.instance;
    fileIO.writeFileSync(key,content)
}

export function readFileSync(key:string):string{
    let fileIO=FileIO.instance;
    return fileIO.readFileSync(key)
}
let currLabel="";
export function getCurrLabel():string{
    return currLabel;
}

export function setCurrLabel(label:string){
    currLabel=label;
}

export function mergeObjects(objects:any[]){
    let target={}

    for(let o of objects){
        mergeObject(target,o)
    }
    return target
}

function mergeObject(target:any, obj:any){
    for(let key of Object.keys(obj)){
        if(!(key in target)){
           target[key]=obj[key]
        }
        else{
            if(Array.isArray(obj[key])){
                for(let o of obj[key]){
                    target[key].push(o)
                }
                
            }
            else if(typeof(obj[key])=="object"){
                mergeObject(target[key],obj[key])
            }
            else{
                target[key]=obj[key]
            }
            
        }
    }
}
const processedInvalidJsonPath="stuff/processed_invalid.json"
function loadProcessedInvalidJSON(jsonString:string):any{
    let result=tryParseJSON(jsonString);
    if(result!=null){
        return result;
    }
    if(fs.existsSync(processedInvalidJsonPath)){
       let dict=JSON.parse(fs.readFileSync(processedInvalidJsonPath).toString())
        let key=createHash('sha256').update(jsonString).digest('base64');
        if (key in dict){
            return dict[key]
        }
        else{
            return null;
        }
        
    }
    else{
        return null;
    }
}
function saveProcessedInvalidJson(jsonString,obj:any){
    if(fs.existsSync(processedInvalidJsonPath)){
        let dict=JSON.parse(fs.readFileSync(processedInvalidJsonPath).toString())
        let key=createHash('sha256').update(jsonString).digest('base64');
       dict[key]=obj;
       fs.writeFileSync(processedInvalidJsonPath,JSON.stringify(dict))
        
    }
    else{
        return null;
    }
}
export function parseInvalidJSON(jsonString:string, closingBrackets:string){
    
   let result=loadProcessedInvalidJSON(jsonString)
    let original=jsonString
    let counter=0
    while(result==null && jsonString.length>0){
        jsonString=jsonString.slice(0,jsonString.length-1)
       // console.log()
        
        console.log(counter++,jsonString)
        for(let i=0;i<closingBrackets.length;i++){
            let temp=jsonString+closingBrackets.slice(undefined,i+1);
            result=tryParseJSON(temp)
            if(result!=null){
                saveProcessedInvalidJson(original,result)
                return result;

            }
        }
        
    }
    return result;
    
}

export function debugOnNull(f:any){
    let res=f();
    if(res==null || res==undefined){
        nop();
        f();
    }
    return res
}