import { DataClumpDetectorContext, DataClumpRefactoringContext, RefactoredContext, UsageFindingContext } from "../../../context/DataContext";
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
  addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
      createdContexts.add(RefactoredContext.name)
  }
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.Refactoring]
    }

}