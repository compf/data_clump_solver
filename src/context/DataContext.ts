import { DataClumpsTypeContext } from "data-clumps-type-context";
import { PipeLineStep } from "../pipeline/PipeLineStep";
import { VariableOrMethodUsage } from "./VariableOrMethodUsage";
export interface DataContextInterface{
        CodeObtaining:{
            path:string
        }
        DataClumpDetector:{
            dataClumpDetectionResult:DataClumpsTypeContext|null
        }
        NameFinding:{
            dataClumpKeyName:Map<string,string>
            nameDataClumpKey:Map<string,string>

        },
        UsageFinding:{
            usages:Map<string,VariableOrMethodUsage[]>
        }
}
export const DataContext:DataContextInterface={
    CodeObtaining:{
        path:""
    },
    DataClumpDetector:{
        dataClumpDetectionResult:null
    },
    NameFinding:{
        dataClumpKeyName:new Map(),
        nameDataClumpKey:new Map()
    },
    UsageFinding:{
        usages:new Map(),
    }
};