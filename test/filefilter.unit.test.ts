import { setProgrammingLanguageService } from "../src/config/Configuration";
import { CodeObtainingContext, DataClumpDetectorContext, DataClumpRefactoringContext, FileFilteringContext, RelevantLocationsContext } from "../src/context/DataContext";
import { PipeLineStep } from "../src/pipeline/PipeLineStep";
import { FileFilterStepHandler } from "../src/pipeline/stepHandler/fileFiltering/FileFilterStepHandler";
import { NumberOfLinesProposalMetric } from "../src/pipeline/stepHandler/languageModelSpecific/ModelToContextHandlers";
import { FilterBasedMetric } from "../src/util/filterUtils/FilterBasedMetric";
import { Metric, PathOrDataClump } from "../src/util/filterUtils/Metric";
import { NumericalThresholdBasedFilter } from "../src/util/filterUtils/NumericalThresholdBasedFilter";
import { Ranker } from "../src/util/filterUtils/Ranker";
import { SingleItemFilter } from "../src/util/filterUtils/SingleItemFilter";
import { getRelevantFilesRec } from "../src/util/Utils";
const allPaths=[
    "excludedNoDataClump.java",
    "noDataClump.java",
    "dataClump1.java",
    "dataClump2.java",
    "otherDataClump.java",
    "someOtherFile.txt"
]
jest.mock('fs',()=>({
    ...jest.requireActual('fs'),
    readdirSync:()=>{
        return allPaths.map((it)=>{
            return {
                isFile:()=>true,
                isDirectory:()=>false,
                name:it
            }
        })
        
    },
    existsSync:jest.fn().mockReturnValueOnce(false).mockReturnValue(true),
    readFileSync:jest.fn().mockReturnValue("excluded*")
})  
);
setProgrammingLanguageService("java")
import fs from "fs"
test("Test file filtering",()=>{

    let paths:string[]=[]
    getRelevantFilesRec("baseDir",paths,null)
  expect(paths).toHaveLength(allPaths.length)
  let filter=new FileFilterStepHandler({})
  filter.handle(PipeLineStep.FileFiltering,new CodeObtainingContext(""),null).then((ctx)=>{
    paths=[]
    getRelevantFilesRec("baseDir",paths,ctx as FileFilteringContext)
    console.log("paths",paths)
    expect(paths).toHaveLength(allPaths.length-1)
    filter.handle(PipeLineStep.FileFiltering,new CodeObtainingContext(""),null).then((ctx)=>{
        paths=[]
        getRelevantFilesRec("baseDir",paths,ctx as FileFilteringContext)
        console.log("paths",paths)
        expect(paths).toHaveLength(allPaths.length-2)
        filter=new FileFilterStepHandler({exclude:["other*."]})
        filter.handle(PipeLineStep.FileFiltering,new CodeObtainingContext(""),null).then((ctx)=>{
            paths=[]
            getRelevantFilesRec("baseDir",paths,ctx as FileFilteringContext)
            expect(paths).toHaveLength(allPaths.length-3)
        })
        
      
      })
  
  })
  
  
})

class MustContainNumberFilter implements SingleItemFilter{
     isCompatibleWithString(): boolean {
        return true
    }
    async shallRemain(item: string, context: DataClumpRefactoringContext): Promise<boolean> {
        return item.match(/\d+/)!=null
    }
    isCompatibleWithDataClump(): boolean {
        return false;
    }
}

class NumberFromFileNameMetric implements Metric{
    async evaluate(data: PathOrDataClump, context: DataClumpRefactoringContext): Promise<number> {
        let path=data as string
        let match=path.match(/\d+/)
        if(match==null){
            return 0
        }
        return parseInt(match[0])
    }
    isCompatibleWithDataClump(): boolean {
        return false;
    }
    isCompatibleWithString(): boolean {
        return true
    }
}
test("File filtering with metrics and filters",()=>{
    let filter=new FileFilterStepHandler({filter:new MustContainNumberFilter()})
    filter.handle(PipeLineStep.FileFiltering,new CodeObtainingContext(""),null).then((ctx)=>{
        let paths:string[]=[]
        getRelevantFilesRec("baseDir",paths,ctx as FileFilteringContext)
        expect(paths).toHaveLength(2)

        filter=new FileFilterStepHandler({metric:new NumberFromFileNameMetric(),rankThreshold:1})
        filter.handle(PipeLineStep.FileFiltering,new CodeObtainingContext(""),null).then((ctx)=>{
            let paths:string[]=[]
            getRelevantFilesRec("baseDir",paths,ctx as FileFilteringContext)
            expect(paths).toHaveLength(1)
            expect(paths[0]).toContain("dataClump2.java")
        })
    })
})

test("Filtering using NumericalThresholdBasesFilter ",()=>{
    let filter=new NumericalThresholdBasedFilter({
        comparisonSign:">",
        filterThreshold:1,
        metric:new NumberFromFileNameMetric()
    });
    let handler=new FileFilterStepHandler({filter:filter})
    handler.handle(PipeLineStep.FileFiltering,new CodeObtainingContext(""),null).then((ctx)=>{
        let paths:string[]=[]
        getRelevantFilesRec("baseDir",paths,ctx as FileFilteringContext)
        expect(paths).toHaveLength(1)
    });

});

test("test filtering with FilterBasedMetric",()=>{

    let metric=new FilterBasedMetric({
        filter:new MustContainNumberFilter(),
        trueValue:1,
        falseValue:0
    })
    let ranker=new Ranker({rankThreshold:1})
    let handler=new FileFilterStepHandler({metric:metric,rankThreshold:1})
    handler.handle(PipeLineStep.FileFiltering,new CodeObtainingContext(""),null).then((ctx)=>{
        let paths:string[]=[]
        getRelevantFilesRec("baseDir",paths,ctx as FileFilteringContext)
        expect(paths).toHaveLength(1)
        expect(paths[0]).toContain("dataClump1.java")
    });

});
