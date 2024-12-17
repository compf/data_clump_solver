import { DataClumpTypeContext } from "data-clumps-type-context";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../../context/DataContext";
import { Metric } from "../../../util/filterUtils/Metric";

/**
 * Returns the number of occurences of a data clump.
 *  Should be square rooted to make the number more realistic because
 * it combinatorial: n*(n-1)/2
 */
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
            let dectectorContext=context.getFirstByType(DataClumpDetectorContext)!
            let related= dectectorContext.getRelatedDataClumpKeys(data as DataClumpTypeContext)
            if(related){
                return Promise.resolve(related.length);

            }
            return Promise.resolve(0)
           
        }
       
       
    }
}

