import { DataIterator, DependentOnAnotherIterator, DependentOnAnotherIteratorReturnType, InstructionIterator, InstructionReturnType } from "./DependentOnAnotherIterator";

export class PromptIterator implements Iterator<InstructionReturnType> {
    private instructionsIterator: InstructionIterator;
    private dataIterator: DataIterator;
    private instructionIteratorDone: boolean = false;
    private dataIteratorDone: boolean = false;
    constructor(instructionsIterator: InstructionIterator, dataIterator: DataIterator) {
        this.instructionsIterator = instructionsIterator;
        this.dataIterator = dataIterator;
    }
    return?(value?: any): IteratorResult<InstructionReturnType, any> {
        return { done: true, value: { messages: [], clear: false, doWrite: false } }
    }
    throw?(e?: any): IteratorResult<InstructionReturnType, any> {
        return { done: true, value: { messages: [], clear: false, doWrite: false } }
    }
    next(): IteratorResult<DependentOnAnotherIteratorReturnType, any> {
        let messages: string[] = []
        let instructions = this.instructionsIterator.next(this.dataIteratorDone)
        let data = this.dataIterator.next(this.instructionIteratorDone)
        for (let message of instructions.value.messages) {
            messages.push(message)
        }
        for (let message of data.value.messages) {
            messages.push(message)
        }
        let done = instructions.done && data.done;
        this.instructionIteratorDone = instructions.done!;
        this.dataIteratorDone = data.done!;
        let iteratorResult =
        {
            messages: messages,
            clear: instructions.value.clear || data.value.clear,
            doWrite: instructions.value.doWrite
        };
        return { done, value:iteratorResult }
    }
   
}