import { DataClumpTypeContext } from "data-clumps-type-context";
import { DataClumpsTypeContext } from "data-clumps-type-context/ignoreCoverage/DataClumpsTypeContext";
import { ASTBuildingContext, DataClumpDetectorContext } from "../src/context/DataContext";
import { AST_DATA, DATA_CLUMP_DATA } from "./TestData";
import { getRelevantFilesRec } from "../src/util/Utils";
import { NoAbstractClassOrInterfaceFilter } from "../src/util/filterUtils/NoAbstractClassOrInterfaceFilter";
import { DataClumpFilterStepHandler } from "../src/pipeline/stepHandler/dataClumpFiltering/DataClumpFilterStepHandler";
import { PipeLineStep } from "../src/pipeline/PipeLineStep";
import { DataClumpOccurenceMetric } from "../src/pipeline/stepHandler/dataClumpFiltering/DataClumpOccurenceMetric";
import { Ranker } from "../src/util/filterUtils/Ranker";
import { NumericalThresholdBasedFilter } from "../src/util/filterUtils/NumericalThresholdBasedFilter";

test("hello",()=>{
    expect(5).toBe(5);
})

test("Test occurence of data clumps",async() =>{
    let xyzDataClump=getDataClumpByVariableNames(["x","y","z"]);
    let occurenceThresholdBasedFilterHandler=new NumericalThresholdBasedFilter({ filterThreshold:5,comparisonSign:">"});
    (occurenceThresholdBasedFilterHandler as any).metric=new DataClumpOccurenceMetric();
    expect( await occurenceThresholdBasedFilterHandler.shallRemain(xyzDataClump,new DataClumpDetectorContext(DATA_CLUMP_DATA))).toBeFalsy();
    occurenceThresholdBasedFilterHandler=new NumericalThresholdBasedFilter({ filterThreshold:4,comparisonSign:">"});
    (occurenceThresholdBasedFilterHandler as any).metric=new DataClumpOccurenceMetric();
    expect(await occurenceThresholdBasedFilterHandler.shallRemain(xyzDataClump,new DataClumpDetectorContext(DATA_CLUMP_DATA))).toBeFalsy();
    occurenceThresholdBasedFilterHandler=new NumericalThresholdBasedFilter({ filterThreshold:3,comparisonSign:">"});
    (occurenceThresholdBasedFilterHandler as any).metric=new DataClumpOccurenceMetric();
    expect(await occurenceThresholdBasedFilterHandler.shallRemain(xyzDataClump,new DataClumpDetectorContext(DATA_CLUMP_DATA))).toBeTruthy();
    
});
test("Test interfaces excluding",async() =>{
    let filter=new NoAbstractClassOrInterfaceFilter()
    let handler=new DataClumpFilterStepHandler({});

    (handler as any).filter=filter;
    let astContext=ASTBuildingContext.fromAstType(AST_DATA);
    let context=astContext.buildNewContext(new DataClumpDetectorContext(DATA_CLUMP_DATA))
    let result=await handler.handle(PipeLineStep.DataClumpDetection,context,undefined) as DataClumpDetectorContext
    let dc=Object.values(result.getDataClumpDetectionResult().data_clumps)
   let anyInterface= dc.some((it)=>it.from_class_or_interface_name=="DaysCalculator" || it.to_class_or_interface_name=="DaysCalculator" 
   || it.from_class_or_interface_name=="AgeChecker" || it.to_class_or_interface_name=="AgeChecker" )
   expect(anyInterface).toBeFalsy();

});


function getDataClumpByVariableNames(names:string[]){
    let values= Object.values(DATA_CLUMP_DATA.data_clumps)
    for(let dc of values){
        let otherNames=Object.values(dc.data_clump_data).map((it)=>it.name).sort();
        if(otherNames.join(",")==names.sort().join(",")){
            return dc;
        }
    }
    throw new Error("Data clump not found")
}

