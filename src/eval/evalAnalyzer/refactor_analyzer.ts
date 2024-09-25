import { CodeObtainingContext, DataClumpDetectorContext, DataClumpRefactoringContext } from "../../context/DataContext";
import { BaseEvaluator, getInstancePath, Instance, InstanceCombination } from "../base_eval";
import { RefactorEval } from "../eval_refactor";
import { EvalAnalyzer, EvalMetric } from "./base_analyzer";
import {basename,dirname,resolve} from "path"
import fs from "fs"
import simpleGit from "simple-git";
import { DataClumpDoctorStepHandler } from "../../pipeline/stepHandler/dataClumpDetection/DataClumpDoctorStepHandler";
import { PipeLineStep } from "../../pipeline/PipeLineStep";

class StubRefactorEval extends BaseEvaluator{
    analyzeInstance(instance: Instance, context: DataClumpRefactoringContext): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createInstanceCombination(): InstanceCombination {
        let refactorEval=new RefactorEval()
        return refactorEval.createInstanceCombination()
    }
    
}
export class RefactorAnalyzer extends EvalAnalyzer {
    getEvaluator(): BaseEvaluator {
        return new StubRefactorEval();
    }
    getMetrics(): EvalMetric[] {
        return [new FailureCountMetric(), new RemovedDataClumpsMetric()];
    }
    parseLLMOutput(dirPath: string) {
        return {}
    }
}

class FailureCountMetric implements EvalMetric {
    eval(instance: Instance, dirPath: string, context: DataClumpRefactoringContext, llmOutput: any) {
        dirPath=dirname(dirPath)

        let lastPath=fs.readdirSync(dirPath).filter((it)=>!it.endsWith(".json")).slice(-1)
        let p=resolve(dirPath,lastPath[0])
        if(!fs.existsSync(resolve(p,"validation_count.json"))){
            return {errorCount:5}
        }
        let data=JSON.parse(fs.readFileSync(resolve(dirPath,lastPath[0],"validation_count.json"),{encoding:"utf-8"}))
        let errorCount;
        if(data.compilingResults.length==5){
            errorCount=5
        }
        else{
            errorCount=data.compilingResults.length-1
        }
        return {
            errorCount:5-errorCount
        }
    } 
    getName(): string {
        return "FailureCount";
    }

}

class RemovedDataClumpsMetric implements EvalMetric{
    async eval(instance: Instance, dirPath: string, context: DataClumpRefactoringContext, llmOutput: any) {
        let git = simpleGit(context.getProjectPath())
        let g = await git.checkout(  getInstancePath([], "-", instance))

        let detector=new DataClumpDoctorStepHandler({})
        let originalContext=context.getFirstByType(DataClumpDetectorContext)!
        let branchedContext=new CodeObtainingContext(context.getProjectPath()) as DataClumpRefactoringContext
         branchedContext=context.buildNewContext(await detector.handle(PipeLineStep.DataClumpDetection   ,branchedContext,{})) as DataClumpDetectorContext

        let removed=originalContext.getDataClumpDetectionResult().report_summary.amount_data_clumps!-(branchedContext as DataClumpDetectorContext).getDataClumpDetectionResult().report_summary.amount_data_clumps!
        return {removedDataClumps:removed}
    }
    getName(): string {
        return "RemovedDataClumps";
    }
}