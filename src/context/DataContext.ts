import { DataClumpTypeContext, DataClumpsTypeContext, Dictionary } from "data-clumps-type-context";
import { PipeLineStep, PipeLineStepType } from "../pipeline/PipeLineStep";
import { VariableOrMethodUsage } from "./VariableOrMethodUsage";
import { nodeModuleNameResolver } from "typescript";
import fs from "fs"
import path from "path"
import { resolve } from "path";
import { AST_Class, AST_Type } from "./AST_Type";
import { getRelevantFilesRec, waitSync } from "../util/Utils";
import { Configuration } from "../config/Configuration";
import simpleGit from "simple-git";
export  class DataClumpRefactoringContext {
    protected previousContext: DataClumpRefactoringContext | null = null;
    buildNewContext(context: DataClumpRefactoringContext): DataClumpRefactoringContext {
        context.previousContext = this
        context.sharedData = this.sharedData
        return context
    }
    fail(message: string) {
        throw new Error(message)

    }
    getContextNames():Set<string>{
        let result=new Set<string>();
        let curr: DataClumpRefactoringContext = this;
        while (curr != null) {
            result.add(curr.constructor.name)
            curr = curr.previousContext!
        }
        return result;
    }
    getContextIds():Set<number>{
        let result=new Set<number>();
        let curr: DataClumpRefactoringContext = this;
        while (curr != null && curr.constructor.name!=DataClumpRefactoringContext.name) {
            let pos=Object.values(PipeLineStep).filter((it)=>it.associatedContext==curr.constructor.name)[0].position
            result.add(pos)
            curr = curr.previousContext!
        }
        return result;
    }
    setConfig(config: Configuration) {
        this.sharedData["config"]=config 
    }
    public sharedData: { [key: string]: any } = {}
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
    getProgrammingLanguage():string{
        return this.sharedData["config"].ProgrammingLanguage
    }
    getProjectPath(): string {
        return this.getByType(CodeObtainingContext)!!.getPath()
    }
     serialize(path?:string){}
     getSerializationPath(path?:string):string{
         return path?path:this.getDefaultSerializationPath()
     }
     getDefaultSerializationPath():string{
        console.log("default serialization path")
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
        this.sharedData["path"]= path
        this.path = path
    }
}
export class GitRepositoryContext extends DataClumpRefactoringContext {
    async getLastCommittedDate(path:string):Promise<Date>{
        return new Promise<Date>(async (resolve,reject)=>{
            let gitHelper=simpleGit(this.getProjectPath())
            let result=await gitHelper.log({file:path,format:"%ad"},(err,log)=>{
                resolve(new Date(Date.parse(log["latest"]!["date"])))
            })
        })
       
    }
    async getAllCommittedDates(path:string):Promise<Date[]>{
        return new Promise<Date[]>(async (resolve,reject)=>{
            let gitHelper=simpleGit(this.getProjectPath())
            let result=await gitHelper.log({file:path,format:"%ad"},(err,log)=>{
                resolve(log.all.map((it)=>new Date(Date.parse(it["date"]))))
            })
        })
       
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
    private ast_type:{[key:string]:AST_Class}={}
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
    static fromAstType(ast_type:AST_Type):ASTBuildingContext{
        let result=new ASTBuildingContext()
        result.ast_type=ast_type
        return result;
    }
    getKeys():string[]{
        return Object.keys(this.ast_type)
    }   
    getByPath(path:string):AST_Class{
        return this.ast_type[path]
    }
    findInPath(path:string, className:string):AST_Class{
        let ast=this.getByPath(path)
        if(ast.name==className){
            return ast;
        }
        else{
            for(let cls of Object.values(ast.innerDefinedClasses)){
                if((cls as any).name==className){
                    return cls as any;
                }
            }
            for(let cls of Object.values(ast.innerDefinedInterfaces)){
                if((cls as any).name==className){
                    return cls as any;
                }
            }

        }
        throw new Error("Could not find class "+className+" in "+path)
    }
    getCorrectPath(id:string):string{
        for(let key of Object.keys(this.ast_type)){
            if(id.endsWith(this.ast_type[key].key)){
                return this.ast_type[key].file_path

            }
        }
        throw new Error("Could not find path for "+id)
    }
    getExtendingOrImplementingClassKeys(filePath:string):string[]{
        let astKey=this.getByPath(filePath).key;
        let result:string[]=[]
        for(let key of Object.keys(this.ast_type)){
          
            if(this.ast_type[key].extends_.some((it)=>it.endsWith(astKey))||this.ast_type[key].implements_.some((it)=>it.endsWith(astKey))){
                result.push(this.ast_type[key].file_path)
            }
        }
        return result;
        
    }
}
export class DataClumpDetectorContext extends DataClumpRefactoringContext {
    setDataClumpDetectionResult(values: DataClumpTypeContext[]) {
       this.currDataClumpDetectionResult.data_clumps={}
        for (let value of values) {
            this.currDataClumpDetectionResult.data_clumps[value.key] = value
        }
        
    }
    isFiltered() {
        return this.allDataClumpDetectionResult.length > 1
    }
    static fromArray(data: DataClumpsTypeContext[]): DataClumpDetectorContext {
        let result= new DataClumpDetectorContext({} as any);
        result.allDataClumpDetectionResult = data
        result.currDataClumpDetectionResult = data[data.length - 1]
        return result
    }
    private currDataClumpDetectionResult:  DataClumpsTypeContext
    private allDataClumpDetectionResult: DataClumpsTypeContext[]
    getDataClumpDetectionResult(): DataClumpsTypeContext {
        return this.currDataClumpDetectionResult
    }
    getDataClumpTypeContext(key: string): DataClumpTypeContext {
        return this.currDataClumpDetectionResult.data_clumps[key]!
    }
    getDataClumpKeys(): Iterable<string> {
        return Object.keys(this.currDataClumpDetectionResult.data_clumps);
    }

    deleteEntry(key: string) {
        delete this.currDataClumpDetectionResult.data_clumps[key]
    }
    serialize(path?: string | undefined): void {
        const usedPath=this.getSerializationPath(path)
        fs.writeFileSync(usedPath, JSON.stringify(this.allDataClumpDetectionResult))
    }
    constructor(dataClumpDetectionResult: DataClumpsTypeContext) {
        super();
        this.allDataClumpDetectionResult = [dataClumpDetectionResult]
        this.currDataClumpDetectionResult = dataClumpDetectionResult
    }
    cloneLastItem(){
        let cloned=JSON.parse(JSON.stringify(this.currDataClumpDetectionResult))
        this.allDataClumpDetectionResult.push(cloned)
        this.currDataClumpDetectionResult=cloned
        return cloned;
    }
    updateStats(){
        let result=this.currDataClumpDetectionResult
        let amountDataClumps=0;
        let classes=new Set<string>()
        let files=new Set<string>()
        let methods=new Set<string>()
        let fieldsToFields=0
        let parametersToFields=0
        let parametersToParameters=0
        for(let key of Object.keys(result.data_clumps)){
            let dataClump=result.data_clumps[key]
            classes.add(dataClump.from_class_or_interface_key)
            classes.add(dataClump.to_class_or_interface_key)
            files.add(dataClump.from_file_path)
            files.add(dataClump.to_file_path)
            amountDataClumps++;
            if(dataClump.from_method_key!=null&&dataClump.to_method_key!=null){
                methods.add(dataClump.from_method_key)
                methods.add(dataClump.to_method_key)
                parametersToParameters++;
            }
            else if(dataClump.from_method_key!=null){
                methods.add(dataClump.from_method_key)
                parametersToFields++;
            }
            else if(dataClump.to_method_key!=null){
                methods.add(dataClump.to_method_key)
                parametersToFields++;
            }
            else{
                fieldsToFields++;
            }

            
        }
        result.report_summary.amount_classes_or_interfaces_with_data_clumps=classes.size
        result.report_summary.amount_files_with_data_clumps=files.size
        result.report_summary.amount_methods_with_data_clumps=methods.size
        result.report_summary.fields_to_fields_data_clump=fieldsToFields
        result.report_summary.parameters_to_fields_data_clump=parametersToFields
        result.report_summary.parameters_to_parameters_data_clump=parametersToParameters

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
        for (let [key, value] of this.dataClumpKeyName) {
            serialized[key] = value
        }
        fs.writeFileSync(usedPath, JSON.stringify(serialized))
    }
    setNameKeyPair(name: string, dataClumpKey: string) {
        this.nameDataClumpKey.set(name, dataClumpKey)
        this.dataClumpKeyName.set(dataClumpKey, name)
    }

}
export class ClassPathContext extends DataClumpRefactoringContext {
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
    private returnedCode:{[key:string]:string}={}
    constructor() {
        super();
    }
    public setReturnedCode(key: string, code: string) {
        this.returnedCode[key] = code
    }
    public getReturnedCode(key: string): string {
        return this.returnedCode[key]
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
export class EvaluationContext extends DataClumpRefactoringContext {
    runningTimes:{[stepName:string]:number}={}
    constructor(runningTimes:{[stepName:string]:number}) {
        super()
        this.runningTimes=runningTimes
    }
    serialize(path?: string | undefined): void {
        const usedPath=this.getSerializationPath(path)
        fs.writeFileSync(usedPath, JSON.stringify(this.runningTimes))
    
    }
}
export const MandatoryContextNames=[CodeObtainingContext.name,RefactoredContext.name]


export function createDataClumpsTypeContext(data_clumps: Dictionary<DataClumpTypeContext>,context?:DataClumpRefactoringContext): DataClumpsTypeContext {
    return {
        
            "report_version": "unknown",
            "report_timestamp": new Date().toISOString(),
            "target_language": "java",
            "report_summary": {
              "additional": null,
              "amount_classes_or_interfaces_with_data_clumps": 6,
              "amount_files_with_data_clumps":0,
              "amount_methods_with_data_clumps": 0,
              "fields_to_fields_data_clump": 0,
              "parameters_to_fields_data_clump": 0,
              "parameters_to_parameters_data_clump": 6,
              "amount_data_clumps": 0
            },
            "project_info": {
              "project_url": "git@github.com:compf/javaTest",
              "project_name": "unknown_project_name",
              "project_version": "1",
              "project_commit_hash": "unknown",
              "project_tag": null,
              "project_commit_date": null,
              "additional": {},
              "number_of_files": 11,
              "number_of_classes_or_interfaces": 13,
              "number_of_methods": 48,
              "number_of_data_fields": 32,
              "number_of_method_parameters": 47
            },
            "detector": {
              "name": "data-clumps-doctor",
              "url": "https://github.com/NilsBaumgartner1994/data-clumps-doctor",
              "version": "unknown",
              "options": {
                "typeVariablesConsidered": false,
                "similarityModifierOfVariablesWithUnknownType": 0,
                "fieldsOfClassesWithUnknownHierarchyProbabilityModifier": 0,
                "sharedFieldsToFieldsAmountMinimum": 3,
                "analyseFieldsInClassesOrInterfacesInheritedFromSuperClassesOrInterfaces": false,
                "sharedParametersToParametersAmountMinimum": 3,
                "sharedParametersToFieldsAmountMinimum": 3,
                "methodsOfClassesOrInterfacesWithUnknownHierarchyProbabilityModifier": 0
              }
            },
            "data_clumps": data_clumps
           
            
          
        
    }
}
