import { PipeLineStep } from "../PipeLineStep";
import { AbstractStepHandler } from "./AbstractStepHandler";
import { DataContextInterface } from "../../context/DataContext";

export class DoNothingStepHandler extends AbstractStepHandler {
    handle(context: DataContextInterface) {
        // do nothing
    }
    getExecutableSteps(): PipeLineStep[] {
        return [PipeLineStep.FileFiltering,PipeLineStep.DataClumpFiltering]
    }
    
}