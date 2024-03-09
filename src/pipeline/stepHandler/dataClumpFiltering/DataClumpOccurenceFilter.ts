import { DataClumpTypeContext } from "data-clumps-type-context";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../../context/DataContext";
import { ComparisionSign, NumericalThresholdBasedFilter } from "../../../util/filterUtils/NumericalThresholdBasedFilter";
export class DataClumpOccurenceFilter extends NumericalThresholdBasedFilter {
  
    constructor(args:{filterThreshold: number, comparisonSign: ComparisionSign}) {
        super(args);
    }
   
    createDataClumpKey(dataClump: DataClumpTypeContext):string {
        return Object.values(dataClump.data_clump_data).sort((a,b)=>a.name.localeCompare(b.name)).map((it)=>it.type +" " +it.name   ).join(",");
        
    }
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
            let key=this.createDataClumpKey(data as DataClumpTypeContext)
            let occurences=0;
            let dectectorContext=context.getByType(DataClumpDetectorContext)!
            for(let k of dectectorContext.getDataClumpKeys() ){
                let dc=dectectorContext.getDataClumpTypeContext(k);
                if(this.createDataClumpKey(dc)==key){
                    occurences++;
                }
            }
            return Promise.resolve(occurences);
        }
       
       
    }
}

