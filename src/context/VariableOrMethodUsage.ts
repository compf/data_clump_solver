import { Position } from "data-clumps-type-context";

export enum UsageType{VariableUsed,VariableDeclared,MethodUsed,MethodDeclared}
export interface VariableOrMethodUsage {
    symbolType: UsageType;
    range:Position
    filePath: string;
    name:string,
    extractedClassPath?:string,
    variableNames:string[]
}
