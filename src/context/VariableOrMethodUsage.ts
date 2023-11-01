export enum UsageType{VariableUsed,MethodCalled}
export interface VariableOrMethodUsage {
    type: UsageType;
    line: number;
    column: number;
    filePath: string;
}
