import { DataClumpRefactoringContext, FileFilteringContext } from "../../../context/DataContext";
import fs from "fs"
import { Minimatch } from "minimatch";
import path from "path";
export type DependentOnAnotherIteratorReturnType = { messages: string[]; clear: boolean; doWrite: boolean; }
export type InstructionReturnType = DependentOnAnotherIteratorReturnType & { doWrite: boolean }

export abstract class DependentOnAnotherIterator<T> implements Iterator<T, any, boolean>{
    abstract next(hasOtherFinished: boolean): IteratorResult<T, any>;
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
    private context: DataClumpRefactoringContext
    constructor(context: DataClumpRefactoringContext) {
        super()
        this.context = context
    }
}
export class KeepCurrentInstructionUntilDataIteratorIsDoneIterator extends InstructionIterator {
    private counter = -1
    private allInstructions: string[]
    private doesInstructionWrite: Set<number>
    private needToClear: boolean
    constructor(instructions: string[], needToClear: boolean, doesInstructionWrite: Set<number>) {
        super()
        this.allInstructions = instructions
        this.doesInstructionWrite = doesInstructionWrite
        this.needToClear = needToClear
    }
    next(hasOtherFinished: boolean): IteratorResult<InstructionReturnType, any> {

        if (hasOtherFinished) {
            this.counter++;
        }
        if (this.counter < 0) {
            this.counter = 0
        }
        let result: InstructionReturnType = {
            clear: this.needToClear,
            doWrite: this.doesInstructionWrite.has(this.counter),
            messages: [this.allInstructions[this.counter]]
        }
        return { done: this.counter + 1 < this.allInstructions.length, value: result }
    }
}
export class AllFilesIterator extends DataIterator {
    protected allFiles:string[]=[]
    next(hasOtherFinished: boolean): IteratorResult<DependentOnAnotherIteratorReturnType, any> {
        let nextFiles = this.getNextFiles()
        let messages:string[]=[]
        for(let file of   nextFiles.files){
           let name=path.basename(file)
           let content=fs.readFileSync(file,{encoding:"utf-8"})
              messages.push("//"+name+"\n"+content)

        }
        return { done: nextFiles.done, value: { messages: messages, clear: false, doWrite: false } }


    }
    getNextFiles():{files:string[],done:boolean}{
        return {files:this.allFiles,done:true};
    }
    private fileFilteringContext: FileFilteringContext|null
    constructor(baseDir:string,context: DataClumpRefactoringContext) {
        super(context)
        this.fileFilteringContext = context.getByType<FileFilteringContext>(FileFilteringContext)
        this.getRelevantFilesRec(baseDir,this.allFiles)
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