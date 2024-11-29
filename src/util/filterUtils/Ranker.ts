import { DataClumpTypeContext } from "data-clumps-type-context";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../context/DataContext";
import { FilterOrMetric } from "./SingleItemFilter";
import { Metric, PathOrDataClump } from "./Metric";
import { InitializationRequiredMetric } from "./MetricCombiner"
function isInitializationRequired(object: any): object is InitializationRequiredMetric {
    // replace 'property' with a unique property of ReExecutePreviousHandlers
    return 'initialize' in object;
}
export type RankerArgs = {
    rankThreshold?: number,
    rankSign?: number,
    differentDataClumps?: boolean,
    strictSize?: boolean

}
import fs from "fs"
import { assignOrResolve } from "../../config/Configuration";
export class Ranker {
    private rankThreshold: number | null = null
    private rankSign: number | null = null;
    private differentDataClumps: boolean = true;
    private strictSize: boolean = false;
    constructor(args: RankerArgs) {
        assignOrResolve(this, args,{})
    }
    protected getKey(data: string | DataClumpTypeContext, context: DataClumpRefactoringContext): string {
        if (typeof data === "string") {
            return data
        }
        else {
            let dcContext = context.getByType(DataClumpDetectorContext)!
            return dcContext.createDataTypeNameClumpKey(data)
        }
    }
    protected getItem(key:string,context:DataClumpRefactoringContext, isPath:boolean):PathOrDataClump{
        if(isPath){
            return key
        }
        else{
            let dcContext = context.getByType(DataClumpDetectorContext)!
            return dcContext.getFirstDataClumpByTypeNameKey(key)
        }
    }
 
    async rank(metric: Metric, input: (string | DataClumpTypeContext)[], context: DataClumpRefactoringContext): Promise<(string | DataClumpTypeContext)[]> {
        if (this.rankThreshold == null) {
            this.rankThreshold = 1
        }
        if (this.rankSign == null) {
            this.rankSign = -1
        }
        if (this.rankThreshold! < 1) {
            this.rankThreshold = input.length * this.rankThreshold!
        }
        let isPath=typeof input[0]=="string"
        let dcContext = context.getByType(DataClumpDetectorContext)!
        let keys = Array.from(new Set(input.map((it) => this.getKey(it, context))))
        let evaluateMap: { [key: string]: number } = {}
        if (isInitializationRequired(metric)) {
            for (let key of keys) {
                let item = this.getItem(key, context,isPath)
                await metric.initialize(item, context)

            }
        }
        let keyCounter = 0
        for (let key of keys) {
            let item = this.getItem(key, context,isPath)
            let value = await metric.evaluate(item, context)
            evaluateMap[key] = value
            keyCounter++

        }
        let result = keys.sort((a, b) => this.rankSign! * (evaluateMap[a] - evaluateMap[b])).map((it) => this.getItem(it,context,isPath))
        let slicedResult:PathOrDataClump[] = []
        let counter = 0;
        let previousKey = ""
        let key_item = {}
        for (let r of result) {
            
            let typeNameKey = this.getKey(r, context)
            if (isPath || this.differentDataClumps) {
                key_item[typeNameKey] = r
            }
            else {
                key_item[typeNameKey] = []
                for (let related of dcContext.getRelatedDataClumpKeys(r as DataClumpTypeContext)) {
                    key_item[typeNameKey].push(related)
                }
            }
            const compareCount = !this.differentDataClumps ? Object.values(key_item).flat().length : Object.keys(key_item).length
            if (compareCount >= this.rankThreshold!) {
                break;
            }


        }

        slicedResult = Object.values(key_item).flat() as PathOrDataClump[]

        if (this.strictSize) {
            slicedResult = slicedResult.slice(0, this.rankThreshold!)
            return slicedResult
        }
        return slicedResult
    }

}