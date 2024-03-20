import { getContextSerializationPath } from "../config/Configuration";
import { DataClumpRefactoringContext, EvaluationContext, MandatoryContextNames } from "../context/DataContext";
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
            if (this.stepHandlerList[i] != null) {
                let createdContextNames = context.getContextNames();
                let addedContextNames = new Set<string>()
                this.stepHandlerList[i].addCreatedContextNames(PipeLineStep[i], addedContextNames)
                if (difference(createdContextNames,addedContextNames).size == 0) {
                    //No new context data is added so we can skip    
                    continue;
                }
                let deserializedContext=this.stepHandlerList[i].deserializeExistingContext(context,pipeLineSteps[i])
                if(deserializedContext==null){
                    let startTime = Date.now();
                    context = await this.stepHandlerList[i].handle(pipeLineSteps[i],context, null);
                    this.stepRunningTimes[pipeLineSteps[i].name] = Date.now() - startTime;
                    context.serialize(getContextSerializationPath(pipeLineSteps[i].name,context))
                }
                else{
                    context=context.buildNewContext(deserializedContext);
                
                }
                
            }
        }
        let finalContext= context.buildNewContext(new EvaluationContext(this.stepRunningTimes))
        finalContext.serialize();
        return finalContext
        
    }

}