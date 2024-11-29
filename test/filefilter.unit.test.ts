import { setProgrammingLanguageService } from "../src/config/Configuration";
import { CodeObtainingContext, DataClumpDetectorContext, DataClumpRefactoringContext, FileFilteringContext, RelevantLocationsContext } from "../src/context/DataContext";
import { PipeLineStep } from "../src/pipeline/PipeLineStep";
import { FileFilterHandler } from "../src/pipeline/stepHandler/fileFiltering/FileFilterHandler";
import { NumberOfLinesProposalMetric } from "../src/pipeline/stepHandler/languageModelSpecific/OutputHandler";
import { getRelevantFilesRec } from "../src/util/Utils";
const allPaths=[
    "excludedNoDataClump.java",
    "noDataClump.java",
    "dataClump1.java",
    "dataClump2.java",
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
  let filter=new FileFilterHandler({})
  filter.handle(PipeLineStep.FileFiltering,new CodeObtainingContext(""),null).then((ctx)=>{
    paths=[]
    getRelevantFilesRec("baseDir",paths,ctx as FileFilteringContext)
    console.log(paths)
    expect(paths).toHaveLength(allPaths.length-1)
    filter.handle(PipeLineStep.FileFiltering,new CodeObtainingContext(""),null).then((ctx)=>{
        paths=[]
        getRelevantFilesRec("baseDir",paths,ctx as FileFilteringContext)
        expect(paths).toHaveLength(allPaths.length-2)
        ctx=ctx.buildNewContext(new DataClumpDetectorContext({
            data_clumps:{
                "1":{
                    from_file_path:"dataClump1.java",
                    to_file_path:"dataClump2.java",
                    to_method_name:null,
                    from_method_name:null,
                    from_method_key:null,
                    to_method_key:null,
                    type:"data_clump",
                    data_clump_type:"data_clump",
                    data_clump_data:{
                        "1":{
                            name:"a",
                            type:"int",
                            modifiers:[],
                            key:"a",
                            probability:1,

                            position:{
                               startLine:1,
                                 endLine:1,
                                    startColumn:1,
                                    endColumn:1
                            },
                            to_variable:{
                                name:"b",
                                key:"b",
                                modifiers:[],
                                type:"int",
                                position:{
                                    startLine:1,
                                    endLine:1,
                                    startColumn:1,
                                    endColumn:1
                                }
                            }
                        }
                    },
                    probability:1,
                    from_class_or_interface_key:"a",
                    to_class_or_interface_key:"b",
                    from_class_or_interface_name:"a",
                    to_class_or_interface_name:"b",
                    key:"1"
                    
                }
            }
        } as any));
        let lines:{[path:string]:Set<number>}={};

        (ctx as RelevantLocationsContext).getRelevantLocations(lines)
        expect(Object.keys(lines)).toHaveLength(2)
      
      })
  
  })
  
  
})

