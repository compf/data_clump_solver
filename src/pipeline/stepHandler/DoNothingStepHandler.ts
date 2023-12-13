import { DataClumpRefactoringContext } from "../../context/DataContext";
import { PipeLineStep,PipeLineStepType } from "../PipeLineStep";
import { AbstractStepHandler } from "./AbstractStepHandler";

export class DoNothingStepHandler extends AbstractStepHandler {
    handle(context: DataClumpRefactoringContext, params:any) {
        return Promise.resolve(context);
    }
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.FileFiltering,PipeLineStep.DataClumpFiltering]
    }
    getReturnedContextType(pipeLineStep: PipeLineStepType,contextName:string|null): string|null {
        return contextName;
    }
    getRequiredContextType(pipeLineStep: PipeLineStepType): string|null {
       return null;
    }
    
}