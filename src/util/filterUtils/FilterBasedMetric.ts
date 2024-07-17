import { DataClumpTypeContext } from "data-clumps-type-context";
import { DataClumpRefactoringContext } from "../../context/DataContext";
import { Metric } from "./Metric";
import { resolveFromConcreteName } from "../../config/Configuration";
import { SingleItemFilter } from "./SingleItemFilter";

export class FilterBasedMetric implements Metric{
    evaluate(data: string | DataClumpTypeContext, context: DataClumpRefactoringContext): Promise<number> {
        return this.filter.shallRemain(data,context).then((result)=>{return result?this.trueValue:this.falseValue});
    }

    constructor(args:{filterName:string, trueValue:number, falseValue:number}) {
        this.filter=resolveFromConcreteName(args.filterName) as SingleItemFilter;
        this.trueValue=args.trueValue;
        this.falseValue=args.falseValue
    }
    isCompatibleWithDataClump(): boolean {
        return this.filter.isCompatibleWithDataClump();
    }
    isCompatibleWithString(): boolean {
        return this.filter.isCompatibleWithString();
    }
    private filter:SingleItemFilter;
    private trueValue:number;
    private falseValue:number;
}