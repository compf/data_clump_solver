import { DataClumpRefactoringContext } from "../../../context/DataContext";
import { DataIterator, DependentOnAnotherIterator, DependentOnAnotherIteratorReturnType, InstructionIterator, InstructionReturnType, StateInformationType } from "./DependentOnAnotherIterator";

export class PromptIterator implements Iterator<InstructionReturnType,any,DataClumpRefactoringContext> {
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
    next(context:DataClumpRefactoringContext): IteratorResult<InstructionReturnType, any> {
        let messages: string[] = []
        let instructions = this.instructionsIterator.next({hasOtherFinished:this.dataIteratorDone,context})
        let data = this.dataIterator.next({hasOtherFinished:this.instructionIteratorDone,context})
        for (let message of instructions.value.messages) {
            console.log("INSTRUCTION MSG",message)
            messages.push(message)
            console.log("INSTRUCTION MSG END")

        }
        for (let message of data.value.messages) {
            console.log("DATA MSG",message)

            messages.push(message)
            console.log("DATA MSG END")
        }
        let done = instructions.done && data.done;
        this.instructionIteratorDone = instructions.done!;
        this.dataIteratorDone = data.done!;
        let iteratorResult =
        {
            messages: messages,
            clear: instructions.value.clear || data.value.clear,
            doWrite: instructions.value.doWrite,
            shallSend:instructions.value.shallSend || data.value.shallSend
        };
        return { done, value:iteratorResult }
    }
   
}