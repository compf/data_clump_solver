let counter = 1;
/**
 * All categories of the comments
 */
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
export const Verbosity = counter++;
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export const MAX_COUNTER_VALUE=counter; // maximum value for counter

export const parameters_to_parameters_data_clump = "parameters_to_parameters_data_clump";
export const fields_to_fields_data_clump = "fields_to_fields_data_clump";
export const detectAndRefactor="detectAndRefactor";
export const nameSuggestion = "nameSuggestion";
export const open="open"
export const closed="closed"

/**
 * Combines related categories into generalized categories
 */
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
    /**
     * The url of the project (not the forked one)
     */
    url: string,

    /**
     * The url of the forked project
     */
    forkUrl: string,
    /**
     * The url of the PR
     */
    prUrl: string,
    /**
     * Whether the PR is merged or not
     */
    merged: boolean,
    /**
     * The current state of the PR (open or closed)
     */
    state: "open"|"closed",

    /**
     * The occurrence of the data clump refactored by the PR, might be undefined if actually no data clump was refactored
     */
    occurence?:number,

    /**
     * The key of the data clump refactored by the PR, might be undefined if actually no data clump was refactored
     */
    key?: string,

    /**
     * The type of the data clump, field-to-field_data_clump or parameter-to-parameter_data_clump
     */
    type: "fields_to_fields_data_clump"|"parameters_to_parameters_data_clump",
    /**
     * The number of variables of this data clump (even if it is actually not a data clump)
     */
    size: number,
    /**
     * The number of files affected by the data clump or undefined if no data clump was refactored
     */
    affected_files?:number,
    /**
     * The category of the PR (detectAndRefactor or nameSuggestion)
     */
    category: "detectAndRefactor"|"nameSuggestion"

    /**
     * The likert scores of the PR.
     * The first dimension is the particpiants (e.g. a project might have multiple participants)
     * The second dimension is the questions. Each question consists of the likert score, and the comments
     * From these comments keyowrds were ectracted
     */
    likertData?: {
        scale: number,
        comments?: string,
        keywords?: number[]

    }[][],

    /**
     * The experience of the participants
     * The first dimension is the participants
     * The second dimension is the experience separated into project and java
     */
    experience?: {
        project: string,
        java: string
    }[]
    /**
     * 
     * The comments by participant unrelated to actual source code converted into keywords
     */
    generalComments: number[],
    /**
     * The comments by participant related to the source code converted into keywords
     */
    reviewComments: number[],
    /**
     * The comments by participant unrelated to actual source code
     */
    generalCommentsRaw: string[][],
    /**
     * The comments by participant related to the source
     * 
     * */
    reviewCommentsRaw: string[][],
}


export type PR_Data = {
    [key: string]: PR_Data_Entry
}

export const StronglyDisagree = 0;
export const Disagree = 1;
export const Neutral = 2;
export const Agree = 3;
export const StronglyAgree = 4;

/**
 * The neutral comment offset
 */
export const NEUTRAL_COMMENT = 0.5

