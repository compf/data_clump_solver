import { AbstractStepHandler } from "./stepHandler/AbstractStepHandler"

export type PipeLineStepType = {
    position: number,
    name: string,
    isRequired: boolean,
    defaultHandler: AbstractStepHandler | undefined
}
export namespace PipeLineStep {
    export const CodeObtaining: PipeLineStepType = {
        position: 0,
        name: "CodeObtaining",
        isRequired: true,
        defaultHandler: undefined
    };
    export const FileFiltering: PipeLineStepType = {
        position: 1,
        name: "FileFiltering",
        isRequired: false,
        defaultHandler: undefined
    };
    export const ASTGeneration: PipeLineStepType = {
        position: 2,
        name: "ASTGeneration",
        isRequired: false,
        defaultHandler: undefined
    };
    export const SimilarityDetection: PipeLineStepType = {
        position: 3,
        name: "SimilarityDetection",
        isRequired: false,
        defaultHandler: undefined
    };
    export const DataClumpDetection: PipeLineStepType = {
        position:4,
        name: "DataClumpDetection",
        isRequired: false,
        defaultHandler: undefined
    };
    export const DataClumpFiltering: PipeLineStepType = {
        position:5,
        name: "DataClumpFiltering",
        isRequired: false,
        defaultHandler: undefined
    };
    export const NameFinding: PipeLineStepType = {
        position:6,
        name: "NameFinding",
        isRequired: false,
        defaultHandler: undefined
    };

    export const ClassExtraction: PipeLineStepType = {
        position:7,
        name: "ClassExtraction",
        isRequired: false,
        defaultHandler: undefined
    };

    export const ReferenceFinding: PipeLineStepType = {
        position:8,
        name: "ReferenceFinding",
        isRequired: false,
        defaultHandler: undefined
    };
    export const Refactoring: PipeLineStepType = {
        position:9,
        name: "Refactoring",
        isRequired: false,
        defaultHandler: undefined
    };
    export const Validation: PipeLineStepType = {
        position:10,
        name: "Validation",
        isRequired: false,
        defaultHandler: undefined
    };



}
