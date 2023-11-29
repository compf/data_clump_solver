import { DataClumpRefactoringContext } from "../context/DataContext";
import { PipeLineStep,PipeLineStepType } from "./PipeLineStep";
import { AbstractStepHandler } from "./stepHandler/AbstractStepHandler";
function getEnums<T extends {[key: string]: number | string}>(enumType: T): Array<[key: keyof T, value: T[keyof T]]> {
    const keys = Object.keys(enumType).filter(key => isNaN(Number(key)));
    return keys.map(key => [key, enumType[key] as T[keyof T]]);
  }
export class PipeLine{
    public static readonly Instance=new PipeLine()
    private stepHandlerList: {steps:PipeLineStepType[],handler:AbstractStepHandler}[]=[]

    registerHandler(steps:PipeLineStepType[],handler:AbstractStepHandler){
        if(steps.every((s)=>handler.canDoStep(s))){
            for(let registeredSteps of this.stepHandlerList){
                if(steps.some((s)=>registeredSteps.steps.includes(s))){
                     throw new Error(` Some of Steps ${steps.join(",")} have already been registered ` )

                }
            }
            this.stepHandlerList.push({steps,handler})
        }
        else{
            throw new Error(`Cannot register ${handler} to step ${steps.join(",")} ` )
        }
    }
    async executeAllSteps(context:DataClumpRefactoringContext){
        
            for(let step in PipeLineStep){
                for(let registeredSteps of this.stepHandlerList){
                    if(registeredSteps.steps.includes(PipeLineStep[step])){
                        context=await registeredSteps.handler.handle(context,null);
                    }
                }
               
            }
    }

}