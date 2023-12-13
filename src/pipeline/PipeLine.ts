import { DataClumpRefactoringContext, MandatoryContextNames } from "../context/DataContext";
import { PipeLineStep, PipeLineStepType } from "./PipeLineStep";
import { AbstractStepHandler } from "./stepHandler/AbstractStepHandler";
function difference<T> (set1:Set<T>, set2:Set<T>):Set<T>{
    let result=new Set<T>();
    for(let item of set1){
        if(!set2.has(item)){
            result.add(item)
        }
    }
    return result;

}
const NumberPipeLineSteps = Object.keys(PipeLineStep).length
export class PipeLine {
    public static readonly Instance = new PipeLine()
    private stepHandlerList: AbstractStepHandler[] = Array(NumberPipeLineSteps).fill(null);

    registerHandler(steps: PipeLineStepType[], handler: AbstractStepHandler) {
        for(let step of steps){
            if(handler.canDoStep(step ) && this.stepHandlerList[step.position]==null){
                this.stepHandlerList[step.position]=handler;
            }
            else{
                throw new Error("Handlercannot execute step "+step.name)
            }
        }
    }
    checkPipeLine(): boolean {
        let requiredContextNames=new Set<string>();
        
        let createdContextNames=new Set<string>();
        for(let i=0;i<NumberPipeLineSteps;i++){
            if(this.stepHandlerList[i]!=null){
                this.stepHandlerList[i].addAditionalContextRequirementNames(PipeLineStep[i],requiredContextNames)
               if(difference(requiredContextNames,createdContextNames).size>0){
                console.log("created",createdContextNames)
                  return false;
               }
               this.stepHandlerList[i].addCreatedContextNames(PipeLineStep[i],createdContextNames)
            }
            console.log(this.stepHandlerList[i])
            
        }
        console.log("created",createdContextNames)
        return MandatoryContextNames.every((name)=>createdContextNames.has(name));
    }
    async executeAllSteps(context: DataClumpRefactoringContext): Promise<DataClumpRefactoringContext> {
        if(!this.checkPipeLine()){
            throw new Error("Pipeline is not correct")
        }
        for (let i = 0; i < NumberPipeLineSteps; i++) {
            if (this.stepHandlerList[i] != null) {
                context = await this.stepHandlerList[i].handle(context, null);
            }
        }

        return context
    }

}