import { CodeObtainingContext, DataClumpRefactoringContext } from "../../../context/DataContext";
import { PipeLineStep,PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
type SimpleCodeObtainingStepHandlerParams={
    path:string
}
export class SimpleCodeObtainingStepHandler extends AbstractStepHandler{
    private path: string;
    handle(context: DataClumpRefactoringContext, params:any): Promise<DataClumpRefactoringContext> {
        return Promise.resolve(context.buildNewContext(new CodeObtainingContext(this.path)))
    }
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.CodeObtaining]
    }
    constructor(args:SimpleCodeObtainingStepHandlerParams){
        super();
        this.path=args.path;
    }
    
}