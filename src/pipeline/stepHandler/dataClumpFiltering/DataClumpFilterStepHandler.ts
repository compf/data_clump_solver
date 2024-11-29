import { DataClumpTypeContext } from "data-clumps-type-context";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { DataClumpDetectorContext, DataClumpRefactoringContext, createDataClumpsTypeContext } from "../../../context/DataContext";
import { SingleItemFilter } from "../../../util/filterUtils/SingleItemFilter";
import { assignOrResolve, resolveFromConcreteName } from "../../../config/Configuration";
import {  Metric } from "../../../util/filterUtils/Metric";
import { compareTo } from "../../../util/Utils";
import { Ranker, RankerArgs } from "../../../util/filterUtils/Ranker";
export type DataClumpFilterArgs=RankerArgs&{
    filterName?:string,
    metricName?:string,
}
export  class DataClumpFilterStepHandler extends AbstractStepHandler {
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {

    }
    addAditionalContextRequirementNames(pipeLineStep: PipeLineStepType, requirements: Set<string>): void {
        requirements.add(DataClumpDetectorContext.name)
    }
    async handle(step:PipeLineStepType,context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
        
        let detectionContext = context.getByType(DataClumpDetectorContext) as DataClumpDetectorContext

   
        let values = Object.values(detectionContext!.getDataClumpDetectionResult().data_clumps);
        context=new DataClumpDetectorContext(detectionContext.cloneLastItem())
        if(this.filter){
            if(!this.filter.isCompatibleWithDataClump()){
                throw new Error("filter is not compatible with data clump")
            }
            for (let dc of values) {
                let shallRemain = await this.filter!.shallRemain(dc, detectionContext)
                if (!shallRemain) {
                    detectionContext.deleteEntry(dc.key)
                }
            }
        }
       values=Object.values(detectionContext!.getDataClumpDetectionResult().data_clumps);
       let m=this.metric;
       if(m){
            if(!m.isCompatibleWithDataClump()){
                throw new Error("ranker is not compatible with data clump")
            }
            values = await this.ranker!.rank(m, values, detectionContext) as DataClumpTypeContext[]
            let result=createDataClumpsTypeContext({})
            for(let v of values){
               result.data_clumps[v.key]=v
            
            }
            detectionContext.setDataClumpDetectionResult(result)
        }


        detectionContext.updateStats();
        return detectionContext
    }
    private filter: SingleItemFilter | null = null
    public metric: Metric | null = null
    private ranker?: Ranker;
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.DataClumpFiltering]
    }
    constructor(args: DataClumpFilterArgs) {
        super()
        assignOrResolve(this, args,{})
        if(this.ranker==undefined){
            this.ranker=new Ranker(args)
        }
        
    }

}