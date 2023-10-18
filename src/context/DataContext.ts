import { DataClumpsTypeContext } from "data-clumps-type-context";
import { PipeLineStep } from "../pipeline/PipeLineStep";
export interface DataContextInterface{
        CodeObtaining:{
            path:string
        }
        DataClumpDetector:{
            dataClumpDetectionResult:DataClumpsTypeContext|null
        }
        NameFinding:{
            names:{[key:string]: string}
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
        names:{}
    }
};