import { DataClumpRefactoringContext, FileFilteringContext, UsageFindingContext, RelevantLocationsContext, DataClumpDetectorContext } from "../../../context/DataContext";
import fs from "fs"
import { Minimatch } from "minimatch";
import path from "path";
import { resolve } from "path";
import { ChatMessage, AbstractLanguageModel, MessageType } from "../../../util/languageModel/AbstractLanguageModel";
import { getRelevantFilesRec } from "../../../util/Utils";
import { LanguageModelTemplateResolver } from "../../../util/languageModel/LanguageModelTemplateResolver";
import { DataClumpDetectorStep } from "../dataClumpDetection/DataClumpDetectorStep";
import { all } from "axios";
export type DependentOnAnotherIteratorReturnType = { messages: string[]; clear: boolean; shallSend: boolean }
export type InstructionReturnType = DependentOnAnotherIteratorReturnType & { doWrite: boolean }
export type StateInformationType = { hasOtherFinished: boolean, context: DataClumpRefactoringContext }

export abstract class LargeLanguageModelHandler {

    abstract handle(context: DataClumpRefactoringContext, api: AbstractLanguageModel, templateResolver: LanguageModelTemplateResolver): Promise<ChatMessage[]>;
}
export class SimpleInstructionHandler extends LargeLanguageModelHandler {
    private instructionPath: string
    async handle(context: DataClumpRefactoringContext, api: AbstractLanguageModel, templateResolver: LanguageModelTemplateResolver): Promise<ChatMessage[]> {
        let template = fs.readFileSync(this.instructionPath, { encoding: "utf-8" })
        let content = templateResolver.resolveTemplate(template)
        let messages = [api.prepareMessage(content, this.getMessageType())]
        return messages
    }
    constructor(args: { instructionPath: string }) {
        super()
        this.instructionPath = args.instructionPath
    }
    getMessageType(): MessageType {
        return "input"
    }

}
export class SystemInstructionHandler extends SimpleInstructionHandler {
    getMessageType(): MessageType {
        return "system"
    }
}





export class AllFilesHandler extends LargeLanguageModelHandler {
    protected allFiles: string[] = []
    fileFilteringContext: FileFilteringContext | null = null;
    handle(context: DataClumpRefactoringContext, api: AbstractLanguageModel, templateResolver: LanguageModelTemplateResolver): Promise<ChatMessage[]> {

        let usageContext = context.getRelevantLocation();
        if (usageContext == null) {
            throw new Error("Usage context not found")
        }
        let pathLinesMap: { [key: string]: Set<number> } = {}
        usageContext.getRelevantLocations(pathLinesMap)

        let messages: string[] = []
        for (let file of Object.keys(pathLinesMap)) {
            file = resolve(context.getProjectPath(), file)
            let name = path.relative(context.getProjectPath(), file)
            let content = fs.readFileSync(file, { encoding: "utf-8" })
            messages.push("//" + name + "\n" + content)

        }
        let chatMessages: ChatMessage[] = []
        for (let message of messages) {
            chatMessages.push(api.prepareMessage(message))
        }
        return Promise.resolve(chatMessages)
    }

    getNextFiles(): { files: string[], done: boolean } {
        return { files: this.allFiles!, done: true };
    }


}

export interface ReExecutePreviousHandlers {
    shallReExecute(): boolean
}
export class PairOfFileContentHandler implements ReExecutePreviousHandlers {
    getFileTuples(context): { name1: string, name2: string }[] {
        let result: { name1: string, name2: string }[] = []
        let allFiles: string[] = []
        getRelevantFilesRec(context.getProjectPath(), allFiles, context.getByType(FileFilteringContext))
        for (let index1 = 0; index1 < allFiles.length; index1++) {
            for (let index2 = index1 + 1; index2 < allFiles.length; index2++) {
                let name1 = path.relative(context.getProjectPath(), allFiles[index1])
                let name2 = path.relative(context.getProjectPath(), allFiles[index2])

                result.push({ name1, name2 })
            }
        }
        return result
    }
    private fileTuples: { name1: string, name2: string }[] | null = null
    private index = 0;
    private singleFileHandler: SingleFileHandler | null = null;
    private singleFileMode = false;
    async handle(context: DataClumpRefactoringContext, api: AbstractLanguageModel, templateResolver: LanguageModelTemplateResolver): Promise<ChatMessage[]> {
        if (this.fileTuples == null) {
            this.fileTuples = this.getFileTuples(context);
            this.singleFileHandler = new SingleFileHandler();
        }
        if (this.singleFileMode) {
            return this.singleFileHandler!.handle(context, api, templateResolver);
        }
        let f = this.fileTuples[this.index]
        let content1 = fs.readFileSync(path.resolve(context.getProjectPath(), f.name1), { encoding: "utf-8" })
        let content2 = fs.readFileSync(path.resolve(context.getProjectPath(), f.name2), { encoding: "utf-8" })
        let message = "//" + f.name1 + "\n" + content1 + "\n//" + f.name2 + "\n" + content2;
        this.index++;
        let messages: ChatMessage[] = [api.prepareMessage(message)]
        let reply = await api.sendMessages(true)
        messages.push(reply)
        if (this.index >= this.fileTuples.length) {
            this.singleFileMode = true;
        }
        return messages

    }
    shallReExecute(): boolean {
        if (this.singleFileMode) {
            return this.singleFileHandler!.shallReExecute();
        }
        return this.index < this.fileTuples!.length;
    }

}
export class SingleFileHandler extends LargeLanguageModelHandler implements ReExecutePreviousHandlers {
    private files: string[] | null = null
    private index = 0
    async handle(context: DataClumpRefactoringContext, api: AbstractLanguageModel, templateResolver: LanguageModelTemplateResolver): Promise<ChatMessage[]> {
        if (this.files == null) {
            this.files = []
            getRelevantFilesRec(context.getProjectPath(), this.files, context.getByType(FileFilteringContext))
        }
        let f = this.files[this.index]
        f = path.relative(context.getProjectPath(), f)
        let content1 = fs.readFileSync(path.resolve(context.getProjectPath(), f), { encoding: "utf-8" })
        let message = f + "\n" + content1;
        this.index++;
        let messages: ChatMessage[] = [api.prepareMessage(message)]

        return messages



    }
    shallReExecute(): boolean {
        if (this.files == null) return true;
        return this.index < this.files!.length;

    }
}

export class DirectoryBasedFilesHandler extends LargeLanguageModelHandler implements ReExecutePreviousHandlers {
    private allFiles: string[] | null = null
    private baseDirFileMap: { [key: string]: string[] } = {}
    private baseDirs: string[] = []
    private index = 0
    shallReExecute(): boolean {
        return this.index < this.baseDirs.length;
    }
    handle(context: DataClumpRefactoringContext, api: AbstractLanguageModel, templateResolver: LanguageModelTemplateResolver): Promise<ChatMessage[]> {
        if (this.allFiles == null) {
            this.allFiles = []
            getRelevantFilesRec(context.getProjectPath(), this.allFiles, context.getByType(FileFilteringContext))
            for (let file of this.allFiles) {
                let dir = path.dirname(file)
                if (this.baseDirFileMap[dir] == null) {
                    this.baseDirFileMap[dir] = []

                }
                this.baseDirFileMap[dir].push(file)

            }
            this.baseDirs = Object.keys(this.baseDirFileMap)
        }
        let currBaseDir = this.baseDirs[this.index]
        let paths = this.baseDirFileMap[currBaseDir]
        let message = ""
        for (let p of paths) {
            let name = path.relative(context.getProjectPath(), p)
            let content = fs.readFileSync(p, { encoding: "utf-8" })
            message += "//" + name + "\n" + content + "\n"
        }
        this.index++;
        return Promise.resolve([api.prepareMessage(message)])
    }
}
enum ExtractionDirection { Up, Down, UpAndDown }

export class CodeSnippetHandler extends LargeLanguageModelHandler {
    private additionalMargin = 0
    private headerMargin = 15;
    generateLines(centerLine: number, margin: number, extractionDirection: ExtractionDirection, lines: Set<number>) {
        let start = extractionDirection == ExtractionDirection.Up || extractionDirection == ExtractionDirection.UpAndDown ? centerLine - margin : centerLine;
        let end = extractionDirection == ExtractionDirection.Down || extractionDirection == ExtractionDirection.UpAndDown ? centerLine + margin : centerLine;
        start = Math.max(0, start);

        for (let i = start; i <= end; i++) {
            lines.add(i)

        }
    }
    splitIntoBlocks(lines: Set<number>, key?: string): { fromLine: number, toLine: number, key?: string }[] {
        let blocks: { fromLine: number, toLine: number, key?: string }[] = []
        let lastLine = -1
        let fromLine = -1;
        let firstIteration = true;
        let linesArray = Array.from(lines).sort((a: number, b: number) => a - b)
        for (let line of linesArray) {
            if (firstIteration) {
                firstIteration = false;
                fromLine = line
                lastLine = line;
                continue;
            }
            else if (line - lastLine > 1) {
                blocks.push({ fromLine, toLine: lastLine, key })
                fromLine = line
                lastLine = line
            }
            else {
                lastLine = line

            }
        }
        blocks.push({ fromLine, toLine: lastLine })
        return blocks;
    }
    handle(context: DataClumpRefactoringContext, api: AbstractLanguageModel, templateResolver: LanguageModelTemplateResolver): Promise<ChatMessage[]> {
        let usageContext = context.getRelevantLocation();
        if (usageContext == null) {
            throw new Error("Usage context not found")
        }
        let pathLinesMap: { [key: string]: Set<number> } = {}
        usageContext.getRelevantLocations(pathLinesMap)
        let pathLinesMapCopy: { [key: string]: Set<number> } = {}
        for (let path of Object.keys(pathLinesMap)) {
            pathLinesMapCopy[path] = new Set<number>();
            this.generateLines(0, this.headerMargin, ExtractionDirection.Up, pathLinesMapCopy[path])

            for (let line of pathLinesMap[path]) {

                this.generateLines(line, this.additionalMargin, ExtractionDirection.UpAndDown, pathLinesMapCopy[path])

            }
        }
        let resultingMessages: {
            [key: string]: {
                content: string,
                fromLine: number,
                toLine: number
            }[]
        } = {};
        for (let path of Object.keys(pathLinesMapCopy)) {
            let content = fs.readFileSync(resolve(context.getProjectPath(), path), { encoding: "utf-8" }).split("\n")
            let blocks = this.splitIntoBlocks(pathLinesMapCopy[path], undefined)
            for (let block of blocks) {
                let contentBlock = content.slice(block.fromLine, block.toLine + 1).join("\n")
                if (resultingMessages[path] == null) {
                    resultingMessages[path] = []
                }
                resultingMessages[path].push({ content: contentBlock, fromLine: block.fromLine, toLine: block.toLine })
            }

        }
        return Promise.resolve([api.prepareMessage(JSON.stringify(resultingMessages), "input")])
    }
    constructor(args: { additionalMargin?: number }) {
        super()
        if (args) {
            if (args.additionalMargin != null) {
                this.additionalMargin = args.additionalMargin
            }
        }
    }
}
export class DataClumpCodeSnippetHandler extends CodeSnippetHandler {
    handle(context: DataClumpRefactoringContext, api: AbstractLanguageModel, templateResolver: LanguageModelTemplateResolver): Promise<ChatMessage[]> {
        let dcContext = context.getByType(DataClumpDetectorContext)!;
        let pathLinesMap: { [key: string]: Set<number> } = {}
        let allBlocks: { [path: string]: { fromLine: number, toLine: number, id?: string }[] } = {}

        for (let dc of Object.values(dcContext.getDataClumpDetectionResult().data_clumps)) {
            if (!(dc.from_file_path in pathLinesMap)) {
                pathLinesMap[dc.from_file_path] = new Set<number>();
            }
            let lines = Object.values(dc.data_clump_data).map((it) => it.position.startLine)
            if (lines.some((it) => pathLinesMap[dc.from_file_path].has(it))) {
                continue;
            }
            for (let line of lines) {
                pathLinesMap[dc.from_file_path].add(line)
                this.generateLines(line, 2, ExtractionDirection.UpAndDown, pathLinesMap[dc.from_file_path])

            }

            if (!(dc.to_file_path in pathLinesMap)) {
                pathLinesMap[dc.to_file_path] = new Set<number>()
            }
            lines = Object.values(dc.data_clump_data).map((it) => it.to_variable.position.startLine)
            if (lines.some((it) => pathLinesMap[dc.to_file_path].has(it))) {
                continue;
            }
            for (let line of lines) {
                pathLinesMap[dc.to_file_path].add(line)
                this.generateLines(line, 2, ExtractionDirection.UpAndDown, pathLinesMap[dc.to_file_path])
            }

            if (!(dc.from_file_path in allBlocks)) {
                allBlocks[dc.from_file_path] = []
            }
            if (!(dc.to_file_path in allBlocks)) {
                allBlocks[dc.to_file_path] = []
            }
            let blocks = this.splitIntoBlocks(pathLinesMap[dc.from_file_path], dc.key)
            allBlocks[dc.from_file_path].push(...blocks)
            blocks = this.splitIntoBlocks(pathLinesMap[dc.to_file_path], dc.key)
            allBlocks[dc.to_file_path].push(...blocks)


        }
        return Promise.resolve([api.prepareMessage(JSON.stringify(allBlocks), "input")])

    }

}

export class SimplifiedDataClumpContextHandler extends LargeLanguageModelHandler {
    handle(context: DataClumpRefactoringContext, api: AbstractLanguageModel, templateResolver: LanguageModelTemplateResolver): Promise<ChatMessage[]> {
        let dcContext = context.getByType(DataClumpDetectorContext)!.getDataClumpDetectionResult();
        dcContext = this.simplifyJson(dcContext);
        return Promise.resolve([api.prepareMessage(JSON.stringify(dcContext), "input")])
    }
    simplifyJson(source: any): any {
        let fullTarget = {}
        source = source.data_clumps;
        for (let dcKey in source) {
            let target = {
                key: source[dcKey].key,
                data_clump_type: source[dcKey].data_clump_type,
                from_file_path: source[dcKey].from_file_path,
                from_class_or_interface_name: source[dcKey].from_class_or_interface_name,
                from_method_name: source[dcKey].from_method_name,
                to_file_path: source[dcKey].to_file_path,
                to_class_or_interface_name: source[dcKey].to_class_or_interface_name,
                to_method_name: source[dcKey].to_method_name,
                data_clump_data: {}



            }
            fullTarget[dcKey] = target
            for (let dcData of Object.keys(source[dcKey].data_clump_data)) {
                let data = source[dcKey].data_clump_data[dcData]
                target.data_clump_data[dcData] = {
                    name: data.name,
                    type: data.type,
                    modifiers: data.modifiers
                }

            }

        }


        return { data_clumps: fullTarget }
    }
    counter = 0
}
export class SendAndClearHandler extends LargeLanguageModelHandler {
    handle(context: DataClumpRefactoringContext, api: AbstractLanguageModel, templateResolver: LanguageModelTemplateResolver): Promise<ChatMessage[]> {
        return api.sendMessages(true).then((x) => {
            return [x]
        })
    }
}
export class SendHandler extends LargeLanguageModelHandler {
    handle(context: DataClumpRefactoringContext, api: AbstractLanguageModel, templateResolver: LanguageModelTemplateResolver): Promise<ChatMessage[]> {
        return api.sendMessages(false).then((x) => {
            return [x]
        })
    }
}
export interface RandomDecider {
    decide(context: DataClumpRefactoringContext): boolean
}
export class RandomIterationsDecider implements RandomDecider {
    private iterations: number
    private counter: number = 0
    decide(context: DataClumpRefactoringContext): boolean {
        return this.counter++ < this.iterations
    }
    constructor(args: { minIterations: number, maxIterations: number }) {
        this.iterations = Math.floor(Math.random() * (args.maxIterations - args.minIterations)) + args.minIterations
    }
}
export class RepeatInstructionRandomlyHandler extends SimpleInstructionHandler {
    private decider: RandomDecider = new RandomIterationsDecider({ minIterations: 1, maxIterations: 5 })
    async handle(context: DataClumpRefactoringContext, api: AbstractLanguageModel, templateResolver: LanguageModelTemplateResolver): Promise<ChatMessage[]> {
        let results: ChatMessage[] = []
        while (this.decider.decide(context)) {
            let res = await super.handle(context, api, templateResolver)
            for (let r of res) {
                results.push(r)
            }
            results.push(await api.sendMessages(false))

        }
        return results
    }
}