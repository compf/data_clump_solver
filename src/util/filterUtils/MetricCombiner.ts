import { DataClumpTypeContext } from "data-clumps-type-context";
import { resolveFromConcreteName } from "../../config/Configuration";
import { Metric } from "./Metric";
import { DataClumpRefactoringContext } from "../../context/DataContext";
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
        for (let metric of this.metrics) {
            let r = await metric.metric!.evaluate(data, context);
            result += r * metric.weight
        }
        console.log("final result", result)
        return result;
    }
    isCompatibleWithDataClump(): boolean {
        return this.metrics.every((it) => it.metric!.isCompatibleWithDataClump());
    }
    isCompatibleWithString(): boolean {
        return this.metrics.every((it) => it.metric!.isCompatibleWithString());
    }
}