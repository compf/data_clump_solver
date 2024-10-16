import { DataClumpTypeContext } from "data-clumps-type-context";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../context/DataContext";
import { compareTo } from "../Utils";
import { SingleItemFilter } from "./SingleItemFilter";
import { filter } from "minimatch";
import { Metric } from "./Metric";
import { resolveFromConcreteName } from "../../config/Configuration";

export type ComparisionSign=">"|"<"|"<="|">="|"="
export  class NumericalThresholdBasedFilter    implements SingleItemFilter{
    private threshold: number;
    private  requiredCompareSigns:number[];

    private metric?:Metric=undefined;
    constructor(args:{rankThreshold?:number,rankSign?:number,comparisonSign?:ComparisionSign,filterThreshold:number,metricName?:string}) {
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
        if(args.metricName){
            this.metric=resolveFromConcreteName(args.metricName)

        }

    }
    isCompatibleWithDataClump(): boolean {
        return this.metric?.isCompatibleWithDataClump() ?? false;
    }
    isCompatibleWithString(): boolean {
        return this.metric?.isCompatibleWithString() ?? false;
    }
    public async shallRemain(data: string|DataClumpTypeContext,context:DataClumpDetectorContext): Promise<boolean> {
        let occurences=await this.metric!.evaluate(data,context)
        return  this.requiredCompareSigns.includes(compareTo(occurences, this.threshold)) 
   
    }
   


}
