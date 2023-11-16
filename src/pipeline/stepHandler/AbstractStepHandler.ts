import { DataClumpRefactoringContext } from "../../context/DataContext";
import { PipeLineStep } from "../PipeLineStep";

export abstract class AbstractStepHandler{
      abstract handle(context:DataClumpRefactoringContext, params:any):Promise<DataClumpRefactoringContext>;
     abstract getExecutableSteps():PipeLineStep[];
     canDoStep(step:PipeLineStep):boolean{
        return this.getExecutableSteps().includes(step);
     }
}