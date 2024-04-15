import { DataClumpTypeContext } from "data-clumps-type-context";
import { resolveFromConcreteName } from "../../config/Configuration";
import { Metric } from "./Metric";
import { DataClumpRefactoringContext } from "../../context/DataContext";

export class MetricCombiner {
    private metrics: Metric[] = [];
    constructor(args: { metrics: string[]}) {
       for(let name of args.metrics){
              this.metrics.push(resolveFromConcreteName(name) as Metric)
       }
        
       
    }
    async evaluate(data: string | DataClumpTypeContext, context: DataClumpRefactoringContext): Promise<number> {
        let result = 1;
        for (let metric of this.metrics) {
            let r=await metric.evaluate(data, context);
            console.log(r)
            result*= r
        }
        console.log("final result",result)
        return result;
    }
    isCompatibleWithDataClump(): boolean {
        return this.metrics.every((it) => it.isCompatibleWithDataClump());
    }
    isCompatibleWithString(): boolean {
        return this.metrics.every((it) => it.isCompatibleWithString());
    }
}