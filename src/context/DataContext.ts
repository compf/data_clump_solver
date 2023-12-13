import { DataClumpTypeContext, DataClumpsTypeContext, Dictionary } from "data-clumps-type-context";
import { PipeLineStep, PipeLineStepType } from "../pipeline/PipeLineStep";
import { VariableOrMethodUsage } from "./VariableOrMethodUsage";
import { nodeModuleNameResolver } from "typescript";

export  class DataClumpRefactoringContext {
    protected previousContext: DataClumpRefactoringContext | null = null;
    buildNewContext(context: DataClumpRefactoringContext): DataClumpRefactoringContext {
        context.previousContext = this
        context.sharedData = this.sharedData
        return context
    }
    protected sharedData: Map<string, any> = new Map<string, any>();
    getByType<T>(ctor: new (...a: any) => T): T | null {
        let curr: DataClumpRefactoringContext = this;
        while (!(curr instanceof ctor)) {
            curr = curr.previousContext!
            if (curr == null) {
                return null;
            }

        }
        return curr as T
    }
    getProjectPath(): string {
        return this.getByType(CodeObtainingContext)!!.getPath()
    }
}

export class CodeObtainingContext extends DataClumpRefactoringContext {
    path: string;
    getPath(): string {
        return this.path
    }
    getPosition(): number {
        return 0;
    }
    constructor(path: string) {
        super()
        this.sharedData.set("path", path)
        this.path = path
    }
}
export class FileFilteringContext extends DataClumpRefactoringContext {
    includeGlobs: string[];
    excludeGlobs: string[];
    constructor(includeGlobs: string[], excludeGlobs: string[]) {
        super()
        this.includeGlobs = includeGlobs
        this.excludeGlobs = excludeGlobs
    }
    getPosition(): number {
        return 1;
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
    getPosition(): number {
        return 3;
    }
    constructor(dataClumpDetectionResult: DataClumpsTypeContext) {
        super();
        this.dataClumpDetectionResult = dataClumpDetectionResult.data_clumps
        this.dataClumpKeys = Object.keys(dataClumpDetectionResult.data_clumps)
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
    getPosition(): number {
        return 4;
    }
    setNameKeyPair(name: string, dataClumpKey: string) {
        this.nameDataClumpKey.set(name, dataClumpKey)
        this.dataClumpKeyName.set(dataClumpKey, name)
    }

}
export class ClassExtractionContext extends DataClumpRefactoringContext {
    dataClumpKeyClassBody: Map<string, string>;
    constructor(dataClumpKeyClassBody: Map<string, string>) {
        super();

        this.dataClumpKeyClassBody = dataClumpKeyClassBody;
    }
    getPosition(): number {
        return 5;
    }

}
export class UsageFindingContext extends DataClumpRefactoringContext {
    usages: Map<string, VariableOrMethodUsage[]>;
    constructor(usages: Map<string, VariableOrMethodUsage[]>) {
        super();
        this.usages = usages;
    }
    getUsages(): Map<string, VariableOrMethodUsage[]> {
        return this.usages
    }
    getPosition(): number {
        return 6;
    }
}
export class RefactoredContext extends DataClumpRefactoringContext {
    constructor(refactoredCode: string) {
        super();
    }
  

}
export class ValidationContext extends DataClumpRefactoringContext {
    validationResult: {
        success: boolean,
        message: string | null
    }
 
    constructor(validationResult: { success: boolean, message: string | null }) {

        super()
        this.validationResult = validationResult;
    }
}
export const MandatoryContextNames=[CodeObtainingContext.name,RefactoredContext.name]



