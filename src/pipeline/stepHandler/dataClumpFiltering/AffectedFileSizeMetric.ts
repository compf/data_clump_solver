import { DataClumpTypeContext } from "data-clumps-type-context";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../../context/DataContext";
import { Metric } from "../../../util/filterUtils/Metric";
import {resolve} from "path"
import fs from "fs"
import { AffectedFilesMetric } from "./AffectedFilesMetric";

/**
 * Returns the total size of the affected files
 */
export class AffectedFileSizeMetric extends AffectedFilesMetric {
  

   
    
    isCompatibleWithDataClump(): boolean {
        return true;
    }
    isCompatibleWithString(): boolean {
        return false;
    }
    
    evaluate(data:string|DataClumpTypeContext,context:DataClumpRefactoringContext): Promise<number> {
        if(typeof(data)=="string"){
            throw "Cannot compare string"
        }
        else  {
            let result=0
            let paths=this.getAffectedFiles(data,context)
            for( let p of paths){
                let full=resolve(context.getProjectPath(),p);
                result+=fs.statSync(full).size


            }
            return Promise.resolve(result);
        }
       
       
    }
}

