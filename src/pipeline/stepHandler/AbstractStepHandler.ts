import { DataContextInterface } from "../../context/DataContext";
import { PipeLineStep } from "../PipeLineStep";

export abstract class AbstractStepHandler{
      abstract handle(context:DataContextInterface);
     abstract getExecutableSteps():PipeLineStep[];
     canDoStep(step:PipeLineStep):boolean{
        return this.getExecutableSteps().includes(step);
     }
}