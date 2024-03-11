import { CodeObtainingContext, DataClumpRefactoringContext } from "../../../context/DataContext";
import { PipeLineStep,PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { resolve } from "path";
type SimpleCodeObtainingStepHandlerParams={
    path:string|null|undefined
    useArgPath:boolean
}
export class SimpleCodeObtainingStepHandler extends AbstractStepHandler{
    private path: string;
    handle(step:PipeLineStepType,context: DataClumpRefactoringContext, params:any): Promise<DataClumpRefactoringContext> {
        return Promise.resolve(context.buildNewContext(new CodeObtainingContext(this.path)))
    }
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.CodeObtaining]
    }
    constructor(args:SimpleCodeObtainingStepHandlerParams){
        super();
        if(args.useArgPath){
            this.path=process.argv[2];
        }
        else{
            this.path=args.path!!;
        }
        this.path=resolve(this.path);
        
    }
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
        createdContexts.add(CodeObtainingContext.name)
    }
    
}