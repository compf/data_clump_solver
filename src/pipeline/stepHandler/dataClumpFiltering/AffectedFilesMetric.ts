import { DataClumpTypeContext } from "data-clumps-type-context";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../../context/DataContext";
import { Metric } from "../../../util/filterUtils/Metric";
/**
 * Returns the  number of affected files
 */
export class AffectedFilesMetric implements Metric {
  

   
    
    isCompatibleWithDataClump(): boolean {
        return true;
    }
    isCompatibleWithString(): boolean {
        return false;
    }
    getAffectedFiles(data:string|DataClumpTypeContext,context:DataClumpRefactoringContext):Set<string>{
        let paths=new Set<string>();
        let dectectorContext=context.getFirstByType(DataClumpDetectorContext)!
        let related= dectectorContext.getRelatedDataClumpKeys(data as DataClumpTypeContext)
       if(related){

       
        for(let dc of related){
            paths.add(dc.from_file_path);
            paths.add(dc.to_file_path);
        }
    }
        return paths
    }
    evaluate(data:string|DataClumpTypeContext,context:DataClumpRefactoringContext): Promise<number> {
        if(data instanceof String){
            throw "Cannot compare string"
        }
        else  {
            
            let paths=this.getAffectedFiles(data,context)
            return Promise.resolve(paths.size);
        }
       
       
    }
}

