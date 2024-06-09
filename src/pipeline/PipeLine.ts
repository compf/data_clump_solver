import { getContextSerializationPath } from "../config/Configuration";
import { DataClumpRefactoringContext, EvaluationContext, MandatoryContextNames } from "../context/DataContext";
import { loadExistingContext } from "../context/ExistingContextLoader";
import { PipeLineStep, PipeLineStepType } from "./PipeLineStep";
import { AbstractStepHandler } from "./stepHandler/AbstractStepHandler";
function difference<T>(set1: Set<T>, set2: Set<T>): Set<T> {
    let result = new Set<T>();
    for (let item of set1) {
        if (!set2.has(item)) {
            result.add(item)
        }
    }
    return result;

}
const NumberPipeLineSteps = Object.keys(PipeLineStep).length
export class PipeLine {
    public static readonly Instance = new PipeLine()
    private stepHandlerList: AbstractStepHandler[] = Array(NumberPipeLineSteps).fill(null);
    private stepRunningTimes:{ [stepName:string]:number}={}
    registerHandler(steps: PipeLineStepType[], handler: AbstractStepHandler) {
        for (let step of steps) {
            if (handler.canDoStep(step) && this.stepHandlerList[step.position] == null) {
                this.stepHandlerList[step.position] = handler;
            }
            else {
                throw new Error("Handlercannot execute step " + step.name)
            }
        }
    }
    checkPipeLine(): boolean {
        let requiredContextNames = new Set<string>();

        let createdContextNames = new Set<string>();
        let pipeLineSteps=Object.values(PipeLineStep)
        for (let i = 0; i < NumberPipeLineSteps; i++) {
            if (this.stepHandlerList[i] != null) {
                this.stepHandlerList[i].addAditionalContextRequirementNames(pipeLineSteps[i], requiredContextNames)
                if (difference(requiredContextNames, createdContextNames).size > 0) {
                    return false;
                }
                this.stepHandlerList[i].addCreatedContextNames(pipeLineSteps[i], createdContextNames)
            }

        }
        return MandatoryContextNames.every((name) => createdContextNames.has(name));
    }
    async executeAllSteps(context: DataClumpRefactoringContext): Promise<DataClumpRefactoringContext> {
       return await this.executeSteps(Object.values(PipeLineStep),context)
    }
    async executeSteps(pipeLineSteps:PipeLineStepType[],context: DataClumpRefactoringContext): Promise<DataClumpRefactoringContext> {
        if (!this.checkPipeLine()) {
            throw new Error("Pipeline is not correct")
        }
        for (let i = 0; i < NumberPipeLineSteps; i++) {
            let deserializedContext=loadExistingContext(pipeLineSteps[i],context)
            if(deserializedContext!=null){
                console.log("Deserialized context for step "+pipeLineSteps[i].name)
                context=context.buildNewContext(deserializedContext);
            }
           else if (this.stepHandlerList[i] != null) {
                let createdContextNames = context.getContextNames();
                let addedContextNames = new Set<string>()
                this.stepHandlerList[i].addCreatedContextNames(PipeLineStep[i], addedContextNames)
                    if(deserializedContext==null){
                    let startTime = Date.now();
                    console.log("Executing step " + pipeLineSteps[i].name)
                    context = await this.stepHandlerList[i].handle(pipeLineSteps[i],context, null);
                    this.stepRunningTimes[pipeLineSteps[i].name] = Date.now() - startTime;
                    console.log("Step " + pipeLineSteps[i].name + " executed in " + this.stepRunningTimes[pipeLineSteps[i].name] + " ms")
                    context.serialize(undefined)
                }
                else{
                    context=context.buildNewContext(deserializedContext);
                
                }
                
            }
            else{

                console.log("No handler for step "+pipeLineSteps[i].name +" "+i)
            
            }
        }
        let finalContext= context.buildNewContext(new EvaluationContext(this.stepRunningTimes))
        finalContext.serialize();
        return finalContext
        
    }

}


