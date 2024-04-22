import { ASTBuildingContext, CodeObtainingContext, DataClumpDetectorContext, FileFilteringContext, NameFindingContext, RefactoredContext, UsageFindingContext, ValidationContext } from "../context/DataContext";
import { AbstractStepHandler } from "./stepHandler/AbstractStepHandler"
export type PipeLineStepName = "CodeObtaining" | "FileFiltering" | "ASTGeneration" | "SimilarityDetection" | "DataClumpDetection" | "DataClumpFiltering" | "NameFinding" | "ClassExtraction" | "ReferenceFinding" | "Refactoring" | "Validation"
export type PipeLineStepType = {
    position: number,
    name: PipeLineStepName,
    isRequired: boolean,
    defaultHandler: AbstractStepHandler | undefined,
    associatedContext: string|null
}
export namespace PipeLineStep {
    export const CodeObtaining: PipeLineStepType = {
        position: 0,
        name: "CodeObtaining",
        isRequired: true,
        defaultHandler: undefined,
        associatedContext: "CodeObtainingContext"
    };
    export const FileFiltering: PipeLineStepType = {
        position: 1,
        name: "FileFiltering",
        isRequired: false,
        defaultHandler: undefined,
        associatedContext:"FileFilteringContext"
    };
    export const ASTGeneration: PipeLineStepType = {
        position: 2,
        name: "ASTGeneration",
        isRequired: false,
        defaultHandler: undefined,
        associatedContext: "ASTBuildingContext"

    };
    export const SimilarityDetection: PipeLineStepType = {
        position: 3,
        name: "SimilarityDetection",
        isRequired: false,
        defaultHandler: undefined,
        associatedContext:null
    };
    export const DataClumpDetection: PipeLineStepType = {
        position:4,
        name: "DataClumpDetection",
        isRequired: false,
        defaultHandler: undefined,
        associatedContext:"DataClumpDetectorContext"
    };
    export const DataClumpFiltering: PipeLineStepType = {
        position:5,
        name: "DataClumpFiltering",
        isRequired: false,
        defaultHandler: undefined,
        associatedContext:null
    };
    export const ReferenceFinding: PipeLineStepType = {
        position:6,
        name: "ReferenceFinding",
        isRequired: false,
        defaultHandler: undefined,
        associatedContext:"UsageFindingContext"
    };
    
    export const NameFinding: PipeLineStepType = {
        position:7,
        name: "NameFinding",
        isRequired: false,
        defaultHandler: undefined,
        associatedContext:"NameFindingContext"
    
    };

    export const ClassExtraction: PipeLineStepType = {
        position:8,
        name: "ClassExtraction",
        isRequired: false,
        defaultHandler: undefined,
        associatedContext:"ClassExtractionContext"
    };

    
    export const Refactoring: PipeLineStepType = {
        position:9,
        name: "Refactoring",
        isRequired: false,
        defaultHandler: undefined,
        associatedContext:"RefactoredContext"
    };
    export const Validation: PipeLineStepType = {
        position:10,
        name: "Validation",
        isRequired: false,
        defaultHandler: undefined,
        associatedContext:"ValidationContext"
    };



}
