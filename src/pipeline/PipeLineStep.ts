import { AbstractStepHandler } from "./stepHandler/AbstractStepHandler"

export type PipeLineStepType = {
    name: string,
    isRequired: boolean,
    defaultHandler: AbstractStepHandler | undefined
}
export namespace PipeLineStep {
    export const CodeObtaining: PipeLineStepType = {
        name: "CodeObtaining",
        isRequired: true,
        defaultHandler: undefined
    };
    export  const FileFiltering: PipeLineStepType = {
        name: "FileFiltering",

        isRequired: false,
        defaultHandler: undefined
    };
    export const ASTGeneration: PipeLineStepType = {
        name: "ASTGeneration",

        isRequired: false,
        defaultHandler: undefined
    };
    export  const SimilarityDetection: PipeLineStepType = {
        name: "SimilarityDetection",

        isRequired: false,
        defaultHandler: undefined
    };
    export  const DataClumpDetection: PipeLineStepType = {
        name: "DataClumpDetection",

        isRequired: false,
        defaultHandler: undefined
    };
    export const DataClumpFiltering: PipeLineStepType = {
        name: "DataClumpFiltering",

        isRequired: false,
        defaultHandler: undefined
    };
    export  const NameFinding: PipeLineStepType = {
        name: "NameFinding",

        isRequired: false,
        defaultHandler: undefined
    };

    export  const ClassExtraction: PipeLineStepType = {
        name: "ClassExtraction",

        isRequired: false,
        defaultHandler: undefined
    };
      
    export  const UsageFinding: PipeLineStepType = {
        name: "UsageFinding",

        isRequired: false,
        defaultHandler: undefined
    };
    export const Refactoring: PipeLineStepType = {
        name: "Refactoring",

        isRequired: false,
        defaultHandler: undefined
    };
        

 
}
