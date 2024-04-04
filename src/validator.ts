import { FileFilteringContext } from "./context/DataContext";
import { AbstractStepHandler } from "./pipeline/stepHandler/AbstractStepHandler";
import { getRelevantFilesRec } from "./util/Utils";
import {relative} from "path"
const RequiredPostfix="StepHandler"
function main(){
    let paths:string[]=[]
    let startTime=Date.now()
    getRelevantFilesRec("./dist/src",paths,new FileFilteringContext(["*.js"],["dist/src/data-clumps-doctor/**"]))
    for(let path of paths){
        if (path.endsWith("Configuration.js")){
            continue;
        }
        let relativized="./"+relative(__dirname,path)
        let content=require(relativized)
        for(let key of Object.keys(content)){
            let cls=content[key]
            if(cls.prototype instanceof AbstractStepHandler){
                if(!key.endsWith(RequiredPostfix)){
                    console.log("Missing postfix for class: "+key)
                }
            }
        }
    }
}
if(require.main === module){
  main();

}