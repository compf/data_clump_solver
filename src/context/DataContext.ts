import { DataClumpTypeContext, DataClumpsTypeContext, Dictionary } from "data-clumps-type-context";
import { PipeLineStep } from "../pipeline/PipeLineStep";
import { VariableOrMethodUsage } from "./VariableOrMethodUsage";
import { nodeModuleNameResolver } from "typescript";

export class DataClumpRefactoringContext {
    protected previousContext: DataClumpRefactoringContext|null = null;
    buildNewContext(context: DataClumpRefactoringContext): DataClumpRefactoringContext {
        context.previousContext = this
        context.sharedData = this.sharedData
        return context
    }

    protected sharedData: Map<string, any> = new Map<string, any>();
    getByType<T>(ctor: new (...a: any) => T): T {
        let curr: DataClumpRefactoringContext = this;
        while (!(curr instanceof ctor) ) {
            curr = curr.previousContext!

        }
        return curr as T
    }
    getProjectPath(): string {
        return this.getByType(CodeObtainingContext).getPath()
    }
}
class InitalDataClumpRefactoringContext extends DataClumpRefactoringContext {

}
export class CodeObtainingContext extends DataClumpRefactoringContext {
    path: string;
    getPath(): string {
        return this.path
    }
    constructor(path: string) {
        super()
        this.sharedData.set("path", path)
        this.path = path
    }
}
export class DataClumpDetectorContext extends DataClumpRefactoringContext {
    dataClumpDetectionResult: Dictionary<DataClumpTypeContext>
    dataClumpKeys: Array<string>
    getDataClumpDetectionResult(): Dictionary<DataClumpTypeContext> {
        return this.dataClumpDetectionResult
    }
    getDataClumpTypeContext(key: string): DataClumpTypeContext {
        return this.dataClumpDetectionResult[key]!
    }
    getDataClumpKeys(): Iterable<string> {
        return this.dataClumpKeys;
    }
    constructor(dataClumpDetectionResult: DataClumpsTypeContext) {
        super();
        this.dataClumpDetectionResult = dataClumpDetectionResult.data_clumps
        this.dataClumpKeys = Object.keys(dataClumpDetectionResult.data_clumps)
    }
}
export class ClassExtractionContext extends DataClumpRefactoringContext{
    dataClumpKeyClassBody:Map<string,string>;
    constructor( dataClumpKeyClassBody:Map<string,string>){
        super();

        this.dataClumpKeyClassBody=dataClumpKeyClassBody;
    }
  
}
export class NameFindingContext extends DataClumpRefactoringContext {
    private nameDataClumpKey: Map<string, string> = new Map<string, string>()
    private dataClumpKeyName: Map<string, string> = new Map<string, string>()
    getNameByDataClumpKey(name: string): string {
        return this.nameDataClumpKey.get(name)!
    }
    getDataClumpKeyByName(name: string): string {
        return this.dataClumpKeyName.get(name)!
    }
    setNameKeyPair(name: string, dataClumpKey: string) {
        this.nameDataClumpKey.set(name, dataClumpKey)
        this.dataClumpKeyName.set(dataClumpKey, name)
    }
}
export class UsageFindingContext extends DataClumpRefactoringContext {
    usages: Map<string, VariableOrMethodUsage[]>;
    constructor (usages: Map<string, VariableOrMethodUsage[]>) {
        super();
        this.usages = usages;
    }
    getUsages(): Map<string, VariableOrMethodUsage[]> {
        return this.usages
    }
}



