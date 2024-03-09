import { DataClumpTypeContext } from "data-clumps-type-context";
import { DataClumpsTypeContext } from "data-clumps-type-context/ignoreCoverage/DataClumpsTypeContext";
import { DataClumpDetectorContext } from "../src/context/DataContext";
import { DATA_CLUMP_DATA } from "./TestData";
import { DataClumpOccurenceFilter } from "../src/pipeline/stepHandler/dataClumpFiltering/DataClumpOccurenceFilter";

test("hello",()=>{
    expect(5).toBe(5);
})

test("Test occurence of data clumps",async() =>{
    let xyzDataClump=getDataClumpByVariableNames(["x","y","z"]);
    

    let occurenceThresholdBasedFilterHandler=new DataClumpOccurenceFilter({ filterThreshold:5,comparisonSign:">"});
    expect( await occurenceThresholdBasedFilterHandler.shallRemain(xyzDataClump,new DataClumpDetectorContext(DATA_CLUMP_DATA))).toBeFalsy();
    occurenceThresholdBasedFilterHandler=new DataClumpOccurenceFilter({ filterThreshold:4,comparisonSign:">"});
    expect(await occurenceThresholdBasedFilterHandler.shallRemain(xyzDataClump,new DataClumpDetectorContext(DATA_CLUMP_DATA))).toBeFalsy();
    occurenceThresholdBasedFilterHandler=new DataClumpOccurenceFilter({ filterThreshold:3,comparisonSign:">"});
    expect(await occurenceThresholdBasedFilterHandler.shallRemain(xyzDataClump,new DataClumpDetectorContext(DATA_CLUMP_DATA))).toBeTruthy();
    
});
function getDataClumpByVariableNames(names:string[]){
    let values= Object.values(DATA_CLUMP_DATA.data_clumps)
    for(let dc of values){
        let otherNames=Object.values(dc.data_clump_data).map((it)=>it.name).sort();
        if(otherNames.join(",")==names.sort().join(",")){
            return dc;
        }
    }
    throw new Error("Data clump not found")}

function createDataClumpTestData(count:number,nameTypes:{name:string,type:string}[]):DataClumpsTypeContext{
   let dataClumpsTypeContext:DataClumpsTypeContext={
       data_clumps: {},
       report_version: "",
       detector: {
           name: "",
           url: null,
           version: "",
           options: undefined
       },
       report_timestamp: "",
       target_language: "",
       report_summary: {
           amount_data_clumps: null,
           amount_files_with_data_clumps: null,
           amount_classes_or_interfaces_with_data_clumps: null,
           amount_methods_with_data_clumps: null,
           fields_to_fields_data_clump: null,
           parameters_to_fields_data_clump: null,
           parameters_to_parameters_data_clump: null,
           additional: undefined
       },
       project_info: {
           project_url: null,
           project_name: null,
           project_version: null,
           project_commit_hash: null,
           project_tag: null,
           project_commit_date: null,
           number_of_files: null,
           number_of_classes_or_interfaces: null,
           number_of_methods: null,
           number_of_data_fields: null,
           number_of_method_parameters: null,
           additional: undefined
       }
   };
       



    for(let i=0;i<count;i++){
        let dataClumpTypeContext:DataClumpTypeContext={
            key:"key"+i,
            from_file_path:"Test.java",
            to_file_path:"Test.java",
            probability:1,
            data_clump_type:"data_clump",

            type:"data_clump",
            from_class_or_interface_key:"key_class"+i,
            to_class_or_interface_key:"key_class"+i,
            from_class_or_interface_name:"Test",
            to_class_or_interface_name:"Test",
            from_method_key:null,
            to_method_key:null,
            from_method_name:null,
            to_method_name:null,
            data_clump_data:{}
        };
        for(let nameType of nameTypes){
            dataClumpTypeContext.data_clump_data[nameType.name]={
                name:nameType.name,
                type:nameType.type,
                key:"key_variable"+i,
                position:{
                    startLine:1,
                    startColumn:1,
                    endLine:1,
                    endColumn:1
                },
                modifiers:[],
                probability:1,
                to_variable:{
                    key:"key_variable"+i,
                    name:nameType.name,
                    type:nameType.type,
                    modifiers:[],
                    position:{
                        startLine:1,
                        startColumn:1,
                        endLine:1,
                        endColumn:1
                    }
                }


            }
        }
        dataClumpsTypeContext.data_clumps["key"+i]=dataClumpTypeContext
        
    }
    return dataClumpsTypeContext;
   

}