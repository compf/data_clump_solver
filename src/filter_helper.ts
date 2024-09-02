import { registerFromName } from "./config/Configuration";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "./context/DataContext";
import { PipeLineStep } from "./pipeline/PipeLineStep";
import { SimpleCodeObtainingStepHandler } from "./pipeline/stepHandler/codeObtaining/SimpleCodeObtainingStepHandler";
import { DataClumpDoctorStepHandler} from "./pipeline/stepHandler/dataClumpDetection/DataClumpDoctorStepHandler";
import { DataClumpFilterStepHandler } from "./pipeline/stepHandler/dataClumpFiltering/DataClumpFilterStepHandler";
import { MetricCombiner } from "./util/filterUtils/MetricCombiner";

async function main() {
    console.log("Hello World")
    let context = new DataClumpRefactoringContext();
    context = await new SimpleCodeObtainingStepHandler({ path: null, useArgPath: true }).handle(PipeLineStep.CodeObtaining, context, null);
    let detector = new DataClumpDoctorStepHandler({});
    context = await detector.handle(PipeLineStep.DataClumpDetection, context, null);
    const metricWeights = [
        1,
        100,
        -100
    ]
    registerFromName("DataClumpSizeMetric","DataClumpSizeMetric",{});
    registerFromName("DataClumpOccurenceMetric","DataClumpOccurenceMetric",{});
    registerFromName("AffectedFilesMetric","AffectedFilesMetric",{});
    let metricCombinerArgs = {
        metrics: [
            { name: "DataClumpSizeMetric", weight: metricWeights[0] },
            { name: "DataClumpOccurenceMetric", weight: metricWeights[1] },
            { name: "AffectedFilesMetric", weight: metricWeights[2] }

        ]
    }
    registerFromName("MetricCombiner","MetricCombiner",metricCombinerArgs);
   
    let filterHandler = new DataClumpFilterStepHandler({ rankerName: "MetricCombiner" });
    context = await filterHandler.handle(PipeLineStep.DataClumpFiltering, context, null);
    let data_clumps=context.getByType(DataClumpDetectorContext)?.getDataClumpDetectionResult().data_clumps;
    let firstDataClump=Object.values(data_clumps!)[0];
    console.log(firstDataClump);


}

if (require.main === module) {
    main();

}