import fs from "fs";
let counter = 1;
export const Readability = counter++;
export const Complexity = counter++;
export const ManualChanges = counter++;
export const IntentionalDesignChoice = counter++;
export const Performance = counter++;
export const RefactoringNotWorthIt = counter++;
export const LongLines = counter++;
export const NotEnough = counter++;
export const NoSetterNeeded=counter++;
export const SmallerDataClump = counter++;
export const LargerDataClump = counter++;
export const OverEngineered = counter++;
export const DocumentationIssues = counter++;
export const JavaRecordBetter = counter++;
export const ExtractedClassLocation = counter++;
export const NoMeaningfulFeedback = counter++
export const LLM_Useful = counter++
export const ClassName = counter++;
export const ImportsIssues = counter++;
export const SemanticChanges = counter++;
export const SameBaseClass = counter++;
export const ExtractedClassShouldNotBePublic = counter++;
export const StyleAdaption = counter++;
export const LicenseHeaderMissing = counter++;
export const LLM_LegalIssues = counter++;
export const InvalidPR = counter++;
export const ImprovedMaintainability = counter++;
export const IsolatedComponents = counter++;
export const DeveloperMustOverseeLLM = counter++;
export const Good_Idea = counter++;

export const MAX_COUNTER_VALUE=counter; // maximum value for counter

export const parameters_to_parameters_data_clump = "parameters_to_parameters_data_clump";
export const fields_to_fields_data_clump = "fields_to_fields_data_clump";
export const detectAndRefactor="detectAndRefactor";
export const nameSuggestion = "nameSuggestion";
export const filterSnippet = "filterSnippet";
export const filterManual="filterManual";
export const open="open"
export const closed="closed"

export const GenerializedCommentCategories = {
    CodeReadability:[Readability,Complexity, LongLines],
    Usefulness:[RefactoringNotWorthIt,OverEngineered, IntentionalDesignChoice],
    Details:[ExtractedClassLocation,ClassName,ImportsIssues, LicenseHeaderMissing, ExtractedClassShouldNotBePublic, JavaRecordBetter],
    DataClumpChoice:[SmallerDataClump,LargerDataClump],
    ManualWork:[NotEnough,ManualChanges, StyleAdaption, DocumentationIssues],
    FunctionalImpact:[Performance, SemanticChanges],
    GeneralComments:[LLM_Useful,LLM_LegalIssues, ImprovedMaintainability, DeveloperMustOverseeLLM, Good_Idea]


}
export type PR_Data_Entry = {

    url: string,
    merged: boolean,
    state: "open"|"closed",
    key?: string,
    type: string,
    size: number,
    manualChanges?: boolean,
    category: string
    likertData?: {
        scale: number,
        comments?: string,
        keywords?: number[]

    }[][],
    experience?: {
        project: string,
        java: string
    }[]
    generalComments: number[],
    reviewComments: number[],
    generalCommentsRaw: string[][],
    reviewCommentsRaw: string[][],
    categorizedComments?:number[]
}


export type PR_Data = {
    [key: string]: PR_Data_Entry
}

export const StronglyDisagree = 0;
export const Disagree = 1;
export const Neutral = 2;
export const Agree = 3;
export const StronglyAgree = 4;


export const NEUTRAL_COMMENT = 0.5

