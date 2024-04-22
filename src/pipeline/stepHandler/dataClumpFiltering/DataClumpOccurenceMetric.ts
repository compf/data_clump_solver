import { DataClumpTypeContext } from "data-clumps-type-context";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../../context/DataContext";
import { Metric } from "../../../util/filterUtils/Metric";
export class DataClumpOccurenceMetric implements Metric {
  

   
    
    
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
            let dectectorContext=context.getByType(DataClumpDetectorContext)!
            let related= dectectorContext.getRelatedDataClumpKeys(data as DataClumpTypeContext)
            return Promise.resolve(related.length);
           
        }
       
       
    }
}

