import { DataClumpTypeContext } from "data-clumps-type-context";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { DataClumpDetectorContext, DataClumpRefactoringContext, createDataClumpsTypeContext } from "../../../context/DataContext";
import { SingleItemFilter } from "../../../util/filterUtils/SingleItemFilter";
import { resolveFromConcreteName } from "../../../config/Configuration";
import {  Metric } from "../../../util/filterUtils/Metric";
import { compareTo } from "../../../util/Utils";
import { RankSampler } from "../../../util/filterUtils/Ranker";

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
        detectionContext.cloneLastItem()
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
    private doNothingIfFiltered:boolean=true;
    private rankSampler: RankSampler;
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.DataClumpFiltering]
    }
    constructor(args: { filterName?: string, rankerName?: string, rankThreshold?: number, sign?: number,doNothingIfFiltered?:boolean, differentDataClumps?: boolean}) {
        super()
        this.rankSampler = new RankSampler({ rankThreshold: args.rankThreshold, rankSign: args.sign,differentDataClumps:args.differentDataClumps })
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