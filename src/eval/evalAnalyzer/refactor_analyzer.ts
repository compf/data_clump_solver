import { CodeObtainingContext, DataClumpDetectorContext, DataClumpRefactoringContext } from "../../context/DataContext";
import { BaseEvaluator, getInstancePath, Instance, InstanceCombination } from "../base_eval";
import { RefactorEval } from "../eval_refactor";
import { EvalAnalyzer, EvalMetric, InstanceGeneratedData } from "./base_analyzer";
import { basename, dirname, resolve } from "path"
import fs from "fs"
import simpleGit, { DiffResult } from "simple-git";
import { DataClumpDoctorStepHandler } from "../../pipeline/stepHandler/dataClumpDetection/DataClumpDoctorStepHandler";
import { PipeLineStep } from "../../pipeline/PipeLineStep";
import { nop } from "../../util/Utils";
import { get } from "axios";
import { DataClumpsTypeContext } from "data-clumps-type-context";

class StubRefactorEval extends BaseEvaluator {
    analyzeInstance(instance: Instance, context: DataClumpRefactoringContext): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createInstanceCombination(): InstanceCombination {
        let refactorEval = new RefactorEval()
        return refactorEval.createInstanceCombination()
    }

}
export class RefactorAnalyzer extends EvalAnalyzer {
    getEvaluator(): BaseEvaluator {
        return new StubRefactorEval();
    }
    getMetrics(): EvalMetric[] {
        return [new FailureCountMetric(), new RemainingAttemptCountMetric(), new RemovedDataClumpsMetric(), new GitChangesMetric(), new CommentOutMetric()];
    }
    parseLLMOutput(dirPath: string) {
        return {}
    }
    getName(): string {
        return "Refactor"
    }
    originalFiles: { [key: string]: string } = {}
    newFiles: { [key: string]: boolean } = {}
    async loadOriginalFile(path: string, context: DataClumpRefactoringContext) {
        if (path in this.newFiles) {
            return
        }
        if (!(path in this.originalFiles)) {
            let git = simpleGit(context.getProjectPath())
            let g = await git.checkout("context", ["-f"])

            if (fs.existsSync(resolve(context.getProjectPath(), path))) {
                this.originalFiles[path] = fs.readFileSync(resolve(context.getProjectPath(), path), { encoding: "utf-8" })
            }
            else {
                this.newFiles[path] = true
            }
        }
    }
    async loadGeneratedData(instance: Instance, context: DataClumpRefactoringContext): Promise<InstanceGeneratedData> {
        console.log(instance)
        let git = simpleGit(context.getProjectPath())

        let data = await super.loadGeneratedData(instance, context)

        let originalContext = context.getFirstByType(DataClumpDetectorContext)!
        let dirPath = getInstancePath(["evalData"], "/", instance)

        let lastPath = fs.readdirSync(dirPath).filter((it) => !it.endsWith(".json")).slice(-1)
        let p = resolve(dirPath, lastPath[0])
        if (fs.existsSync(resolve(p, "validation_count.json"))) {
            let validationResult = JSON.parse(fs.readFileSync(resolve(p, "validation_count.json"), { encoding: "utf-8" }))
            data.validationResults = validationResult.compilingResults
        }
        let branchName=getInstancePath([], "-", instance)
        let branches=await (await git.branch()).all.filter((it)=>it==branchName);
        console.log(branches)
        if(branches.length==0){
            branchName="origin/"+branchName
        }
        let g = await git.checkout(branchName, ["-f"])
        let branchedContext = JSON.parse(fs.readFileSync(resolve(context.getProjectPath(), ".data_clump_solver_data", "dataClumpDetectorContext.json")).toString()) as DataClumpsTypeContext
        data.dataClumpDetectionResult = branchedContext.report_summary.amount_data_clumps
  
        let g1 = await git.diffSummary([branchName, "context"])
        data.gitDiff = g1
        for (let f of g1.files) {
            await  this.loadOriginalFile(f.file, context)
         }
        
 
         for (let f of g1.files) {
             if (f.file.endsWith(".java") && fs.existsSync(resolve(context.getProjectPath(), f.file))) {
                 data.fileContents[f.file] = fs.readFileSync(resolve(context.getProjectPath(), f.file), { encoding: "utf-8" })
             }
         }
       
        
    

        return data
    }
}

class RemainingAttemptCountMetric implements EvalMetric {
    eval(instance:InstanceGeneratedData,context: DataClumpRefactoringContext) {
        let errorCount=0;

        if (instance.validationResults.length == 5 && instance.validationResults.every((it) => it == 1)) {
            errorCount = 5
        }
        else {
            errorCount = instance.validationResults.length - 1

        }
        
        return 5 - errorCount
    }
    getName(): string {
        return "RemainingAttemptCount";
    }

}
class FailureCountMetric implements EvalMetric {
    eval(instance:InstanceGeneratedData,context: DataClumpRefactoringContext) {
        let invalid = 0;
        if (instance.validationResults.length == 5 && instance.validationResults.every((it) => it == 1)) {
            invalid = 1
        }
        return 1 - invalid
    }
    getName(): string {
        return "ValidPrograms";
    }

}

class RemovedDataClumpsMetric implements EvalMetric {
    async   eval(instance:InstanceGeneratedData,context: DataClumpRefactoringContext){

        let invalidMetric=new FailureCountMetric()
        if(invalidMetric.eval(instance,context)==0){
            return 0
        }

        let originalContext = context.getFirstByType(DataClumpDetectorContext)!
        let branchedContext =instance.dataClumpDetectionResult!

        let removed = originalContext.getDataClumpDetectionResult().report_summary.amount_data_clumps! - branchedContext
        return removed
    }
    getName(): string {
        return "RemovedDataClumps";
    }
}

class GitChangesMetric implements EvalMetric {
    async  eval(instance:InstanceGeneratedData,context: DataClumpRefactoringContext) {
        let g1=instance.gitDiff!
        let insertions = 0;
        let deletions = 0;
        let files = 0;
        for (let f of g1.files) {
            if (f.file.endsWith(".java")) {
                let obj = f as any
                insertions += obj.insertions
                deletions += obj.deletions
                files++
            }
        }

        return insertions + deletions + files
      
    }
    getName(): string {
        return "GitChanges";
    }
}

class CommentOutMetric implements EvalMetric {
    countCommentLines(fileContent: string[]) {
        let count = 0;
        let line = 0;
        while (line < fileContent.length) {
            if (fileContent[line].trim().startsWith("//")) {
                count++
            }
            else if (line < fileContent.length && fileContent[line].trim().startsWith("/*")) {
                count++
                while (line < fileContent.length && !fileContent[line].trim().endsWith("*/")) {
                    count++
                    line++
                }
            }
            line++
        }
        return count
    }
    async   eval(instance:InstanceGeneratedData,context: DataClumpRefactoringContext) {
        let branchedCommentLines = 0;
        let branchedAllLines = 0;
        let originalCommentLines = 0;
        let originalAllLines = 0;
        for (let f of Object.keys(instance.fileContents)) {
            if (f.endsWith(".java")) {
               if(fs.existsSync(resolve(context.getProjectPath(),f))){
                let originalContent=fs.readFileSync(resolve(context.getProjectPath(), f), { encoding: "utf-8" }).split("\n")
                originalCommentLines += this.countCommentLines(originalContent)
                originalAllLines += originalContent.length

               }
                let fileContent = instance.fileContents[f].split("\n")
                branchedCommentLines += this.countCommentLines(fileContent)
                branchedAllLines += fileContent.length
            }
        }
        if (branchedAllLines == 0 || originalAllLines == 0) {
            return 0
        }

       let branched=branchedCommentLines / branchedAllLines
         let original=originalCommentLines / originalAllLines
         return (original-branched)/original


    }
    getName(): string {
        return "CommentOut";
    }
}