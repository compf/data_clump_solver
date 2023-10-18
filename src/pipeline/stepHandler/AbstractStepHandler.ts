import { DataContextInterface } from "../../context/DataContext";
import { PipeLineStep } from "../PipeLineStep";

export abstract class AbstractStepHandler{
      abstract handle(context:DataContextInterface, params:any);
     abstract getExecutableSteps():PipeLineStep[];
     canDoStep(step:PipeLineStep):boolean{
        return this.getExecutableSteps().includes(step);
     }
}