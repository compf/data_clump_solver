import { DataClumpTypeContext } from "data-clumps-type-context";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../../context/DataContext";
import { Metric } from "../../../util/filterUtils/Metric";
export class AffectedFilesMetric implements Metric {
  

   
    
    isCompatibleWithDataClump(): boolean {
        return true;
    }
    isCompatibleWithString(): boolean {
        return false;
    }
    evaluate(data:string|DataClumpTypeContext,context:DataClumpRefactoringContext): Promise<number> {
        if(data instanceof String){
            throw "Cannot compare string"
        }
        else  {

            let occurences=0;
            let paths=new Set<string>();
            let dectectorContext=context.getByType(DataClumpDetectorContext)!
            let related= dectectorContext.getRelatedDataClumpKeys(data as DataClumpTypeContext)
            for(let dc of related){
                paths.add(dc.from_file_path);
                paths.add(dc.to_file_path);
            }
            
            return Promise.resolve(paths.size);
        }
       
       
    }
}

