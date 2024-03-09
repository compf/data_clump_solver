import { DataClumpTypeContext } from "data-clumps-type-context";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../context/DataContext";
import { compareTo } from "../Utils";
import { SingleItemFilter } from "./SingleItemFilter";
import { Ranker } from "./Ranker";
import { filter } from "minimatch";

export type ComparisionSign=">"|"<"|"<="|">="|"="
export abstract class NumericalThresholdBasedFilter    implements SingleItemFilter,Ranker {
    private threshold: number;
    private  requiredCompareSigns:number[];
    private rankThreshold?: number=undefined;
    private rankSign?: number=undefined;
    constructor(args:{rankThreshold?:number,rankSign?:number,comparisonSign?:ComparisionSign,filterThreshold:number}) {
        this.threshold = args.filterThreshold;
        let sign=args.comparisonSign
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
        this.rankThreshold = args.rankThreshold;
        this.rankSign = args.rankSign;
    }
    public async shallRemain(data: string|DataClumpTypeContext,context:DataClumpDetectorContext): Promise<boolean> {
        let occurences=await this.evaluate(data,context)
        return  this.requiredCompareSigns.includes(compareTo(occurences, this.threshold)) 
   
    }
   
    abstract evaluate(data: string|DataClumpTypeContext,context:DataClumpRefactoringContext): Promise<number> ;
    abstract isCompatibleWithString(): boolean
    abstract isCompatibleWithDataClump(): boolean

}
