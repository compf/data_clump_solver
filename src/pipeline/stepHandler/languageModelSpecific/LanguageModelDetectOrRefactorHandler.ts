import { DataClumpsTypeContext } from "data-clumps-type-context";
import { CodeObtainingContext, DataClumpDetectorContext, DataClumpRefactoringContext, FileFilteringContext, NameFindingContext, RefactoredContext, UsageFindingContext, createDataClumpsTypeContext } from "../../../context/DataContext";
import { ChatGPTInterface } from "../../../util/languageModel/ChatGPTInterface";
import { LanguageModelTemplateResolver, LanguageModelTemplateType } from "../../../util/languageModel/LanguageModelTemplateResolver";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import fs from "fs"
const Levenshtein = require("levenshtein")
import { files } from "node-dir"
import path from "path";
import { resolve } from "path"
import {  registerFromName, resolveFromConcreteName, resolveFromInterfaceName } from "../../../config/Configuration";
import { LargeLanguageModelHandler, ReExecutePreviousHandlers } from "./LargeLanguageModelHandlers";
import { ChatMessage, AbstractLanguageModel, AbstractLanguageModelCategory } from "../../../util/languageModel/AbstractLanguageModel";
import { PipeLine } from "../../PipeLine";
import { getRelevantFilesRec, indexOfSubArray, randInt, tryParseJSON } from "../../../util/Utils";
import { DataClumpDetectorStep } from "../dataClumpDetection/DataClumpDetectorStep";
import {  OutputChecker } from "../../../util/languageModel/OutputChecker";
import { InteractiveProposalHandler, MetricBasedProposalHandler, MultipleBrancheHandler, OutputHandler, StubOutputHandler } from "./OutputHandler";

function isReExecutePreviousHandlers(object: any): object is ReExecutePreviousHandlers {
    // replace 'property' with a unique property of ReExecutePreviousHandlers
    return 'shallReExecute' in object;
}
export interface NumberAttemptsProvider{
    getNumberAttempts(context:DataClumpRefactoringContext):number

}
export class ConstantNumberAttemptsProvider implements NumberAttemptsProvider{
    private numberAttempts:number
    constructor(numberAttempts:number){
        this.numberAttempts=numberAttempts
    }
    getNumberAttempts(context: DataClumpRefactoringContext): number {
        return this.numberAttempts
    }
}

export class ProposalsNumberAttemptsProvider implements NumberAttemptsProvider{
    path: string | undefined;
    constructor(args:{path?:string}){
        this.path=args.path
    }
    getNumberAttempts(context: DataClumpRefactoringContext): number {
       let path=this.path??resolve(context.getProjectPath(),".data_clump_solver_data","proposals")
       return fs.readdirSync(path).length
    }

}
export class LanguageModelDetectOrRefactorHandler extends AbstractStepHandler {
    private handlers: LargeLanguageModelHandler[] = []
    private providedApi: AbstractLanguageModel | null = null
    private temperatures: number[] = [0.1,0.5]
    private lastTemp = 0;
    private models: string[] = [""]
    private numberAttempts: NumberAttemptsProvider;;
    private outputHandler: OutputHandler = new  InteractiveProposalHandler();

    async createDataClumpLocationAndUsageFilterContext(context: DataClumpRefactoringContext): Promise<DataClumpRefactoringContext> {
        let detectionContext = context.getByType(DataClumpDetectorContext) as DataClumpDetectorContext
        let usageFindingContext = context.getByType(UsageFindingContext) as UsageFindingContext
        if (detectionContext == null) {
            return context
        }
        let relevantFiles = new Set<string>()
        //throw " "+Object.values(detectionContext.getDataClumpDetectionResult().data_clumps).length
        for (let dc of Object.values(detectionContext.getDataClumpDetectionResult().data_clumps)) {
            relevantFiles.add(dc.from_file_path)
            relevantFiles.add(dc.to_file_path)
            if (usageFindingContext != null && dc.key in usageFindingContext.getUsages()) {
                for (let usage of usageFindingContext.getUsages()[dc.key]!) {
                    //throw  usage.filePath
                    relevantFiles.add(usage.filePath)
                }
            }

        }
        let includes: string[] = Array.from(relevantFiles)
        return Promise.resolve(context.buildNewContext(new FileFilteringContext(includes, [])))
    }
    relevantFiles: string[] = []
    async handle(step: PipeLineStepType, context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
        let api: AbstractLanguageModel;
        if (this.providedApi != null) {
            api = this.providedApi
        }
        else {
            api = resolveFromInterfaceName(AbstractLanguageModel.name) as AbstractLanguageModel
        }
        let templateResolver = resolveFromConcreteName(LanguageModelTemplateResolver.name) as LanguageModelTemplateResolver
        this.providedApi = api
        let handlerIndex = 0
        getRelevantFilesRec(context.getProjectPath(), this.relevantFiles, context.getByType(FileFilteringContext));
        let numberAttempts=this.numberAttempts.getNumberAttempts(context);

        for (let i = 0; i < numberAttempts; i++) {
            api.clear();
            let temperature = this.temperatures[randInt(this.temperatures.length)]
            this.lastTemp = temperature
            let model = "gpt-4-1106-preview"
            api.resetParameters({ model, temperature })
            let chat: ChatMessage[] = []

            context = await this.createDataClumpLocationAndUsageFilterContext(context)
            for (handlerIndex = 0; handlerIndex < this.handlers.length; handlerIndex++) {
                let handler = this.handlers[handlerIndex]
                console.log("Running attempt "+i+" with handler "+handler.constructor.name )
                let messages = await handler.handle(context, api, templateResolver)
                if (isReExecutePreviousHandlers(handler) && handler.shallReExecute()) {
                    handlerIndex = -1;
                }
                else if (isReExecutePreviousHandlers(handler) && !handler.shallReExecute()) {
                    api.clear();
                }
                chat.push(...messages)
            }
            let reply = chat[chat.length - 1];
            await this.createFittingContext(reply, step, context, [])
        }
        this.outputHandler.chooseProposal(context)
        return context.buildNewContext(new RefactoredContext())



    }
    parsePath(filePath: string, context: DataClumpRefactoringContext) {

        if (fs.existsSync(resolve(context.getProjectPath(), filePath)) && fs.statSync(resolve(context.getProjectPath(), filePath)).isFile()) {
            console.log("exists")
            return resolve(context.getProjectPath(), filePath)
        }
        let bestMatchingResults = this.relevantFiles.filter((it) => it.endsWith(filePath)).sort((a, b) => a.length - b.length)
        if (bestMatchingResults.length > 0) {
            console.log("best matching", bestMatchingResults[0])
            return bestMatchingResults[0]
        }
        else {
            if (filePath.endsWith(".java")) {
                let dir = resolve(context.getProjectPath(), path.dirname(filePath))
                if (fs.existsSync(dir)) {
                    console.log("existing file")
                    return resolve(context.getProjectPath(), filePath)
                }
                else {
                    let somePath = this.relevantFiles[0]
                    console.log("somepath", somePath)
                    return resolve(path.dirname(somePath), filePath)
                }
            }
        }
        throw "Could not parse " + filePath
    }
    parseMarkdown(context: DataClumpRefactoringContext, message: string, errorMessages: string[]) {
        let insideCodeBlock = false;
        let path = "";
        let code = ""
        let foundPath = false;
        let foundCode = false;
        let changes = {}
        const pathRegex = /([a-zA-Z]:\\)?(\\?\w+)+\.java/gm
        let lines = message.split("\n")
        for (let line of lines) {
            console.log("line", line)
            if (false && !insideCodeBlock && !line.includes("\\n") && line.match(pathRegex)) {
                let m = line.match(pathRegex)!
                console.log(line)
                console.log(m)
                line = m[0]
                console.log("detected", line)
                console.log("parsing path")
                path = this.parsePath(line, context);
                // throw path
                foundPath = path != "";
            }
            else if (line.includes("``") && !insideCodeBlock) {
                insideCodeBlock = true;
                foundCode = true;
            }
            else if (line.startsWith("``") && insideCodeBlock) {

                console.log("path", path)
                insideCodeBlock = false;
                if (path == "") {
                    errorMessages.push("I could not identify a valid path in your response. I am processing your response automatically so it is important to mark the path as described")
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
        if (!foundCode) {
            errorMessages.push("I could not identify source code in your response. I am processing your response automatically so it is important to mark the coding sections as described")
        }
        if (!foundPath) {
            errorMessages.push("I could not identify a valid path in your response. I am processing your response automatically so it is important to mark the path as described")

        }
        this.outputHandler.handleProposal(changes, context, message);

    }
    async tryBuildContext(chat: ChatMessage, step: PipeLineStepType | null, context: DataClumpRefactoringContext) {
        let maxAttempts = 1
        let outputCheckers: OutputChecker[] = [];
        let shallContinue = true;
        let counter = 0
        let nextContext = context;
        while (shallContinue) {

            chat = await this.providedApi?.sendMessages(false)!

            let errorMessages: string[] = []
            nextContext = await this.createFittingContext(chat, step, context, errorMessages);
            if (errorMessages.length == 0) {
                for (let checker of outputCheckers) {
                    if (await checker.isValid("", context)) {
                        shallContinue = false;
                    }
                    else {
                        errorMessages.push(checker.getErrorMessage())

                    }
                }
            }
            this.providedApi?.prepareMessage(errorMessages.join("\n"))
            counter++;
            shallContinue = counter < maxAttempts;
        }
        return nextContext

    }
    async createFittingContext(chat: ChatMessage, step: PipeLineStepType | null, context: DataClumpRefactoringContext, errorMessages: string[]): Promise<DataClumpRefactoringContext> {

        let resultContext: DataClumpRefactoringContext = step == PipeLineStep.DataClumpDetection ? new DataClumpDetectorContext(createDataClumpsTypeContext({}, context)) : new RefactoredContext();
        resultContext = context.buildNewContext(resultContext);
        (resultContext as any).chat = chat
        let c = chat
        {
            if (c.messageType == "output") {
                for (let m of c.messages) {
                    let json = tryParseJSON(m)


                    if (step == PipeLineStep.Refactoring) {
                        if (json == null) {


                            this.parseMarkdown(context, m, errorMessages)
                        }
                        else if (typeof(json)=="object" && ("refactorings" in json)) {
                            this.parse_piecewise_output(json, context)
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

    parse_key(key: string, context: DataClumpRefactoringContext): string {
        return key
    }
    async parse_full_content(content: any, context: DataClumpRefactoringContext): Promise<string | null> {
        return Promise.resolve(null)
    }
    parse_piecewise_output(content: any, context: DataClumpRefactoringContext): string | null {
        let changes = {};

        if (typeof content == "object") {
            content.tenperature = this.lastTemp
            content.date=(new Date()).toISOString();
            for (let refactoredPath of Object.keys(content.refactorings)) {
                if (refactoredPath=="extractedClasses") {

                    content["extractedClasses"]=content.refactorings.extractedClasses
                    delete content.refactorings["extractedClasses"]
                    continue
                }
                console.log(refactoredPath)
                let path = resolve(context.getProjectPath(), refactoredPath)
                if(!fs.existsSync(path) ||  fs.statSync(path).isDirectory()){
                    continue;
                }
                let fileContent = fs.readFileSync(path, { encoding: "utf-8" })


                console.log(content.refactorings[refactoredPath])
                for (let change of content.refactorings[refactoredPath]) {
                    let lines = [change.fromLine, change.toLine]
                    let start = lines[0]
                    let end = lines[1]

                    let newContent = change.newContent
                    let oldContent = change.oldContent
                    let index = fileContent.indexOf(oldContent)
                    console.log("change", change)
                    const MAX_OFFSET = 100
                    if (false) {
                        let splitted = fileContent.split("\n")
                        for (let i = Math.max(0, start - MAX_OFFSET); i < Math.min(end + MAX_OFFSET, splitted.length); i++) {
                            console.log("CHECK", splitted[i])
                            let s = splitted[i]
                            if (s != "" && oldContent.trim().startsWith(s.trim())) {
                                let newContentSplitted = newContent.split("\n")
                                let oldContentSplitted = oldContent.split("\n")
                                for (let j = 0; j < newContentSplitted.length; j++) {
                                    s = splitted[i + j]
                                    console.log("REPLACE", s, "by", newContentSplitted[j])
                                    if (j < oldContentSplitted.length) {
                                        splitted[i + j] = newContentSplitted[j]
                                    }
                                    else {
                                        splitted.splice(i + j, 0, newContentSplitted[j])
                                    }


                                }
                            }
                        }
                        fileContent = splitted.join("\n")


                    }
                    if (oldContent != "") {
                        fileContent = fileContent.replaceAll(oldContent, newContent)

                    }
                    console.log()
                    // console.log(oldContent)
                    //console.log(newContent)
                    let startIndex = start
                    const offset = -4
                    startIndex -= offset
                    if (startIndex < 0) {
                        throw new Error("Invalid line range")
                    }



                }
                console.log(path)
                changes[path] = fileContent;
                if ("extractedClasses" in content) {


                    for (let extractedClassPath of Object.keys(content.extractedClasses)) {
                        let outPath = resolve(context.getProjectPath(), extractedClassPath)
                        changes[outPath] = content.extractedClasses[extractedClassPath]
                    }
                }

            }

        }
        console.log("handle proposal")
        this.outputHandler.handleProposal(changes, context, content);
        return content

    }
    static createFromCreatedHandlers(handlers: LargeLanguageModelHandler[], api: AbstractLanguageModel): LanguageModelDetectOrRefactorHandler {
        let step = new LanguageModelDetectOrRefactorHandler({ handlers: [],numberAttempts:1 })
        step.handlers = handlers
        step.providedApi = api
        return step
    }
    private doWrite: boolean = false;
    constructor(args: { handlers: string[], numberAttempts:string | number }) {
        super();
        Object.assign(this, args)
        if(typeof(args.numberAttempts)=="number"){
            this.numberAttempts=new ConstantNumberAttemptsProvider(args.numberAttempts)
        }
        else{
            this.numberAttempts=resolveFromConcreteName(args.numberAttempts) as NumberAttemptsProvider
        }
        this.handlers = []

        for (let handler of args.handlers) {
            this.handlers.push(resolveFromConcreteName(handler) as LargeLanguageModelHandler)
        }

    }



    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.ASTGeneration, PipeLineStep.DataClumpDetection, PipeLineStep.Refactoring]
    }
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
        if (pipeLineStep == PipeLineStep.DataClumpDetection) {
            createdContexts.add(DataClumpDetectorContext.name)
        }
        else if (pipeLineStep == PipeLineStep.Refactoring) {
            createdContexts.add(RefactoredContext.name)
        }

    }

}