import { DataClumpTypeContext } from "data-clumps-type-context";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../context/DataContext";
import { compareTo } from "../Utils";
import { SingleItemFilter } from "./SingleItemFilter";
import { filter } from "minimatch";
import { Metric } from "./Metric";
import { resolveFromName } from "../../config/Configuration";

export type ComparisionSign=">"|"<"|"<="|">="|"="
export  class NumericalThresholdBasedFilter    implements SingleItemFilter{
    private threshold: number;
    private  requiredCompareSigns:number[];
    private rankThreshold?: number=undefined;
    private rankSign?: number=undefined;
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
            this.metric=resolveFromName(args.metricName)

        }
        this.rankThreshold = args.rankThreshold;
        this.rankSign = args.rankSign;
    }
    isCompatibleWithDataClump(): boolean {
        throw new Error("Method not implemented.");
    }
    isCompatibleWithString(): boolean {
        throw new Error("Method not implemented.");
    }
    public async shallRemain(data: string|DataClumpTypeContext,context:DataClumpDetectorContext): Promise<boolean> {
        let occurences=await this.metric!.evaluate(data,context)
        return  this.requiredCompareSigns.includes(compareTo(occurences, this.threshold)) 
   
    }
   


}
