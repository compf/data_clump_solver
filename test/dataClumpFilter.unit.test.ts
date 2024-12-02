import { DataClumpDetectorContext } from "../src/context/DataContext"
import { PipeLineStep } from "../src/pipeline/PipeLineStep"
import { DataClumpFilterStepHandler } from "../src/pipeline/stepHandler/dataClumpFiltering/DataClumpFilterStepHandler"
import { DataClumpSizeMetric } from "../src/pipeline/stepHandler/dataClumpFiltering/DataClumpSizeMetric"
import { DATA_CLUMP_DATA } from "./TestData"

test("Test data clump ranking via size",()=>{
    let metric=new DataClumpSizeMetric({})
    let filter=new DataClumpFilterStepHandler({metric,rankThreshold:1})
    let context=new DataClumpDetectorContext(DATA_CLUMP_DATA)

    filter.handle(PipeLineStep.DataClumpDetection,context,null).then((it)=>{
        let ctx=it as DataClumpDetectorContext

        expect(Object.values(ctx.getDataClumps()[0].data_clump_data)).toHaveLength(8) 
    })
})