import { DataClumpRefactoringContext, FileFilteringContext, UsageFindingContext } from "../../../context/DataContext";
import fs from "fs"
import { Minimatch } from "minimatch";
import path from "path";
import { resolve } from "path";
import { ChatMessage, AbstractLanguageModel, MessageType } from "../../../util/languageModel/AbstractLanguageModel";
import { getRelevantFilesRec } from "../../../util/Utils";
import { LanguageModelTemplateResolver } from "../../../util/languageModel/LanguageModelTemplateResolver";
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
        let messages = [api.prepareMessage(content,this.getMessageType())]
        return messages
    }
    constructor(args: { instructionPath: string }) {
        super()
        this.instructionPath = args.instructionPath
    }
    getMessageType():MessageType{
        return "input"
    }

}
export class SystemInstructionHandler extends SimpleInstructionHandler {
    getMessageType():MessageType{
        return "system"
    }
}





export class AllFilesHandler extends LargeLanguageModelHandler {
    protected allFiles: string[] = []
    fileFilteringContext: FileFilteringContext | null = null;
    handle(context: DataClumpRefactoringContext, api: AbstractLanguageModel, templateResolver:LanguageModelTemplateResolver): Promise<ChatMessage[]> {

        getRelevantFilesRec(context.getProjectPath(), this.allFiles, context.getByType(FileFilteringContext))
        let messages: string[] = []
        for (let file of this.allFiles) {
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
export class PairOfFileContentHandler  implements ReExecutePreviousHandlers {
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

export class DirectoryBasedFilesHandler extends LargeLanguageModelHandler implements ReExecutePreviousHandlers{
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
export class CodeSnippetHandler extends LargeLanguageModelHandler {
    private additionalMargin=2
    handle(context: DataClumpRefactoringContext, api: AbstractLanguageModel, templateResolver: LanguageModelTemplateResolver): Promise<ChatMessage[]> {
        let usageContext=context.getByType(UsageFindingContext)
        if(usageContext==null){
            throw new Error("Usage context not found")
        }
        let pathLinesMap:{[key:string]:Set<number>}={}
        let allUsages=usageContext.getUsages()
        for(let usages of Object.values(allUsages)){
            for(let usage of usages){
                if(usage.filePath.startsWith("/")){
                    usage.filePath=usage.filePath.slice(1)
                }
                if(!(usage.filePath in pathLinesMap)){
                   
                    pathLinesMap[usage.filePath]=new Set<number>()
                }
                for(let i=usage.range.startLine-this.additionalMargin;i<=usage.range.endLine+this.additionalMargin;i++){    
                    pathLinesMap[usage.filePath].add(i)
                }
               
            }
        }
        let resultingMessages:{[key:string]:{
            content:string,
            fromLine:number,
            toLine:number
        }[]}={};
        for(let path of Object.keys(pathLinesMap)){
            let content=fs.readFileSync(resolve(context.getProjectPath(),path) ,{encoding:"utf-8"}).split("\n")
            let lastLine=-1
            let fromLine=-1;
            let firstIteration=true;
            resultingMessages[path]=[]
            let lines=Array.from(pathLinesMap[path] ).sort((a:number,b:number)=>a-b)
            for(let line of lines){
                line=line
                if(firstIteration){
                    firstIteration=false;
                    fromLine=line
                    lastLine=line
                }
                else if(line-lastLine>1){
                    resultingMessages[path].push({content:content.slice(fromLine,lastLine+1).join("\n"),fromLine,toLine:lastLine})
                    fromLine=line
                    lastLine=line
                }
                else {
                    lastLine=line
                
                }
            }
            resultingMessages[path].push({content:content.slice(fromLine,lastLine+1).join("\n"),fromLine,toLine:lastLine})

        }
      return Promise.resolve( [api.prepareMessage(JSON.stringify(resultingMessages), "input")])
    }
    constructor(args:{additionalMargin?:number}){
        super()
        if(args){
            if(args.additionalMargin!=null){
                this.additionalMargin=args.additionalMargin
            }
        }
    }
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
        return Promise.resolve([])
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