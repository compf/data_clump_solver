import { CodeObtainingContext, DataClumpRefactoringContext, ValidationContext } from "../../context/DataContext";
import { PipeLineStep, PipeLineStepType } from "../PipeLineStep";
import { AbstractStepHandler } from "../stepHandler/AbstractStepHandler";

export abstract class ValidationStepHandler extends AbstractStepHandler{
   async handle(context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
        let result=await this.validate(context)
        return context.buildNewContext(new ValidationContext(result))
    }
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.Validation]
    }
    abstract validate(context:DataClumpRefactoringContext):Promise<{success:boolean,message:string|null}>;
    getRequiredContextType(pipeLineStep: PipeLineStepType): string | null {
        return CodeObtainingContext.name;
    }
    getReturnedContextType(pipeLineStep: PipeLineStepType, contextName: string | null): string | null {
        return ValidationContext.name;
    }
}