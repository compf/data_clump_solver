import { compareTo } from "../../../util/Utils";
import { AbstractDataClumpFilterStepHandler } from "./AbstractDataClumpFilterStepHandler";
import { DataClumpTypeContext } from "data-clumps-type-context";
import { DataClumpDetectorContext } from "../../../context/DataContext";
export type ComparisionSign=">"|"<"|"<="|">="|"="
export class OccurenceThresholdBasedFilterHandler extends AbstractDataClumpFilterStepHandler {
    private threshold: number;
    private  requiredCompareSigns:number[];
    constructor(threshold: number, sign: ComparisionSign) {
        super();
        this.threshold = threshold;
        if(sign==">"){
            this.requiredCompareSigns=[1];
        }else if(sign=="<"){
            this.requiredCompareSigns=[-1];
        }
        else if(sign=="<="){
            this.requiredCompareSigns=[-1,0];
        }
        else if(sign==">="){
            this.requiredCompareSigns=[1,0];
        }
        else if(sign=="="){
            this.requiredCompareSigns=[0];
        }
        else{
            throw new Error("invalid sign "+sign)
        }
    }
    public shallRemain(dataClump: DataClumpTypeContext, context: DataClumpDetectorContext): boolean {
        let key=this.createDataClumpKey(dataClump)
        let occurences=this.countOccurences(key,context)
        return  this.requiredCompareSigns.includes(compareTo(occurences, this.threshold)) 
   
    }
    createDataClumpKey(dataClump: DataClumpTypeContext):string {
        return Object.values(dataClump.data_clump_data).sort((a,b)=>a.name.localeCompare(b.name)).map((it)=>it.type +" " +it.name   ).join(",");
        
    }
    countOccurences(key: string, context: DataClumpDetectorContext): number {
        let occurences=0;
        for(let k of context.getDataClumpKeys() ){
            let dc=context.getDataClumpTypeContext(k);
            if(this.createDataClumpKey(dc)==key){
                occurences++;
            }
        }
        return occurences;
    }
}

