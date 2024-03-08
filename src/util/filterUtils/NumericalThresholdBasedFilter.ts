import { DataClumpTypeContext } from "data-clumps-type-context";
import { DataClumpDetectorContext } from "../../context/DataContext";
import { compareTo } from "../Utils";
import { AbstractSingleItemFilter } from "./AbstractSingleItemFilter";
import { AbstractRanker } from "./AbstractRanker";

export type ComparisionSign=">"|"<"|"<="|">="|"="
export abstract class NumericalThresholdBasedFilter implements AbstractSingleItemFilter, AbstractRanker {
    private threshold: number;
    private  requiredCompareSigns:number[];
    constructor(threshold: number, sign: ComparisionSign) {
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
    public async shallRemain(data: string|DataClumpTypeContext,context:DataClumpDetectorContext): Promise<boolean> {
        let occurences=await this.evaluate(data,context)
        return  this.requiredCompareSigns.includes(compareTo(occurences, this.threshold)) 
   
    }
   
    abstract evaluate(data: string|DataClumpTypeContext,context:DataClumpDetectorContext): Promise<number> ;
}
