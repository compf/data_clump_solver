import { DataContextInterface } from "../../context/DataContext";
import { PipeLineStep } from "../PipeLineStep";
import { AbstractStepHandler } from "./AbstractStepHandler";

export class SimpleCodeObtainingStepHandler extends AbstractStepHandler{
    private path: string;
    handle(context: DataContextInterface) {
        context.CodeObtaining.path=this.path;
    }
    getExecutableSteps(): PipeLineStep[] {
        return [PipeLineStep.CodeObtaining]
    }
    constructor(path:string){
        super();
        this.path=path;
    }
    
}