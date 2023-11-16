import { CodeObtainingContext, DataClumpRefactoringContext } from "../../../context/DataContext";
import { PipeLineStep } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";

export class SimpleCodeObtainingStepHandler extends AbstractStepHandler{
    private path: string;
    handle(context: DataClumpRefactoringContext, params:any): Promise<DataClumpRefactoringContext> {
        return Promise.resolve(context.buildNewContext(new CodeObtainingContext(this.path)))
    }
    getExecutableSteps(): PipeLineStep[] {
        return [PipeLineStep.CodeObtaining]
    }
    constructor(path:string){
        super();
        this.path=path;
    }
    
}