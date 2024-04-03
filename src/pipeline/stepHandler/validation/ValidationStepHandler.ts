import { CodeObtainingContext, DataClumpRefactoringContext, ValidationContext } from "../../../context/DataContext";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../../stepHandler/AbstractStepHandler";

export abstract class ValidationStepHandler extends AbstractStepHandler {
    async handle(step: PipeLineStepType, context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {

       console.log("Validating")
        let result1 =  this.validate(context)
        let result=await result1
        if (!result.success && this.throwIfInvalid) {
            context.fail(result.messages!.stderr)
        }
        return context.buildNewContext(new ValidationContext(result))
    }
    public throwIfInvalid: boolean = true;
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.Validation]
    }
    abstract validate(context: DataClumpRefactoringContext): Promise<{ success: boolean; messages: { stderr: string, stdout: string } | null; }>
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
        createdContexts.add(ValidationContext.name)
    }
    private args: any;
    constructor(args: any) {
        super();
        this.args = args;
    }
    getPathsOfFilesWithErrors(errors: string[]): string[] {return []}
}