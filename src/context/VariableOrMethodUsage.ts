export enum UsageType{FieldUsed,FieldDeclared,MethodUsed,MethodDeclared,MethodParameterUsed,MethodParameterDeclared}
export interface VariableOrMethodUsage {
    symbolType: UsageType;
    range:{"start":{"line":number,"character":number},"end":{"line":number,"character":number}};
    filePath: string;
    name:string
}
