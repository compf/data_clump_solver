import { CodeObtainingContext, DataClumpRefactoringContext } from "../../../context/DataContext";
import { PipeLineStep,PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
type SimpleCodeObtainingStepHandlerParams={
    path:string|null|undefined
    useArgPath:boolean
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
        if(args.useArgPath){
            this.path=process.argv[2];
        }
        else{
            this.path=args.path!!;
        }
        
    }
    getRequiredContextType(pipeLineStep: PipeLineStepType): string | null {
        return null;
    }
    getReturnedContextType(pipeLineStep: PipeLineStepType, context: string | null): string | null {
        return CodeObtainingContext.name;
    }
    
}