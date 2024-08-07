import { DataClumpTypeContext } from "data-clumps-type-context";
import { resolveFromConcreteName } from "../../config/Configuration";
import { Metric } from "./Metric";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../context/DataContext";
export type MetricWeight = { name: string, weight: number, metric?: Metric }
export interface InitializationRequiredMetric{
    initialize(data: string | DataClumpTypeContext, context: DataClumpRefactoringContext):Promise<void>;
}
export class MetricCombiner implements Metric, InitializationRequiredMetric{
    private metrics: MetricWeight[] = [];
    constructor(args: { metrics: MetricWeight[] }) {
        this.metrics = args.metrics

        for (let m of args.metrics) {
            m.metric = resolveFromConcreteName(m.name) as Metric
        }


    }
    scale(metricName:string,value:number):number{
        let stats=this.metricsStat[metricName]
        if(stats.max==stats.min)return value;
        return (value-stats.min)/(stats.max-stats.min)
    }
    async evaluate(data: string | DataClumpTypeContext, context: DataClumpRefactoringContext): Promise<number> {
        let result = 0;
        let key=context.getByType(DataClumpDetectorContext)!.createDataTypeNameClumpKey(data as DataClumpTypeContext);
        (context as any)[key]={};
        (context as any)[key]["metrics"]={}

        for (let metric of this.metrics) {
            let r = await metric.metric!.evaluate(data, context);
            let originalValue=r
            r=this.scale(metric.name,r)
            result += r * metric.weight;
            (context as any)[key].metrics[metric.name]=originalValue
            if(result==null || result==undefined || isNaN(result)){
                console.log("result is null",metric.name,r)
                //throw "result is null " + metric.name + " " + r + " " + metric.weight +" "+result
            }
        }
        (context as any)[key].metrics["combined"]=result;
        (context as any)[key].metrics["nameType"]=context.getByType(DataClumpDetectorContext)!.createDataTypeNameClumpKey(data as DataClumpTypeContext)
        return result;
    }
    isCompatibleWithDataClump(): boolean {
        return this.metrics.every((it) => it.metric!.isCompatibleWithDataClump());
    }
    isCompatibleWithString(): boolean {
        return this.metrics.every((it) => it.metric!.isCompatibleWithString());
    }
    private metricsStat:{[name:string]:{
        min:number,max:number
    }}={}
   async initialize(data: string | DataClumpTypeContext, context: DataClumpRefactoringContext):Promise<void>{
        for (let metric of this.metrics) {
            let r = await metric.metric!.evaluate(data, context);
           if(!(metric.name in this.metricsStat)){
                this.metricsStat[metric.name]={
                    min:r,
                    max:r
                }
           }
           else{
            let min=this.metricsStat[metric.name].min
            let max=this.metricsStat[metric.name].max
            this.metricsStat[metric.name]={
                min:Math.min(min,r),
                max:Math.max(max,r)
            }
           }
        }
    }

}