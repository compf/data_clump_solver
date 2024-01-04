import { DataClumpRefactoringContext, FileFilteringContext } from "../../../context/DataContext";
import fs from "fs"
import { Minimatch } from "minimatch";
import path from "path";
import { ChatMessage, LanguageModelInterface } from "../../../util/languageModel/LanguageModelInterface";
import { getRelevantFilesRec } from "../../../util/Utils";
export type DependentOnAnotherIteratorReturnType = { messages: string[]; clear: boolean; shallSend: boolean }
export type InstructionReturnType = DependentOnAnotherIteratorReturnType & { doWrite: boolean }
export type StateInformationType = { hasOtherFinished: boolean, context: DataClumpRefactoringContext }
export abstract class DependentOnAnotherIterator<T> implements Iterator<T, any, {
    hasOtherFinished: boolean,
    context: DataClumpRefactoringContext

}>{
    abstract next(info: StateInformationType): IteratorResult<T, any>;
    return(value?: any): IteratorResult<T, any> {
        return { done: true, value: { messages: [], clear: false, doWrite: false } }

    }
    throw?(e?: any): IteratorResult<T, any> {
        return { done: true, value: { messages: [], clear: false, doWrite: false } }
    }


}
export abstract class InstructionIterator extends DependentOnAnotherIterator<InstructionReturnType>{

}
export abstract class DataIterator extends DependentOnAnotherIterator<DependentOnAnotherIteratorReturnType>{

}

export abstract class LargeLanguageModelHandler {
    applyReplacementMap(replacementMap: { [key: string]: string }, content: string): string {
        for (let r of Object.keys(replacementMap)) {
            content = content.replace(r, replacementMap[r])
        }
        return content
    }
    abstract handle(context: DataClumpRefactoringContext, api: LanguageModelInterface, replacementMap: { [key: string]: string }): Promise<ChatMessage[]>;
}
export class SimpleInstructionHandler extends LargeLanguageModelHandler {
    private instructionPath: string
    async handle(context: DataClumpRefactoringContext, api: LanguageModelInterface, replacementMap: { [key: string]: string }): Promise<ChatMessage[]> {
        let template = fs.readFileSync( this.instructionPath, { encoding: "utf-8" })
        let content = this.applyReplacementMap(replacementMap, template)
        let messages=[api.prepareMessage(content)]
        return messages
    }
    constructor(args: {instructionPath:string}) {
        super()
        this.instructionPath = args.instructionPath
    }

}

export class AllFilesHandler extends LargeLanguageModelHandler {
    protected allFiles: string[] =[]
    fileFilteringContext: FileFilteringContext | null = null;
    handle(context: DataClumpRefactoringContext, api: LanguageModelInterface, replacementMap: { [key: string]: string; }): Promise<ChatMessage[]> {

        getRelevantFilesRec(context.getProjectPath(), this.allFiles,context.getByType(FileFilteringContext))
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
export class PairsOfFilesHandler extends LargeLanguageModelHandler {
    private firstPhase = true;
    private index1: number = 0;
    private index2: number = 1;
    handle(context: DataClumpRefactoringContext, api: LanguageModelInterface, replacementMap: { [key: string]: string; }): Promise<ChatMessage[]> {
        let allFiles:string[] = []
        getRelevantFilesRec(context.getProjectPath(), allFiles,context.getByType(FileFilteringContext))
        let chatMessages: ChatMessage[] = []
        for(let index1=0;index1<allFiles.length;index1++){
            for(let index2=index1+1;index2<allFiles.length;index2++){
                let name1 = path.relative(context.getProjectPath(), allFiles[index1])
                let name2 = path.relative(context.getProjectPath(), allFiles[index2])
                let combined = name1 + " & " + name2
                chatMessages.push(api.prepareMessage(combined))
            }
        }
        return Promise.resolve(chatMessages)
       
    }
   

    
}
export class SendAndClearHandler extends LargeLanguageModelHandler {
    handle(context: DataClumpRefactoringContext, api: LanguageModelInterface, replacementMap: { [key: string]: string; }): Promise<ChatMessage[]> {
        return api.sendMessages(true).then((x) => {
            return [x]
        })
    }
}
export class SendHandler extends LargeLanguageModelHandler {
    handle(context: DataClumpRefactoringContext, api: LanguageModelInterface, replacementMap: { [key: string]: string; }): Promise<ChatMessage[]> {
        return api.sendMessages(false).then((x) => {
            return [x]
        })
    }
}
export interface RandomDecider{
    decide(context:DataClumpRefactoringContext):boolean
}
export class RandomIterationsDecider implements RandomDecider{
    private iterations:number
    private counter:number=0
    decide(context: DataClumpRefactoringContext): boolean {
        return this.counter++ <this.iterations
    }
    constructor(args:{minIterations:number,maxIterations:number}){
        this.iterations=Math.floor(Math.random()*(args.maxIterations-args.minIterations))+args.minIterations
    }
}
export class RepeatInstructionRandomlyHandler extends SimpleInstructionHandler{
    private decider:RandomDecider=new RandomIterationsDecider({minIterations:1,maxIterations:5})
    async handle(context: DataClumpRefactoringContext, api: LanguageModelInterface, replacementMap: { [key: string]: string; }): Promise<ChatMessage[]> {
       let results:ChatMessage[]=[]
        while(this.decider.decide(context)){
             let res= await  super.handle(context, api, replacementMap)
             for(let r of res){
                results.push(r)
             }
            results.push(await api.sendMessages(false))
            
        }
        return results
    }
}