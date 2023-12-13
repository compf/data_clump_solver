import { DataClumpRefactoringContext, getPositionByName } from "../context/DataContext";
import { PipeLineStep, PipeLineStepType } from "./PipeLineStep";
import { AbstractStepHandler } from "./stepHandler/AbstractStepHandler";
function getEnums<T extends { [key: string]: number | string }>(enumType: T): Array<[key: keyof T, value: T[keyof T]]> {
    const keys = Object.keys(enumType).filter(key => isNaN(Number(key)));
    return keys.map(key => [key, enumType[key] as T[keyof T]]);
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
        let previousContext:string|null=null;
        for(let i=0;i<NumberPipeLineSteps;i++){
            if(this.stepHandlerList[i]!=null){
                let stepHandler=this.stepHandlerList[i];
                let step=stepHandler.getExecutableSteps().filter((s)=>s.position==i)[0];
                const requiredPosition=getPositionByName(previousContext);
                let returnedContext=stepHandler.getReturnedContextType(step,previousContext);
                const returnedPosition=getPositionByName(returnedContext);
                if(requiredPosition>returnedPosition){
                    return false;
                }
                previousContext=returnedContext;

            }
            
        }
        return true;
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