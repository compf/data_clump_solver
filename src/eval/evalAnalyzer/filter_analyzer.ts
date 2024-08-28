import { all } from "axios";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../context/DataContext";
import { DataClumpLanguageModelFilter } from "../../pipeline/stepHandler/dataClumpFiltering/DataClumpLanguageModelFilter";
import { StubInterface } from "../../util/languageModel/StubInterface";
import { BaseEvaluator, Instance } from "../base_eval";
import { FilterEval } from "../eval_filter";
import { EvalAnalyzer, EvalMetric } from "./base_analyzer";
import fs from "fs"
export class FilterAnalyzer extends EvalAnalyzer {
    getEvaluator(): BaseEvaluator {
        return new FilterEval();
    }
    getMetrics(): EvalMetric[] {
        return [new PositionOnGroundTruthMetric()];
    }
}

export class PositionOnGroundTruthMetric implements EvalMetric {
    check(context: DataClumpDetectorContext, filterResults: { [key: string]: string[] }) {
        let reduced: { [key: string]: string[] } = {}
        let allDetected: Set<string> = new Set()
        for (let key of context.getDataClumpKeys()) {
            let dc = context.getDataClumpDetectionResult().data_clumps[key];
            let typeNameKey = context.createDataTypeNameClumpKey(dc)
            allDetected.add(typeNameKey)

        }


        for (let k of Object.keys(filterResults)) {
            if (!(k in reduced)) {
                reduced[k] = []
            }
            reduced[k]=(filterResults[k].filter((v) => allDetected.has(v)));
            
        }
        return reduced

    }
    async eval(instance: Instance, dirPath: string, context: DataClumpRefactoringContext) {

        let filterResults = JSON.parse(fs.readFileSync(dirPath + "/filterResult", { encoding: "utf-8" }).toString())
        let llm = new DataClumpLanguageModelFilter({ handlers: [] } as any)
        let withNumericIds = llm.simplifyKeys(context.getByType(DataClumpDetectorContext)!.getDataClumpDetectionResult())
        context = context.buildNewContext(new DataClumpDetectorContext(withNumericIds));
        filterResults = this.check(context.getByType(DataClumpDetectorContext)!, filterResults)
        let stubInterface = new StubInterface({ responsePath: dirPath + "/response.json" })
        stubInterface.writeRequest = false
        let result = await llm.parseOutput(stubInterface, context.getByType(DataClumpDetectorContext)!)
        let k = result.key
        if (k == "") {
            console.log(await stubInterface.sendMessages(true))
        }
        console.log("result", "\"", k, "\"")
        let dc = context.getByType(DataClumpDetectorContext)!.getDataClumpDetectionResult().data_clumps[k];
        let key = (context as DataClumpDetectorContext).createDataTypeNameClumpKey(dc)
        console.log(key)
        for (let items of Object.values(filterResults) as string[]) {
            let index=items.indexOf(key)
            if(index!=-1){
                console.log("Position: ",index, items[index])
            }
            console.log(items.indexOf(key))
        }
        //console.log(key)
        //console.log("filterResults",filterResults)
        return result
    }
    getName(): string {
        return "PositionOnGroundTruthMetric";
    }

}