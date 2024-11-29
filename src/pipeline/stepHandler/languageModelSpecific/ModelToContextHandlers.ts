import simpleGit from "simple-git";
import { createDataClumpsTypeContext, DataClumpDetectorContext, DataClumpRefactoringContext, FileFilteringContext, getContextSerializationBasePath, getContextSerializationPath, LargeLanguageModelContext, RefactoredContext, ValidationContext } from "../../../context/DataContext";
import { resolve } from "path"
import fs from "fs"
import path from "path"
import readlineSync from "readline-sync"
import { resolveFromConcreteName } from "../../../config/Configuration";
import { ChatMessage } from "../../../util/languageModel/AbstractLanguageModel";
import { getRelevantFilesRec, nop, parseInvalidJSON, tryParseJSON, tryParseJSONWithSlice, writeFileSync } from "../../../util/Utils";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { FileIO } from "../../../util/FileIO";
import { AllFilesHandler } from "./ContextToModelHandlers";
import { skipPartiallyEmittedExpressions } from "typescript";
import { Metric } from "../../../util/filterUtils/Metric";
import { DataClumpTypeContext } from "data-clumps-type-context";
function checkPath(p: string): boolean {
    if (fs.existsSync(p) && fs.statSync(p).isFile()) {
        return true;
    }

    let folder = path.dirname(p)
    if (fs.existsSync(folder) && fs.statSync(folder).isDirectory()) {
        return true;
    }
    return false;
}
export function parsePath(filePath: string, context: DataClumpRefactoringContext): string {
    let start = 0;
    let p = filePath;
    let resolvedPath = resolve(context.getProjectPath(), p)
    let end = filePath.length - 1;
    while (p != "" && start <= end && !checkPath(resolvedPath)) {
        let m = filePath.charAt(start).match(/\w/)
        if (!filePath.charAt(start).match(/\w/)) {
            start++;
        }
        else if (!filePath.charAt(end).match(/\w/)) {
            end--;
        }
        p = filePath.substring(start, end + 1)
        resolvedPath = resolve(context.getProjectPath(), p)

    }
    if (start > end) return ""
    return p;
}



export async function parseMarkdown(context: DataClumpRefactoringContext, message: string, outputHandler: OutputHandler) {
    let insideCodeBlock = false;
    let path = "";
    let code = ""
    let foundPath = false;
    let foundCode = false;
    let changes = {}
    let lines = message.split("\n")
    for (let line of lines) {
        console.log("line", line)
        nop();

        let splitted = line.split(/\s/)

        if (!insideCodeBlock && line.includes(".java")) {
            path = parsePath(line, context);
            // throw path
            foundPath = path != "";
        }
        else if (!insideCodeBlock && line != "" && fs.existsSync(resolve(context.getProjectPath(), line.replaceAll("*", "")))) {
            if (fs.statSync(path).isFile()) {
                path = resolve(context.getProjectPath(), line.replaceAll("*", ""))
                foundPath = true;
            }

        }
        else if (line.includes("``") && !insideCodeBlock) {
            insideCodeBlock = true;
            foundCode = true;
        }
        else if (line.startsWith("``") && insideCodeBlock) {

            console.log("path", path)
            insideCodeBlock = false;
            if (path == "") {
                console.log("path not found")
            }
            else {
                changes[path] = code
                //fs.writeFileSync(path,code);

            }
            path = ""
            code = ""
        }
        else if (insideCodeBlock) {
            console.log("code", line)
            code += line + "\n"
        }
        else {
            console.log("OTHER:", line)
        }
    }

    await outputHandler.handleProposal(new ModifiedFilesProposal(changes, [
        {
            messageType: "output",
            messages: [message]
        }
    ]), context);

}
function findBestFittingLine(lines: string[], startLine: number, compareLine: string) {
    let deltas = [0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5, 6, -6, 7, -7, 8, -8, 9, -9, 10, -10]
    for (let s of deltas) {
        let line = lines[startLine + s]
        if (line != undefined) {
            if (line.trim() == compareLine.trim()) {
                return startLine + s
            }
        }

    }
}
function concatenateNewContentArrayLength(array: string[], start: number) {
    for (let i = start + 1; i < array.length; i++) {
        array[start] = array[start] + "\n" + array[i]
    }
    return array.slice(0, start + 1)

}
function getIndentation(line: string) {
    let result = "";
    if (line == undefined) return ""
    for (let c of line) {
        if (c == " " || c == "\t") {
            result += c
        }
        else {
            break;
        }
    }
    return result
}
export type ChangeType = "None" | "ReplaceText" | "SpecificLine" | "SpecificLineAll" | "NoneButReplace"
export type Change = {
    fromLine: number,
    toLine: number,
    oldContent: string,
    newContent: string
}

export function parse_piecewise_output_from_file(changes: Change[], fileContent: string, changeCallBack?: { (changeType: ChangeType, change: Change, newContent: string) }): string {
    let fileContentSplitted = fileContent.split("\n")
    let oldFileContent = fileContent
    let foundOriginal = false;
    let faultyInstance = false;
    let oldContentNewContentDiff: string[] = [];
    console.log("changes", changes)
    for (let change of changes) {
        let start = change.fromLine
        if (typeof (start) == "string") {
            start = parseInt(start)
        }
        else if (start == undefined) {
            start = 0
        }

        let newContent = change.newContent
        let oldContent = change.oldContent
        if (typeof (newContent) != "string") {
            continue;
        }
        else if (oldContent == undefined) {
            return fileContent
        }
        let oldContentPos = fileContent.indexOf(oldContent)

        if (oldContent == undefined || newContent == undefined || change.fromLine == undefined || change.toLine == undefined) {
            continue;
        }


        const MIN_LENGTH = 10

        if (oldContentPos == -1 || oldContent.length <= MIN_LENGTH) {
            let allLinesChanged = true;
            let anyLineChanged = false;
            let newContentSplitted = newContent.split("\n")
            let oldContentSplitted = oldContent.split("\n")
            if (newContentSplitted.length > oldContentSplitted.length) {
                newContentSplitted = concatenateNewContentArrayLength(newContentSplitted, oldContentSplitted.length - 1)
            }
            for (let i = 0; i < oldContentSplitted.length; i++) {
                let otherIndex = findBestFittingLine(fileContentSplitted, start + i, oldContentSplitted[i])
                if (otherIndex != undefined) {
                    anyLineChanged = true;
                    let indentOld = getIndentation(fileContentSplitted[otherIndex])
                    let indentNew = getIndentation(newContentSplitted[i])
                    let indent = indentOld.length > indentNew.length ? indentOld : indentNew;
                    if (newContentSplitted[i] != undefined) {
                        fileContentSplitted[otherIndex] = indent + newContentSplitted[i].trim()
                    }
                    else {
                        fileContentSplitted[otherIndex] = newContentSplitted[i]
                    }
                    fileContent = fileContentSplitted.join("\n")



                }
                else if (oldContentPos != -1 && oldContent != "") {
                    faultyInstance = true;
                    allLinesChanged = false;
                }
                else {
                    allLinesChanged = false;
                }



            }
            if (oldContentSplitted.length > newContentSplitted.length) {
                fileContentSplitted = fileContentSplitted.filter((it => it != undefined))
                fileContent = fileContentSplitted.join("\n")
            }


            fileContent = fileContentSplitted.join("\n")
            if (allLinesChanged) {
                changeCallBack?.call(undefined, "SpecificLineAll", change, fileContent)
            }
            else {
                if (anyLineChanged) {
                    changeCallBack?.call(undefined, "SpecificLine", change, fileContent)

                }
                else {
                    if (oldContentPos == -1) {
                        changeCallBack?.call(undefined, "None", change, fileContent)

                    }
                    else {
                        changeCallBack?.call(undefined, "NoneButReplace", change, fileContent)

                    }

                }
            }


        }
        else {
            if (oldContent != "") {
                fileContent = fileContent.replaceAll(oldContent, newContent)
                changeCallBack?.call(undefined, "ReplaceText", change, fileContent)
                fileContentSplitted = fileContent.split("\n")


            }




        }
    }


    return fileContent;

}
let allCounter = 0;
let trueCounter = 0;
export function parse_piecewise_output(content: any, fullChat: ChatMessage[], context: DataClumpRefactoringContext, outputHandler: OutputHandler): string | null {
    let changes = {};
    console.log("content", content)

    if (typeof content == "object") {
        content.date = (new Date()).toISOString();
        for (let refactoredPath of Object.keys(content.refactorings)) {
            if (refactoredPath == "extractedClasses") {

                content["extractedClasses"] = content.refactorings.extractedClasses
                delete content.refactorings["extractedClasses"]
                continue
            }
            let path = resolve(context.getProjectPath(), refactoredPath)
            if (!fs.existsSync(path) || fs.statSync(path).isDirectory()) {
                continue;
            }
            let fileContent = fs.readFileSync(path, { encoding: "utf-8" })
            fileContent = parse_piecewise_output_from_file(content.refactorings[refactoredPath], fileContent)
            changes[path] = fileContent;


        }
        if ("extractedClasses" in content) {

            for (let extractedClassPath of Object.keys(content.extractedClasses)) {
                let outPath = resolve(context.getProjectPath(), extractedClassPath)
                let classContent = content.extractedClasses[extractedClassPath]
                if (Array.isArray(classContent)) {
                    classContent = classContent[0]
                }
                else if (typeof (classContent) == "object") {
                    continue;
                }
                else if (extractedClassPath == "") {
                    continue;
                }
                changes[outPath] = classContent
            }
        }

    }
    outputHandler.handleProposal(new ModifiedFilesProposal(changes, fullChat), context);
    return content

}
export async function parseChat(fullChat: ChatMessage[], step: PipeLineStepType | null, context: DataClumpRefactoringContext, outputHandler: OutputHandler): Promise<DataClumpRefactoringContext> {

    let chat = fullChat[fullChat.length - 1]
    let resultContext: DataClumpRefactoringContext = step == PipeLineStep.DataClumpDetection ? new DataClumpDetectorContext(createDataClumpsTypeContext({}, context)) : new RefactoredContext();
    resultContext = context.buildNewContext(resultContext);
    (resultContext as any).chat = chat
    let c = chat
    {
        if (c.messageType == "output") {
            for (let m of c.messages) {
                let json = tryParseJSONWithSlice(m)

                if (step == PipeLineStep.Refactoring) {
                    if (json == null) {
                        json = parseInvalidJSON(m, " }]}}")
                    }
                    if (json == null) {


                        await parseMarkdown(context, m, outputHandler)
                    }
                    else if (typeof (json) == "object" && ("refactorings" in json)) {
                        await parse_piecewise_output(json, fullChat, context, outputHandler)
                    }
                    else if (typeof (json) == "object" && Object.values(json).length > 0 && typeof (Object.values(json)[0]) == "object") {
                        json = {
                            refactorings: json
                        }
                        parse_piecewise_output(json, fullChat, context, outputHandler)
                    }
                    else {
                        let changes = {}
                        for (let p of Object.keys(json)) {
                            let pAbs = resolve(context.getProjectPath(), p)
                            changes[pAbs] = json[p]
                            AllFilesHandler.processed.add(pAbs)


                        }
                        await outputHandler.handleProposal(new ModifiedFilesProposal(changes, fullChat), context);

                    }


                }
                else if (step == PipeLineStep.DataClumpDetection) {
                    let data_clumps_type_context = (resultContext as DataClumpDetectorContext).getDataClumpDetectionResult()
                    for (let key in json.data_clumps) {
                        let newKey = key
                        if (key in data_clumps_type_context.data_clumps) {
                            newKey = newKey + Math.random()
                        }
                        data_clumps_type_context.data_clumps[newKey] = json.data_clumps[newKey]
                    }

                }





            }
        }
    }
    return resultContext
}

export interface Proposal {
    apply(context: DataClumpRefactoringContext): DataClumpRefactoringContext
    delete(context: DataClumpRefactoringContext);
    getFullOutput(): ChatMessage[]
    evaluate(context: DataClumpRefactoringContext): Promise<number>
}

export class ModifiedFilesProposal implements Proposal {
    constructor(private modifiedFiles: { [key: string]: string }, fullOutput: ChatMessage[]) {
        this.modifiedFiles = modifiedFiles
        this.fullOutput = fullOutput
    }
    private fullOutput: ChatMessage[]
    private metric: ProposalMetric = new NumberOfLinesProposalMetric()
    evaluate(context: DataClumpRefactoringContext): Promise<number>  {
        return this.metric.evaluate(this.modifiedFiles, context)
    }
    getFullOutput(): ChatMessage[] {
        return this.fullOutput;
    }
    getModifiedFiles() {
        return this.modifiedFiles;
    }
    apply(context: DataClumpRefactoringContext): DataClumpRefactoringContext {
        let modifiedFiles = this.modifiedFiles;
        for (let p of Object.keys(modifiedFiles)) {
            let content = modifiedFiles[p]
            if (typeof (content) != "string") {
                content = content + ""
            }

            p = resolve(context.getProjectPath(), p);
            if (!(p in this.existingFiles) && fs.existsSync(p)) {
                this.existingFiles[p] = fs.readFileSync(p, { encoding: "utf-8" })
            }
            else if (!(p in this.newFiles) && !fs.existsSync(p)) {
                this.newFiles[p] = true
            }
            this.writeToFile(p, content)
        }
        return context
    }
    delete(context: DataClumpRefactoringContext) {
        for (let p of Object.keys(this.modifiedFiles)) {
            p = resolve(context.getProjectPath(), p);
            if (p in this.existingFiles) {
                this.writeToFile(p, this.existingFiles[p])
            }
            else if (p in this.newFiles) {
                fs.unlinkSync(p)

            }
        }
    }
    private existingFiles: { [key: string]: string } = {}
    private newFiles: { [key: string]: boolean } = {}
    writeToFile(fullPath: string, content: string) {
        if (Array.isArray(content)) {
            nop()
        }
        fs.mkdirSync(path.dirname(fullPath), { recursive: true })
        fs.writeFileSync(fullPath, content)
    }
}

export class DataClumpDetectionProposal implements Proposal {
    constructor(private dcContext: DataClumpDetectorContext, private fullOutput: ChatMessage[]) {

    }
    async evaluate(context: DataClumpRefactoringContext): Promise<number> {
        return 0;
    }
    getFullOutput(): ChatMessage[] {
        return this.fullOutput;
    }

    apply(context: DataClumpRefactoringContext): DataClumpRefactoringContext {
        return context.buildNewContext(this.dcContext)
    }
    delete(context: DataClumpRefactoringContext) {
        return context
    }


}

export class DataClumpFilteringProposal implements Proposal {
    private metric?: Metric

    constructor(private dc: DataClumpTypeContext, private fullOutput: ChatMessage[]) {

    }
    async evaluate(context: DataClumpRefactoringContext): Promise<number> {
        return this.metric?.evaluate(this.dc, context) || 0;
    }
    getFullOutput(): ChatMessage[] {
        return this.fullOutput;
    }

    apply(context: DataClumpRefactoringContext): DataClumpRefactoringContext {
        let dcContext = context.getByType(DataClumpDetectorContext)!
        let related = dcContext.getRelatedDataClumpKeys(this.dc)
        let filtered = dcContext.cloneLastItem();
        filtered.data_clumps = {}


        for (let r of related) {
            console.log("related", r.key)
            filtered.data_clumps[r.key] = r

        }
        return dcContext.buildNewContext(new DataClumpDetectorContext(filtered))
    }
    delete(context: DataClumpRefactoringContext) {
        return context
    }

}

export abstract class OutputHandler {
    abstract handleProposal(proposal: Proposal, context: DataClumpRefactoringContext): void;
    abstract chooseProposal(context: DataClumpRefactoringContext): Promise<DataClumpRefactoringContext>;
}
export class StubOutputHandler extends OutputHandler {
    public proposal: Proposal | null = null
    public apply: boolean = true
    handleProposal(proposal: Proposal, context: DataClumpRefactoringContext): void {
        if (this.apply)
            proposal.apply(context)
        this.proposal = proposal

    }
    chooseProposal(context: DataClumpRefactoringContext): Promise<DataClumpRefactoringContext> {
        let output: ChatMessage[] = []
        if (this.proposal != null) {
            output = this.proposal.getFullOutput()
        }
        return Promise.resolve(new LargeLanguageModelContext(output));
    }
}
export class MultipleBrancheHandler extends OutputHandler {
    private originalBranch: string = "main"
    private counter = 0;

    async handleProposal(proposal: Proposal, context: DataClumpRefactoringContext) {
        let git = simpleGit(context.getProjectPath());
        let status = await git.status()
        let originalBranch = status.current!
        this.originalBranch = originalBranch;
        await git.checkout("-Bdata_clump_proposal_" + this.counter++)
        proposal.apply(context)

        await git.add("-A");
        await git.commit("Refactored data clumps");
        await git.checkout(originalBranch)
    }
    async chooseProposal(context: DataClumpRefactoringContext): Promise<DataClumpRefactoringContext> {
        readlineSync.question("Switch to the correct branch")
        let git = simpleGit(context.getProjectPath());
        let currBranch = (await git.status()).current!;
        await git.checkout(this.originalBranch);
        return context;
    }

}
export abstract class SimpleProposalHandler extends OutputHandler {
    protected proposals: Proposal[] = []
    handleProposal(proposal: Proposal, context: DataClumpRefactoringContext): void {
        this.proposals.push(proposal)
        writeFileSync("proposal" + (new Date().getTime()) + ".json", JSON.stringify(proposal.getFullOutput(), null, 2))
    }

}
export class InteractiveProposalHandler extends SimpleProposalHandler {

    handleProposal(proposal: Proposal, context: DataClumpRefactoringContext): void {
        this.proposals.push(proposal)
        let outPath = getContextSerializationBasePath(context)

        {
            fs.writeFileSync(resolve(outPath, "proposal" + (new Date().getTime()) + ".json"), JSON.stringify(proposal.getFullOutput(), null, 2))

        }
    }

    chooseProposal(context: DataClumpRefactoringContext): Promise<DataClumpRefactoringContext> {
        const question = `
        Choose an option?
        0) Next proposal
        1) previous proposal
        2) Mark current proposal as best
        3) Return to best proposal
        4) Exit
        
        `;
        let currProposal = this.proposals[0];
        let tempContext = currProposal.apply(context);
        let bestProposalIndex = 0;
        let currProposalIndex = 0;
        let shallContinue = true;
        while (shallContinue) {
            let option = readlineSync.question(question)
            let index = parseInt(option);

            switch (index) {
                case 0:
                    tempContext = currProposal.delete(context)
                    currProposalIndex++;
                    if (currProposalIndex >= this.proposals.length) {
                        currProposalIndex = 0;
                    }
                    currProposal = this.proposals[currProposalIndex];
                    console.log(currProposalIndex, currProposal.getFullOutput())
                    tempContext = currProposal.apply(context)
                    break;
                case 1:
                    tempContext = currProposal.delete(context)
                    currProposalIndex--;
                    if (currProposalIndex < 0) {
                        currProposalIndex = this.proposals.length - 1;
                    }
                    currProposal = this.proposals[currProposalIndex];
                    tempContext = currProposal.apply(context)
                    break;
                case 2:
                    bestProposalIndex = currProposalIndex;
                    break;
                case 3:
                    tempContext = currProposal.delete(context)
                    currProposalIndex = bestProposalIndex

                    currProposal = this.proposals[currProposalIndex];
                    tempContext = currProposal.apply(context)
                case 4:
                    shallContinue = false;
                    break;
                default:
                    console.log("Invalid option")




            }
        }
        tempContext = tempContext.buildNewContext(new LargeLanguageModelContext(currProposal.getFullOutput()))
        return Promise.resolve(tempContext);
        /*if(context!=tempContext){
            return Promise.resolve(context.buildNewContext(tempContext))

        }
        else{
            return Promise.resolve(context);
        }*/
    }
}
export interface ProposalMetric {
    evaluate(modifiedFiles: { [key: string]: string; }, context: DataClumpRefactoringContext, fullOutput?: any): Promise<number> 
}
export interface ValidationMetric {
    evaluate(modifiedFiles: { [key: string]: string; }, context: DataClumpRefactoringContext, validationResult: ValidationContext, fullOutput?: any): Promise<number> 

}
export class MetricBasedProposalHandler extends SimpleProposalHandler {

    async chooseProposal(context: DataClumpRefactoringContext): Promise<DataClumpRefactoringContext> {
        let mostScoredProposalIndex = 0;
        let bestScore = 0;
        for (let i = 0; i < this.proposals.length; i++) {
            let score = await this.proposals[i].evaluate(context)
            if (score > bestScore) {
                bestScore = score;
                mostScoredProposalIndex = i
            }
        }
        console.log("Best proposal is ", mostScoredProposalIndex, bestScore, Object.keys(this.proposals[mostScoredProposalIndex]))
        let tempContext = this.proposals[mostScoredProposalIndex].apply(context)
        tempContext = tempContext.buildNewContext(new LargeLanguageModelContext(this.proposals[mostScoredProposalIndex].getFullOutput()))
        return Promise.resolve(tempContext)

    }
    private metric: ProposalMetric
    constructor(args: { proposalMetricName }) {
        super()
        this.metric = resolveFromConcreteName(args.proposalMetricName) as ProposalMetric

    }
}

export class AffectedFilesProposalMetric implements ProposalMetric {
    async evaluate(modifiedFiles: { [key: string]: string; }, context: DataClumpRefactoringContext, fullOutput?: any): Promise<number>  {
        return Object.keys(modifiedFiles).length
    }

}
export class NumberOfLinesProposalMetric implements ProposalMetric {
    async evaluate(modifiedFiles: { [key: string]: string; }, context: DataClumpRefactoringContext, fullOutput?: any): Promise<number>  {
        let result = 0
        if (fullOutput) {
            for (let key in fullOutput.refactorings) {
                for (let change of fullOutput.refactorings[key]) {
                    result += change.newContent.split("\n").length;
                }
            }
        }
        return result;
    }

}
export class SizeChangeProposalMetric implements ProposalMetric {
    async evaluate(modifiedFiles: { [key: string]: string; }, context: DataClumpRefactoringContext, fullOutput?: any): Promise<number> {
        let oldSize = 0;
        let newSize = 0
        if (fullOutput) {
            for (let key in fullOutput.refactorings) {
                for (let change of fullOutput.refactorings[key]) {
                    newSize += change.newContent.length
                    oldSize += change.oldContent.length
                }
            }
        }
        if (newSize == 0) {
            return 0
        }
        return oldSize / newSize

    }

}
