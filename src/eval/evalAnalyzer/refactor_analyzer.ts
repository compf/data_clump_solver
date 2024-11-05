import { CodeObtainingContext, DataClumpDetectorContext, DataClumpRefactoringContext, FileFilteringContext, getContextSerializationBasePath, getContextSerializationPath } from "../../context/DataContext";
import { BaseEvaluator, getInstancePath, Instance, InstanceCombination } from "../base_eval";
import { RefactorEval } from "../eval_refactor";
import { addDataClumpSpecificMetrics, EvalAnalyzer, EvalMetric, evaluateBestFittingDataClump, getBestFittingDataClump, InstanceGeneratedData, InvalidJsonMetric, logMetric } from "./base_analyzer";
import { basename, dirname, resolve } from "path"
import fs from "fs"
import simpleGit, { DiffResult } from "simple-git";
import { DataClumpDoctorStepHandler } from "../../pipeline/stepHandler/dataClumpDetection/DataClumpDoctorStepHandler";
import { PipeLineStep } from "../../pipeline/PipeLineStep";
import { getRelevantFilesRec, makeUnique, nop } from "../../util/Utils";
import { all, get } from "axios";
import { DataClumpsTypeContext, DataClumpTypeContext } from "data-clumps-type-context";
import { AST_Class } from "../../context/AST_Type";
import { ChangeType, parse_piecewise_output_from_file } from "../../pipeline/stepHandler/languageModelSpecific/OutputHandler";
import { loadExistingContext } from "../../context/ExistingContextLoader";

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
        let metrics = [new FailureCountMetric(), new RemainingAttemptCountMetric(), new RemovedDataClumpsMetric(), new GitChangesMetric(), new CommentOutMetric(), new InvalidJsonMetric(),
        new EmptyResponseMetric(), new ResponseSizeDecrease(), new RichClassMetric(), new HarmlessErrorCategoryMetric()
        ];
        addDataClumpSpecificMetrics(metrics)
        metrics.push(new ChangeTypeMetric("None"))
        metrics.push(new ChangeTypeMetric("ReplaceText"))
        metrics.push(new ChangeTypeMetric("SpecificLine"))
        metrics.push(new ChangeTypeMetric("SpecificLineAll"))
        metrics.push(new ChangeTypeMetric("NoneButReplace"))

       // metrics=[new ResponseSizeDecrease()]


        //  metrics=[new RichClassMetric()]
        return metrics
    }
    getDataClumps(instance: InstanceGeneratedData, context: DataClumpRefactoringContext): DataClumpTypeContext[] {
        let dataClumps: DataClumpTypeContext[] = []
        if (instance.handledDataClumps) {
            return instance.handledDataClumps
        }
        for (let resp of instance.responsesParsed) {
            if (resp?.refactorings) {
                for (let p in resp.refactorings) {
                    let refact = resp.refactorings[p]
                    for (let ref of refact) {
                        if ((!(ref.oldContent)) || typeof (ref.oldContent) != "string") continue;
                        let splitted = ref.oldContent.split("\n")
                        for (let line of splitted) {
                            let dc = getBestFittingDataClump(context, line)
                            if (dc.dataClump) {
                                let surety = evaluateBestFittingDataClump(context, dc.dataClump)
                                if (surety == "match" || surety == "prettySure") {
                                    //  console.log("line",line,"matched to", dc.dataClump.key)
                                    dataClumps.push(dc.dataClump)
                                }
                            }


                        }
                    }
                }

            }
        }
        dataClumps = makeUnique(dataClumps)
        instance.handledDataClumps = dataClumps
        return dataClumps


    }
    parseLLMOutput(dirPath: string) {
        return {}
    }
    getName(): string {
        return "refactor"
    }

    async loadGeneratedData(instance: Instance, context: DataClumpRefactoringContext): Promise<InstanceGeneratedData> {
        //return super.loadGeneratedData(instance,context)
        let git = simpleGit(context.getProjectPath())

        let data = await super.loadGeneratedData(instance, context)

        let originalContext = context.getFirstByType(DataClumpDetectorContext)!
        let dirPath = getInstancePath(["evalData"], "/", instance)
        let filterContext=new FileFilteringContext([".*errors.txt"],[])
        let errorPaths:string[]=[]
        data.errorPaths=errorPaths
        getRelevantFilesRec(dirPath,errorPaths,filterContext)
        let lastPath = fs.readdirSync(dirPath).filter((it) => !it.endsWith(".json")).slice(-1)
        let p = resolve(dirPath, lastPath[0])
        if (fs.existsSync(resolve(p, "validation_count.json"))) {
            let validationResult = JSON.parse(fs.readFileSync(resolve(p, "validation_count.json"), { encoding: "utf-8" }))
            data.validationResults = validationResult.compilingResults
        }
        let branchName = getInstancePath([], "-", instance)
        let branches = await (await git.branch()).all.filter((it) => it == branchName);
        if (branches.length == 0) {
            branchName = "origin/" + branchName
        }
        let g = await git.checkout(branchName, ["-f"])
        let branchedContext = JSON.parse(fs.readFileSync(resolve(context.getProjectPath(), ".data_clump_solver_data", "dataClumpDetectorContext.json")).toString()) as DataClumpsTypeContext
        data.dataClumpDetectionResult = (branchedContext?.report_summary?.fields_to_fields_data_clump! + branchedContext?.report_summary?.parameters_to_parameters_data_clump!)!

        let g1 = await git.diffSummary([branchName, "context"])
        data.gitDiff = g1







        return data
    }
}

class RemainingAttemptCountMetric implements EvalMetric {
    async eval(instance: InstanceGeneratedData, context: DataClumpRefactoringContext): Promise<any> {
        let errorCount = 0;
        let emptyResponse=new EmptyResponseMetric()
        if(await emptyResponse.eval(instance,context)==0){
            return null;
        }
        if ( instance.validationResults.every((it) => it == 1)) {
            errorCount = instance.validationResults.length
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
    async eval(instance: InstanceGeneratedData, context: DataClumpRefactoringContext): Promise<any> {
        let invalid = 0;
        let emptyResponse=new EmptyResponseMetric()
        if(await emptyResponse.eval(instance,context)==0){
            return null;
        }
        if (instance.validationResults.every((it) => it == 1)) {
            invalid = 1
        }
        return 1 - invalid
    }
    getName(): string {
        return "ValidPrograms";
    }

}

class RemovedDataClumpsMetric implements EvalMetric {
    private initial?: number;
    private async getInitial(context: DataClumpRefactoringContext): Promise<number> {
        if (this.initial) {
            return this.initial;
        }
        else {
            let g = simpleGit(context.getProjectPath())
            await g.checkout("context")
            let ctx = JSON.parse(fs.readFileSync(resolve(context.getProjectPath(), ".data_clump_solver_data/dataClumpDetectorContext.json")).toString()) as DataClumpsTypeContext
            this.initial = ctx.report_summary.fields_to_fields_data_clump! + ctx.report_summary.parameters_to_parameters_data_clump!;
            this.initial=Math.sqrt(this.initial)
            return this.initial
        }
    }
    async eval(instance: InstanceGeneratedData, context: DataClumpRefactoringContext) {

   
        let originalContext = context.getFirstByType(DataClumpDetectorContext)!
        let afterRefactoring =Math.sqrt( instance.dataClumpDetectionResult!)!
        let initial = await this.getInitial(context)

        let removed = initial - afterRefactoring
        if(removed>0){
            nop();
        }
        removed = Math.max(removed, 0)
        return removed
    }
    getName(): string {
        return "RemovedDataClumps";
    }
}

class GitChangesMetric implements EvalMetric {
    async eval(instance: InstanceGeneratedData, context: DataClumpRefactoringContext) {
        let g1 = instance.gitDiff!
        let insertions = 0;
        let deletions = 0;
        let files = 0;
        if (!(g1)) return null;
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
    async eval(instance: InstanceGeneratedData, context: DataClumpRefactoringContext) {
        let allCounter = 0;
        let emptyCounter = 0;
        if (instance.responsePaths.length <= 0) return null as any;

        for (let i = 0; i < instance.responsesParsed.length; i++) {
            let obj = instance.responsesParsed[i];
            if (!(obj)) continue;
            if (obj?.refactorings) {
                for (let arr of Object.values(obj.refactorings)) {
                    if (Array.isArray(arr)) {
                        for (let ch of arr as any[]) {
                            if (ch == null || ch.newContent == undefined || ch.newContent == null || ch.newContent == "" || ch.newContent.trim().startsWith("//")) {
                                logMetric(this,{
                                    change:ch,
                                    reason:"Comment or removes"
                                })
                                emptyCounter++;
                            }
                            allCounter++;
                        }
                    }

                }
            }

        }
        if (allCounter == 0) {
            return null;
        }
        return 1 - emptyCounter / allCounter


    }
    getName(): string {
        return "CommentOut";
    }
}

class RichClassMetric implements EvalMetric {
    getName(): string {
        return "RichClass"
    }
    async eval(instance: InstanceGeneratedData, context: DataClumpRefactoringContext): Promise<number> {
        let counter = 0;
        let allCounter = 0
        if (instance.responsePaths.length <= 0) return null as any;
        let astPath = resolve(dirname(instance.responsePaths[0]), "extractedClassesAST")
        if (!fs.existsSync(astPath)) {
            return null as any;
        }
        let isRich = false;
        for (let p of fs.readdirSync(astPath)) {
            let obj = JSON.parse(fs.readFileSync(resolve(astPath, p)).toString());
            isRich = isRich || this.isRichClass(obj as AST_Class);
        }

        return isRich ? 1 : 0
    }
    isRichClass(astClass: AST_Class): boolean {

        for (let method of Object.values(astClass.methods)) {

            let b = false;
            if (method.parameters.length > 1) {
                
                b = true;
           logMetric(this,{methodHead:method.name+" ("+ method.parameters.map((it) => it.type + " " + it.name)+")"})

            }
            else if (method.name.startsWith("get") || method.name.startsWith("set")) {
                b = false;
            }
            else {
                b = true;
           logMetric(this,{methodHead:method.name+" ("+ method.parameters.map((it) => it.type + " " + it.name)+")"})

            }
            return b;

        }
        return false;

    }

}

class EmptyResponseMetric implements EvalMetric {
    async eval(instance: InstanceGeneratedData, context: DataClumpRefactoringContext): Promise<any> {
        let counter = 0;
        let allCounter = 0;
        if (instance.responsePaths.length <= 0) return null as any;

        for (let obj of instance.responsesParsed) {
            if (obj?.refactorings) {
                if (Object.keys(obj.refactorings).length == 0) {
                    counter++;
                }
            }
            else {
                counter++;
            }
            allCounter++
        }
        return 1 - counter / allCounter
    }
    getName(): string {
        return "EmptyResponse"
    }

}

class ResponseSizeDecrease implements EvalMetric {
    async eval(instance: InstanceGeneratedData, context: DataClumpRefactoringContext): Promise<any> {
        let oldSize = 0;
        let newSize = 0;
        if (instance.responsePaths.length <= 0) return null as any;
        for (let response of instance.responsesParsed) {
            for (let p of Object.keys(response?.refactorings ?? [])) {
                let path = resolve(context.getProjectPath(), p)
                if (!fs.existsSync(path)) continue;
                let fileContent = fs.readFileSync(path).toString();
                for (let ref of response?.refactorings[p] ?? []) {
                    oldSize += ref?.oldContent?.length ?? 0;
                    newSize += ref?.newContent?.length ?? 0
                }
            }
        }
        if (newSize == 0) return null;
        return oldSize/newSize
    }
    getName(): string {
        return "ResponseSizeDecrease"
    }

}
class ChangeTypeMetric implements EvalMetric {
    constructor(private changeType: ChangeType) {

    }
    async eval(instance: InstanceGeneratedData, context: DataClumpRefactoringContext): Promise<any> {
        let suffixes = ["refactoring"];
        suffixes.push(...Array.from({ length: 5 }, (x, i) => "validation-"+i + ""))
        let index = 0;
        let git = simpleGit(context.getProjectPath())
        let counter = 0;
        let allCounter = 0;
        if (instance.responsePaths.length <= 0) return null as any;

        for (let suff of suffixes) {
            if (index >= instance.responsesParsed.length) break;
            let instancePath = getInstancePath([], "-", instance.instance) + "-" + suff
            instancePath = instancePath.replace("instruction-instruction", "instruction")
            instancePath = instancePath.replace("instructionSnippet-instructionSnippet", "instructionSnippet")
            try {

                await git.checkout(instancePath)
            }
            catch (e) {
                continue;
            }
            for (let p of Object.keys(instance.responsesParsed[index]?.refactorings ?? [])) {
                let path = resolve(context.getProjectPath(), p)
                if (!fs.existsSync(path)) continue;
                let fileContent = fs.readFileSync(path).toString();
                fileContent = parse_piecewise_output_from_file(p, fileContent, instance.responsesParsed[index], (changeType,ch, fContent) => {
                    if (changeType == this.changeType) {
                        counter++;
                        let splitted=fileContent.split("\n")
                        const margin=10
                        logMetric(this,{
                            change:ch,
                            changeType,
                            fileContent:splitted.slice(Math.max(0,ch.fromLine-margin),Math.min(splitted.length,ch.toLine+margin))
                        })
                    }
                  
                    allCounter++

                })
            }
            index++;
        }
        if (allCounter == 0) return null
        return counter / allCounter
    }
    getName(): string {
        return "ChangeType=" + this.changeType
    }

}


class HarmlessErrorCategoryMetric implements EvalMetric {
    async eval(instance: InstanceGeneratedData, context: DataClumpRefactoringContext): Promise<any> {
        let harmlessErrorCounter = 0;
        let allErrors = 0;
        let harmless = ["cannot find symbol"]
        if (instance.responsePaths.length <= 0) return null as any;

        for (let respPath of instance.responsePaths) {
            let path = resolve(dirname(respPath), "errors.txt")
            if (fs.existsSync(path)) {
                let lines = fs.readFileSync(path).toString().split("\ņ")
                for (let line of lines) {
                    if (line.includes(".java")) {
                        if (harmless.some((it) => line.includes(it))) {
                            logMetric(this,{
                                Harmless:line
                            })
                            harmlessErrorCounter++;
                        }
                        else{
                            logMetric(this,{
                                NotHarmless:line
                            })
                        }
                        allErrors++;
                    }
                }
            }

        }
        if (allErrors == 0) return null;
        return harmlessErrorCounter / allErrors

    }
    getName(): string {
        return "HarmlessErrorCategory"
    }

}