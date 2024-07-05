import { DataClumpTypeContext } from "data-clumps-type-context";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../../context/DataContext";
import { Metric } from "../../../util/filterUtils/Metric";
import { RankSampler } from "../../../util/filterUtils/Ranker";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { resolveFromConcreteName } from "../../../config/Configuration";

export class KeepSimilarDataClumpsFilter  extends AbstractStepHandler{
    private metric:Metric|null=null
     addAditionalContextRequirementNames(pipeLineStep: PipeLineStepType, requirements: Set<string>): void {
        requirements.add("DataClumpDetectorContext")
     }
     addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
        createdContexts.add("DataClumpDetectorContext")
     }
     createDataClumpKey(dataClump: DataClumpTypeContext):string {
        return Object.values(dataClump.data_clump_data).sort((a,b)=>a.name.localeCompare(b.name)).map((it)=>it.type +" " +it.name   ).join(",");
        
    }
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.DataClumpFiltering]
    }
    constructor(args: { metricName: string }) {
        super()
        this.metric = resolveFromConcreteName(args.metricName) as Metric
    }
     
    async  handle(step: PipeLineStepType, context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
        let dcContext=context.getByType(DataClumpDetectorContext) as DataClumpDetectorContext;
         let ranker=new RankSampler({rankThreshold: Object.keys(dcContext.getDataClumpDetectionResult().data_clumps).length,rankSign:-1})
         let ranked=await ranker.rank(this.metric!,Object.values(dcContext.getDataClumpDetectionResult().data_clumps),dcContext) as DataClumpTypeContext[]
         let head=ranked[0]
         let headKey=this.createDataClumpKey(head)
         console.log("head key",headKey)
         let newResult:DataClumpTypeContext=dcContext.cloneLastItem()
         
         for(let r of ranked){
            if(this.createDataClumpKey(r)!=headKey){
                dcContext.deleteEntry(r.key)
            }
         }
           
            dcContext.updateStats()
            return dcContext
     }        
}