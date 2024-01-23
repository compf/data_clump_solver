import { Position } from "data-clumps-type-context";

export enum UsageType{MethodDeclared,VariableDeclared,VariableUsed,MethodUsed}
export interface VariableOrMethodUsage {
    symbolType: UsageType;
    range:Position
    filePath: string;
    name:string,
    extractedClassPath?:string,
    variableNames:string[],
    originKey:string,
    isParameter:boolean,
}
