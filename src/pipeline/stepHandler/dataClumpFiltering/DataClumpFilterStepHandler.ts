import { DataClumpTypeContext } from "data-clumps-type-context";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { DataClumpDetectorContext, DataClumpRefactoringContext, createDataClumpsTypeContext } from "../../../context/DataContext";
import { SingleItemFilter } from "../../../util/filterUtils/SingleItemFilter";
import { resolveFromConcreteName } from "../../../config/Configuration";
import {  Metric } from "../../../util/filterUtils/Metric";
import { compareTo } from "../../../util/Utils";
import { RankSampler, RankSamplerArgs } from "../../../util/filterUtils/Ranker";
export type DataClumpFilterArgs=RankSamplerArgs&{
    filterName?:string,
    rankerName?:string,
    doNothingIfFiltered?:boolean
}
export  class DataClumpFilterStepHandler extends AbstractStepHandler {
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {

    }
    addAditionalContextRequirementNames(pipeLineStep: PipeLineStepType, requirements: Set<string>): void {
        requirements.add(DataClumpDetectorContext.name)
    }
    async handle(step:PipeLineStepType,context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
        
        let detectionContext = context.getByType(DataClumpDetectorContext) as DataClumpDetectorContext
        if(detectionContext.isFiltered() && this.doNothingIfFiltered){
            return context
        }
        let values = Object.values(detectionContext!.getDataClumpDetectionResult().data_clumps);
        context=new DataClumpDetectorContext(detectionContext.cloneLastItem())
        if(this.filter){
            if(!this.filter.isCompatibleWithDataClump()){
                throw new Error("filter is not compatible with data clump")
            }
            for (let dc of values) {
                let shallRemain = await this.filter!.shallRemain(dc, detectionContext)
                if (!shallRemain) {
                    console.log("removing",dc.key)
                    detectionContext.deleteEntry(dc.key)
                }
            }
        }
       values=Object.values(detectionContext!.getDataClumpDetectionResult().data_clumps);
        if (this.ranker) {
            if(!this.ranker.isCompatibleWithDataClump()){
                throw new Error("ranker is not compatible with data clump")
            }
            values = await this.rankSampler.rank(this.ranker!, values, detectionContext) as DataClumpTypeContext[]
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
    private ranker: Metric | null = null
    private doNothingIfFiltered:boolean=false;
    private rankSampler: RankSampler;
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.DataClumpFiltering]
    }
    constructor(args: DataClumpFilterArgs) {
        super()
        this.rankSampler = new RankSampler(args)
        if (args.rankerName) {
            this.ranker = resolveFromConcreteName(args.rankerName)
        }

        if (args.filterName) {
            this.filter = resolveFromConcreteName(args.filterName)
        }
        if(args.doNothingIfFiltered!=undefined){
            this.doNothingIfFiltered=args.doNothingIfFiltered
        }
    }

}