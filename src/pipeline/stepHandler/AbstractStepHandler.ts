import { DataClumpRefactoringContext } from "../../context/DataContext";
import { PipeLineStep,PipeLineStepType } from "../PipeLineStep";

export abstract class AbstractStepHandler{
      abstract handle(context:DataClumpRefactoringContext, params:any):Promise<DataClumpRefactoringContext>;
     abstract getExecutableSteps():PipeLineStepType[];
     canDoStep(step:PipeLineStepType):boolean{
        return this.getExecutableSteps().includes(step);
     }

     abstract getReturnedContextType(pipeLineStep:PipeLineStepType,contextName:string|null):string|null;
     abstract getRequiredContextType(pipeLineStep:PipeLineStepType):string|null;

}