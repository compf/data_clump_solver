import fs from "fs";
let counter=1;
export const Readability=counter++;
export const Complexity=counter++;
export const ManualChanges=counter++;
export const Intentional=counter++;
export const Performance=counter++;
export const Internal = counter++;
export const NotWorthIt = counter++;
export const  LongLines=counter++;
export const NotEnough = counter++;
export const SmallerDataClump = counter++;
export const LargerDataClump = counter++;
export const OverEngineered = counter++;
export const DocumentationIssues = counter++;
export const JavaRecord = counter++;
export const ExtractedClassLocation = counter++;
export const ResponseTooLate =counter++
export const LLM_Useful =counter++
export const ClassName =counter++;
export const Imports =counter++;
export const SemanticChanges =counter++;
export const SameBaseClass =counter++;
export const ExtractedClassPublic =counter++;
export const StyleAdaption = counter++;
export const LicenseHeader = counter++;
export const LLM_LegalIssues = counter++;
export const Invalid = counter++;


export const parameters_to_parameters_data_clump="parameters_to_parameters_data_clump";
export const fields_to_fields_data_clump="fields_to_fields_data_clump";
export type PR_Data={
   [key:string]:{
    url:string,
    merged:boolean,
    state:string,
    type:string,
    size:number,
    noResponse?:boolean,
    manualChanges?:boolean,
    category:string
    likertData?:{
        scale:number,
        comments:string[]
    }[],
    generalComments:number[],
    reviewComments:number[],
    generalCommentsRaw:string[][],
    reviewCommentsRaw:string[][]
   }
}



