import { DataClumpTypeContext } from "data-clumps-type-context";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../../context/DataContext";
import { AbstractSingleItemFilter } from "../../../util/filterUtils/AbstractSingleItemFilter";
import { resolveFromName } from "../../../config/Configuration";

export abstract class DataClumpFilterStepHandler extends AbstractStepHandler {
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {

    }
    addAditionalContextRequirementNames(pipeLineStep: PipeLineStepType, requirements: Set<string>): void {
        requirements.add(DataClumpDetectorContext.name)
    }
    async handle(context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
      let detectionContext=context.getByType(DataClumpDetectorContext)!
        let values=Object.values(detectionContext.dataClumpDetectionResult);
        for(let dc of values){
            let shallRemain=await  this.filter.shallRemain(dc,detectionContext)
            if(!shallRemain){
               detectionContext.deleteEntry(dc.key)
            }
        }
        return Promise.resolve(detectionContext);
    }
    private filter:AbstractSingleItemFilter
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.DataClumpFiltering]
    }
    constructor(args:{filterName:string}){
        super()
        this.filter=resolveFromName(args.filterName)
    }

}