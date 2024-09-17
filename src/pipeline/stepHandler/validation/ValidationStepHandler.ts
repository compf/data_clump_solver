import { CodeObtainingContext, DataClumpRefactoringContext, ValidationContext, ValidationResult } from "../../../context/DataContext";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../../stepHandler/AbstractStepHandler";
export type ValidationInfo={
    type:string,
    filePath:string,
    lineNumber:number,
    columnNumber?:number,
    errorMessage:string
}

export type ValidationArgs={
    skipTests:boolean
}

export abstract class ValidationStepHandler extends AbstractStepHandler {
    async handle(step: PipeLineStepType, context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {

       console.log("Validating")
        let result1 =  this.validate(context)
        let result=await result1
        if (!result.success && this.throwIfInvalid) {
            context.fail(JSON.stringify(result))
        }
        return context.buildNewContext(new ValidationContext(result))
    }
    public throwIfInvalid: boolean = false;
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.Validation]
    }
    abstract  validate(context: DataClumpRefactoringContext): Promise<ValidationResult>;
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
        createdContexts.add(ValidationContext.name)
    }
    protected args: ValidationArgs;
    constructor(args: ValidationArgs) {
        super();
        this.args = args;
    }

    enableTests(){
        this.args.skipTests=false
    }
    disableTests(){
        this.args.skipTests=true
    }
}