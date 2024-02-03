import { DataClumpTypeContext } from "data-clumps-type-context";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../../context/DataContext";

export abstract class AbstractDataClumpFilterStepHandler extends AbstractStepHandler {
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {

    }
    addAditionalContextRequirementNames(pipeLineStep: PipeLineStepType, requirements: Set<string>): void {
        requirements.add(DataClumpDetectorContext.name)
    }
    public abstract shallRemain(dataClump:DataClumpTypeContext,context:DataClumpDetectorContext):boolean;
    handle(context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
      let detectionContext=context.getByType(DataClumpDetectorContext)!
        let values=Object.values(detectionContext.dataClumpDetectionResult);
        for(let dc of values){
            if(!this.shallRemain(dc,detectionContext)){
               detectionContext.deleteEntry(dc.key)
            }
        }
        return Promise.resolve(detectionContext);
    }
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.DataClumpFiltering]
    }

}