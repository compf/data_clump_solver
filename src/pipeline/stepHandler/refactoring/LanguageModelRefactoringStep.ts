import { DataContextInterface } from "../../../context/DataContext";
import { PipeLineStep } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";

export class LanguageModelRefactoringStep extends AbstractStepHandler{
    handle(context: DataContextInterface, params: any) {
        console.log("START!!!! refactoring")
        console.log(context.UsageFinding.usages)
        for(let [key,usages] of context.UsageFinding.usages){
          
            for(let usage of usages){
                console.log("WWWWW")
                console.log(usage)
                
            }
            
        }
        
    }
    getExecutableSteps(): PipeLineStep[] {
        return [PipeLineStep.Refactoring]
    }

}