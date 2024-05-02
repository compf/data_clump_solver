import { DataClumpTypeContext } from "data-clumps-type-context";
import { resolveFromConcreteName } from "../../config/Configuration";
import { Metric } from "./Metric";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../context/DataContext";
export type MetricWeight = { name: string, weight: number, metric?: Metric }
export class MetricCombiner {
    private metrics: MetricWeight[] = [];
    constructor(args: { metrics: MetricWeight[] }) {
        this.metrics = args.metrics

        for (let m of args.metrics) {
            m.metric = resolveFromConcreteName(m.name) as Metric
        }


    }
    async evaluate(data: string | DataClumpTypeContext, context: DataClumpRefactoringContext): Promise<number> {
        let result = 0;
        (data as any).metrics={}
        for (let metric of this.metrics) {
            let r = await metric.metric!.evaluate(data, context);
            result += r * metric.weight;
            (data as any).metrics[metric.name]=r
            if(result==null || result==undefined || isNaN(result)){
                console.log("result is null")
                throw "result is null " + metric.name + " " + r + " " + metric.weight +" "+result
            }
        }
        (data as any).metrics["combined"]=result;
        (data as any).metrics["nameType"]=context.getByType(DataClumpDetectorContext)!.createDataTypeNameClumpKey(data as DataClumpTypeContext)
        return result;
    }
    isCompatibleWithDataClump(): boolean {
        return this.metrics.every((it) => it.metric!.isCompatibleWithDataClump());
    }
    isCompatibleWithString(): boolean {
        return this.metrics.every((it) => it.metric!.isCompatibleWithString());
    }
}