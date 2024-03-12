import { DataClumpTypeContext } from "data-clumps-type-context";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../../context/DataContext";
import { SingleItemFilter } from "../../../util/filterUtils/SingleItemFilter";
import { resolveFromName } from "../../../config/Configuration";
import { RankSampler, Ranker } from "../../../util/filterUtils/Ranker";
import { compareTo } from "../../../util/Utils";

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
            detectionContext.setDataClumpDetectionResult(values)
        }

        
        return detectionContext
    }
    private filter: SingleItemFilter | null = null
    private ranker: Ranker | null = null
    private doNothingIfFiltered:boolean=true;
    private rankSampler: RankSampler;
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.DataClumpFiltering]
    }
    constructor(args: { filterName?: string, rankerName?: string, rankThreshold?: number, sign?: number,doNothingIfFiltered?:boolean }) {
        super()
        this.rankSampler = new RankSampler({ rankThreshold: args.rankThreshold, rankSign: args.sign })
        if (args.rankerName) {
            this.ranker = resolveFromName(args.rankerName)
        }

        if (args.filterName) {
            this.filter = resolveFromName(args.filterName)
        }
        if(args.doNothingIfFiltered!=undefined){
            this.doNothingIfFiltered=args.doNothingIfFiltered
        }
    }

}