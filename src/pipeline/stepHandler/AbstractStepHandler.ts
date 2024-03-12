import { DataClumpRefactoringContext } from "../../context/DataContext";
import { PipeLineStep, PipeLineStepType } from "../PipeLineStep";

export abstract class AbstractStepHandler {
   abstract handle(step:PipeLineStepType,context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext>;
   abstract getExecutableSteps(): PipeLineStepType[];
   canDoStep(step: PipeLineStepType): boolean {
      return this.getExecutableSteps().includes(step);
   }
   protected isCompatibleWithSystem():boolean{
      return true;
   }

   addAditionalContextRequirementNames(pipeLineStep: PipeLineStepType, requirements: Set<string>): void {

   }
   abstract addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void
   deserializeExistingContext(context: DataClumpRefactoringContext,step:PipeLineStepType): DataClumpRefactoringContext|null {
      return null
   }
}