import { CodeObtainingContext, DataClumpRefactoringContext, ValidationContext } from "../../../context/DataContext";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../../stepHandler/AbstractStepHandler";

export abstract class ValidationStepHandler extends AbstractStepHandler{
   async handle(step:PipeLineStepType,context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
        let result=await this.validate(context)
        return context.buildNewContext(new ValidationContext(result))
    }
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.Validation]
    }
    abstract validate(context:DataClumpRefactoringContext):Promise<{ success: boolean; messages: {stderr:string,stdout:string} | null; }> 
   addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
       createdContexts.add(ValidationContext.name)
   }
}