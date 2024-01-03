import { DataClumpRefactoringContext, FileFilteringContext } from "../../../context/DataContext";
import fs from "fs"
import { Minimatch } from "minimatch";
import path from "path";
export type DependentOnAnotherIteratorReturnType = { messages: string[]; clear: boolean;shallSend:boolean }
export type InstructionReturnType = DependentOnAnotherIteratorReturnType & { doWrite: boolean }
export type StateInformationType = { hasOtherFinished: boolean, context: DataClumpRefactoringContext }
export abstract class DependentOnAnotherIterator<T> implements Iterator<T, any, {
    hasOtherFinished: boolean,
    context:DataClumpRefactoringContext

}>{
    abstract next(info:StateInformationType): IteratorResult<T, any>;
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
export class KeepCurrentInstructionUntilDataIteratorIsDoneIterator extends InstructionIterator {
    private counter = -1
    private allInstructionPaths: string[]
    private doesInstructionWrite: number[]
    private needToClear: boolean
    private lastInstruction: string=""
    constructor(params:{instructionPaths: string[], needToClear: boolean, doesInstructionWrite: number[]}) {
        super()
        this.allInstructionPaths = params.instructionPaths
        this.doesInstructionWrite = params.doesInstructionWrite
        this.needToClear = params.needToClear
    }
    next(info:StateInformationType): IteratorResult<InstructionReturnType, any> {
        let hasNewInstruction=false;
        if (info.hasOtherFinished||this.counter==-1) {
            this.counter++;
            if(this.counter<this.allInstructionPaths.length){
                this.lastInstruction=fs.readFileSync(this.allInstructionPaths[this.counter],{encoding:"utf-8"})
                hasNewInstruction=true;
            }
        }
        
        let result: InstructionReturnType = {
            clear: this.needToClear,
            doWrite: this.doesInstructionWrite.includes(this.counter),
            messages: hasNewInstruction?[this.lastInstruction]:[],
            shallSend:false
        }
        return { done: this.counter + 1 >= this.allInstructionPaths.length, value: result }
    }
}
export class AllFilesIterator extends DataIterator {
    protected allFiles:string[]|null=null
    fileFilteringContext: FileFilteringContext | null = null;
    next(info:StateInformationType): IteratorResult<DependentOnAnotherIteratorReturnType, any> {
        if(this.allFiles==null){
            this.allFiles=[]
            this.fileFilteringContext=info.context.getByType(FileFilteringContext)
            this.getRelevantFilesRec(info.context.getProjectPath(),this.allFiles)
        }
        let nextFiles = this.getNextFiles()
        let messages:string[]=[]
        for(let file of   nextFiles.files){
           let name=path.relative(info.context.getProjectPath(),file)
           let content=fs.readFileSync(file,{encoding:"utf-8"})
              messages.push("//"+name+"\n"+content)

        }
        return { done: nextFiles.done, value: { messages: messages, clear: false,shallSend:false } }


    }
    getNextFiles():{files:string[],done:boolean}{
        return {files:this.allFiles!,done:true};
    }

    /** 
* Recursively traverse through the directory and find all relavant files
* @param baseDir the current directory to enumerate the files there
* @param resultArray will be filled during the recursion to store all relevant files
*/
    getRelevantFilesRec(baseDir: string, resultArray: string[]): void {
        let entries = fs.readdirSync(baseDir, { withFileTypes: true });
        for (let entry of entries) {
            let fullname = path.join(baseDir, entry.name);
            if (entry.isDirectory()) {
                this.getRelevantFilesRec(fullname, resultArray);
            } else {
                if (this.shallIgnore(fullname)) {
                    continue;
                }
                resultArray.push(fullname);
            }
        }
    }
    shallIgnore(filePath: string): boolean {
        if(!filePath.endsWith(".java")){
            return true;
        }
        if(this.fileFilteringContext==null){
            return false
        }
        
        let includeGlobs = this.fileFilteringContext.includeGlobs
        let excludeGlobs = this.fileFilteringContext.excludeGlobs
        let isIncluded = includeGlobs.length == 0
        let isExcluded = false
        for (let includeGlob of includeGlobs) {
            if (new Minimatch(includeGlob).match(filePath)) {
                isIncluded = true
                break
            }
        }
        for (let excludeGlob of excludeGlobs) {
            if (new Minimatch(excludeGlob).match(filePath)) {
                isExcluded = true
                break
            }
        }
        return isExcluded || !isIncluded
    }

}
export class AllFilesThenPairsOfFileIterator extends AllFilesIterator{
    private firstPhase=true;
    private index1:number=0;
    private index2:number=1;
    next(info: StateInformationType): IteratorResult<DependentOnAnotherIteratorReturnType, any> {
        if(this.firstPhase){
            this.firstPhase=false;
            return super.next(info)
        }
        else{
            let name1=path.relative(info.context.getProjectPath(),this.allFiles![this.index1])
            let name2=path.relative(info.context.getProjectPath(),this.allFiles![this.index2])
            let combined=name1+" & "+name2
            this.index2++;
            if(this.index2>=this.allFiles!.length){
                this.index2=0;
                this.index1++;
            }
            return { done: this.index1+1>=this.allFiles!.length, value: { messages: [combined], clear: false,shallSend:false } }
        }
    }
}