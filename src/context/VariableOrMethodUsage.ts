export enum SymbolType{Variable,Method}
export interface VariableOrMethodUsage {
    symbolType: SymbolType;
    range:{"start":{"line":number,"character":number},"end":{"line":number,"character":number}};
    filePath: string;
    name:string
}
