import { DataContextInterface } from "../context/DataContext";
import { PipeLineStep } from "./PipeLineStep";
import { AbstractStepHandler } from "./stepHandler/AbstractStepHandler";
function getEnums<T extends {[key: string]: number | string}>(enumType: T): Array<[key: keyof T, value: T[keyof T]]> {
    const keys = Object.keys(enumType).filter(key => isNaN(Number(key)));
    return keys.map(key => [key, enumType[key] as T[keyof T]]);
  }
export class PipeLine{
    public static readonly Instance=new PipeLine()
    private stepHandlerList: {steps:PipeLineStep[],handler:AbstractStepHandler}[]=[]

    registerHandler(steps:PipeLineStep[],handler:AbstractStepHandler){
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
    async executeAllSteps(context:DataContextInterface){
        
            for(let step in PipeLineStep){
                for(let registeredSteps of this.stepHandlerList){
                    if(registeredSteps.steps.includes(PipeLineStep[step] as any as PipeLineStep)){
                        await registeredSteps.handler.handle(context);
                    }
                }
               
            }
    }

}