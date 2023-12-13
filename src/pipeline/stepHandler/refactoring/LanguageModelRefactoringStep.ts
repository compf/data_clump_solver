import { DataClumpDetectorContext, DataClumpRefactoringContext, UsageFindingContext } from "../../../context/DataContext";
import { PipeLineStep,PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";

export class LanguageModelRefactoringStep extends AbstractStepHandler{
    handle(context: DataClumpRefactoringContext, params: any):Promise<DataClumpRefactoringContext> {
        console.log("START!!!! refactoring")
        for(let [key,usages] of context.getByType(UsageFindingContext)!!.usages){
          
            for(let usage of usages){
                console.log("WWWWW")
                console.log(usage)
                
            }
            
        }
        return Promise.resolve(context);
        
    }
    getRequiredContextType(pipeLineStep: PipeLineStepType): string | null {
        return DataClumpDetectorContext.name
    }
    getReturnedContextType(pipeLineStep: PipeLineStepType, context: string | null): string | null {
        return UsageFindingContext.name
    }
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.Refactoring]
    }

}