import { CodeObtainingContext, DataClumpRefactoringContext, ValidationContext } from "../../../context/DataContext";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../../stepHandler/AbstractStepHandler";
export type ValidationInfo={
    type:string,
    filePath:string,
    lineNumber:number,
    colNumber?:number,
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
            context.fail(JSON.stringify(result.validationInfos))
        }
        return context.buildNewContext(new ValidationContext(result.validationInfos))
    }
    public throwIfInvalid: boolean = false;
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.Validation]
    }
    abstract  validate(context: DataClumpRefactoringContext): Promise<{ success: boolean; validationInfos:ValidationInfo[] }>;
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
        createdContexts.add(ValidationContext.name)
    }
    protected args: ValidationArgs;
    constructor(args: ValidationArgs) {
        super();
        this.args = args;
    }
    getPathsOfFilesWithErrors(errors: string[]): string[] {return []}
}