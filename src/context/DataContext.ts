import { DataClumpTypeContext, DataClumpsTypeContext, Dictionary } from "data-clumps-type-context";
import { PipeLineStep, PipeLineStepType } from "../pipeline/PipeLineStep";
import { VariableOrMethodUsage } from "./VariableOrMethodUsage";
import { nodeModuleNameResolver } from "typescript";
import fs from "fs"
import { resolve } from "path";
import { AST_Class, AST_Type } from "./AST_Type";
import { waitSync } from "../util/Utils";
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
     serialize(path?:string){}
     getSerializationPath(path?:string):string{
         return path?path:this.getDefaultSerializationPath()
     }
     getDefaultSerializationPath():string{
         return resolve("data",this.constructor.name+".json")
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
export class ASTBuildingContext extends DataClumpRefactoringContext {
    private ast_type:AST_Type={}
    load(path:string){
        const MAX_ATTEMPTS=3;
        let attempts=0;
        while(attempts<MAX_ATTEMPTS){
            try{
                let content=fs.readFileSync(path,{encoding:"utf-8"})
                let parsed=JSON.parse(content) as AST_Class
                this.ast_type[parsed.file_path]=parsed
                return;
            }catch(e){
                waitSync(100)
                console.log("failed",path)
                attempts++;
            }
        }
        throw new Error("Could not load file "+path)
        
    }
    getKeys():string[]{
        return Object.keys(this.ast_type)
    }   
    getByPath(path:string):AST_Class{
        return this.ast_type[path]
    }
    getExtendingOrImplementingClassKeys(filePath:string):string[]{
        let astKey=this.getByPath(filePath).key;
        let result:string[]=[]
        for(let key of Object.keys(this.ast_type)){
            console.log("extending?",this.ast_type[key].extends_,astKey)
            console.log("extending?",this.ast_type[key].implements_,astKey)
            if(this.ast_type[key].extends_.some((it)=>it.endsWith(astKey))||this.ast_type[key].implements_.some((it)=>it.endsWith(astKey))){
                result.push(this.ast_type[key].file_path)
            }
        }
        return result;
        
    }
}
export class DataClumpDetectorContext extends DataClumpRefactoringContext {
    dataClumpDetectionResult: Dictionary<DataClumpTypeContext>
    getDataClumpDetectionResult(): Dictionary<DataClumpTypeContext> {
        return this.dataClumpDetectionResult
    }
    getDataClumpTypeContext(key: string): DataClumpTypeContext {
        return this.dataClumpDetectionResult[key]!
    }
    getDataClumpKeys(): Iterable<string> {
        return Object.keys(this.dataClumpDetectionResult);
    }
    getPosition(): number {
        return 3;
    }
    deleteEntry(key: string) {
        delete this.dataClumpDetectionResult[key]
    }
    constructor(dataClumpDetectionResult: DataClumpsTypeContext) {
        super();
        this.dataClumpDetectionResult = dataClumpDetectionResult.data_clumps
    }
    getDefaultSerializationPath(): string {
        return resolve("data", "dataClumpDetectorContext.json")
    }
}

export class NameFindingContext extends DataClumpRefactoringContext {
    private nameDataClumpKey: Map<string, string> = new Map<string, string>()
    private dataClumpKeyName: Map<string, string> = new Map<string, string>()
    getNameByDataClumpKey(name: string): string|undefined {
        return this.dataClumpKeyName.get(name)
    }
    getDataClumpKeyByName(name: string): string {
        return this.dataClumpKeyName.get(name)!
    }
    getPosition(): number {
        return 4;
    }
    getDefaultSerializationPath():string{
        return resolve("data","nameFindingContext.json")
    }
    override serialize(path?: string): void {
        const usedPath=this.getSerializationPath(path)
        let serialized: Dictionary<string> = {}
        for (let [key, value] of this.nameDataClumpKey) {
            serialized[key] = value
        }
        fs.writeFileSync(usedPath, JSON.stringify(serialized))
    }
    setNameKeyPair(name: string, dataClumpKey: string) {
        this.nameDataClumpKey.set(name, dataClumpKey)
        this.dataClumpKeyName.set(dataClumpKey, name)
    }

}
export class ClassExtractionContext extends DataClumpRefactoringContext {
    getExtractedClassPath(variableKey: string):string {
       return this.dataClumpKeyClassPath.get(variableKey)!
    }
    setExtractedClassPath(variableKey: string, classPath: string) {
        this.dataClumpKeyClassPath.set(variableKey, classPath)
    }
    private dataClumpKeyClassPath: Map<string, string> = new Map<string, string>()
    getDefaultSerializationPath(): string {
        return resolve( "data", "classExtractionContext.json")
    }
    serialize(path?: string | undefined): void {
        const usedPath=this.getSerializationPath(path)
        let serialized: Dictionary<string> = {}
        for (let [key, value] of this.dataClumpKeyClassPath) {
            serialized[key] = value
        }
        fs.writeFileSync(usedPath, JSON.stringify(serialized))
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
    getDefaultSerializationPath(): string {
        return resolve( "data", "usageFindingContext.json")
    }
    serialize(path?: string | undefined): void {
        const usedPath=this.getSerializationPath(path)
        let serialized: Dictionary<VariableOrMethodUsage[]> = {}
        for (let [key, value] of this.usages) {
            serialized[key] = value
        }
        fs.writeFileSync(usedPath, JSON.stringify(serialized))
    }
    getUsages(): Map<string, VariableOrMethodUsage[]> {
        return this.usages
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
        messages: {stderr:string,stdout:string} | null
    }
 
    constructor(validationResult: { success: boolean, messages: {stderr:string,stdout:string} | null }) {

        super()
        this.validationResult = validationResult;
    }
}
export const MandatoryContextNames=[CodeObtainingContext.name,RefactoredContext.name]



