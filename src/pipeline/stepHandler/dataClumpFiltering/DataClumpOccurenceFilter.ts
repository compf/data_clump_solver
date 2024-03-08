import { DataClumpTypeContext } from "data-clumps-type-context";
import { DataClumpDetectorContext } from "../../../context/DataContext";
import { ComparisionSign, NumericalThresholdBasedFilter } from "../../../util/filterUtils/NumericalThresholdBasedFilter";
export class DataClumpOccurenceFiler extends NumericalThresholdBasedFilter {
  
    constructor(threshold: number, sign: ComparisionSign) {
        super(threshold, sign);
    }
   
    createDataClumpKey(dataClump: DataClumpTypeContext):string {
        return Object.values(dataClump.data_clump_data).sort((a,b)=>a.name.localeCompare(b.name)).map((it)=>it.type +" " +it.name   ).join(",");
        
    }
    evaluate(data:string|DataClumpTypeContext,context:DataClumpDetectorContext): Promise<number> {
        if(data instanceof String){
            throw "Cannot compare string"
        }
        else  {
            let key=this.createDataClumpKey(data["dataClump"])
            let context=data["context"];
            let occurences=0;
            for(let k of context.getDataClumpKeys() ){
                let dc=context.getDataClumpTypeContext(k);
                if(this.createDataClumpKey(dc)==key){
                    occurences++;
                }
            }
            return Promise.resolve(occurences);
        }
       
       
    }
}

