import { DataClumpTypeContext, DataClumpsTypeContext, Dictionary } from "data-clumps-type-context";
import { PipeLineStep, PipeLineStepType } from "../pipeline/PipeLineStep";
import { VariableOrMethodUsage } from "./VariableOrMethodUsage";
import { nodeModuleNameResolver } from "typescript";
import fs from "fs"
import path from "path"
import { resolve } from "path";
import { AST_Class, AST_Type } from "./AST_Type";
import { getRelevantFilesRec, makeUnique, nop, shallIgnore, waitSync } from "../util/Utils";
import { Configuration } from "../config/Configuration";
import simpleGit from "simple-git";
import { ValidationInfo } from "../pipeline/stepHandler/validation/ValidationStepHandler";
import { ChatMessage } from "../util/languageModel/AbstractLanguageModel";

export function getContextSerializationBasePath(context:DataClumpRefactoringContext):string{
    let outputPath=resolve(context.getProjectPath(),".data_clump_solver_data/")
    if(!fs.existsSync(outputPath)){
        fs.mkdirSync(outputPath)
        if(fs.existsSync(resolve(context.getProjectPath(),".git"))){
            let exclude=fs.readFileSync(resolve(context.getProjectPath(),".git","info","exclude"),{encoding:"utf-8"})
            exclude+="\n"+".data_clump_solver_data/*\n"+".data_clump_solver_data/astOut/*"
            fs.writeFileSync(resolve(context.getProjectPath(),".git","info","exclude"),exclude)
            fs.mkdirSync(resolve(resolve(context.getProjectPath(),".data_clump_solver_data","astOut")))
        }
    }
    return outputPath
}
export function getContextSerializationPath(targetContext:DataClumpRefactoringContext|null,context:DataClumpRefactoringContext):string{

    let result= targetContext!=null ? targetContext: context;
    return resolve(getContextSerializationBasePath(context),result.getDefaultSerializationPath())
}
export  class DataClumpRefactoringContext {
    protected previousContext: DataClumpRefactoringContext | null = null;

    getPreviousContext(): DataClumpRefactoringContext | null {
        return this.previousContext
    }
    buildNewContext(context: DataClumpRefactoringContext): DataClumpRefactoringContext {
        if(context==this){
            return this;
        }
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
            let obj=Object.values(PipeLineStep).filter((it)=>it.associatedContext==curr.constructor.name)[0]
            if(obj){
                result.add(obj.position)
            }
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
    getFirstByType<T>(ctor: new (...a: any) => T): T | null {
        let curr: DataClumpRefactoringContext|null = this;
        let best:DataClumpRefactoringContext|null=null;
        while (curr!=null) {
            if(curr instanceof ctor){
                best=curr;
            }
            curr=curr.previousContext;
            

        }
        return best as T;
    }
    getRelevantLocation():RelevantLocationsContext|null{
        let curr: DataClumpRefactoringContext = this;
        while (!("getRelevantLocations" in curr)) {
            curr = curr.previousContext!
            if (curr == null) {
                return null;
            }

        }
        return curr as RelevantLocationsContext
    }
    getProgrammingLanguage():string{
        return this.sharedData["config"].ProgrammingLanguage
    }
    getProjectPath(): string {
        return this.getByType(CodeObtainingContext)!!.getPath()
    }
     serialize(){}
     getSerializationPath():string{
         return getContextSerializationPath(this,this)
     }
     getDefaultSerializationPath(): string {
        return  "other.json"
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

    async getRecentlyChangedFiles(upTo:number, context:FileFilteringContext):Promise<string[]>{
        let gitHelper=simpleGit(this.getProjectPath())
        let files:Set<string>=new Set<string>()
        let log=await gitHelper.log(["--stat"]);
        for(let entry of log.all){
            let currFiles=entry.diff?.files.map((it)=>it.file.replace(".../"  ,""))||[]
            for(let file of currFiles){
                if(!shallIgnore(file,context)){
                    shallIgnore(file,context)
                    files.add(file)
                    //console.log(file)

                }
                if(files.size>=upTo){
                    break;
                }
            }
            if(files.size>=upTo){
                break;
            }
        }
        console.log("processed",Array.from(files))
        return Array.from(files)        
    }
    

}
export class FileFilteringContext extends DataClumpRefactoringContext {
    includeGlobs: string[];
    excludeGlobs: string[];
    includePrevails: boolean=true;
    customFilters:boolean=false;
    constructor(includeGlobs: string[], excludeGlobs: string[]) {
        super()
        this.includeGlobs = includeGlobs
        this.excludeGlobs = excludeGlobs
    }
    getPosition(): number {
        return 1;
    }
}

export class ASTBuildingContext extends DataClumpRefactoringContext implements RelevantLocationsContext {
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
    getRelevantLocations(lines: { [path: string]: Set<number>; }): void {
        const DATA_CLUMP_THRESHOLD=3;
        for(let type of Object.values(this.ast_type)){
            
            let set=new Set<number>();
            let fields=Object.values(type.fields);
            if(fields.length>=DATA_CLUMP_THRESHOLD){
                for(let f of fields){
                    set.add(f.position.startLine);
                }

            }
            for(let m of Object.values(type.methods)){
                if(m.parameters.length>=DATA_CLUMP_THRESHOLD){
                    for(let f of m.parameters){
                        set.add(f.position.startLine);
                    }
                }
            }
            if (set.size>0 && !(type.file_path in lines)){
                lines[type.file_path]=set;
            }
            
            
        }

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
    getCorrectPath(id:string):string|null{
        for(let key of Object.keys(this.ast_type)){
            if(id.endsWith(this.ast_type[key].key)){
                return this.ast_type[key].file_path

            }
        }
        return null;
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

export  class RelevantLocationsContext{
     getRelevantLocations(lines:{[path:string]:Set<number>}):void{}
}

export class DataClumpDetectorContext extends DataClumpRefactoringContext implements RelevantLocationsContext {
    setDataClumpDetectionResult(values: DataClumpsTypeContext) {
       this.currDataClumpDetectionResult=Object.assign(this.currDataClumpDetectionResult,values)
       //console.log("setting data clump detection result",this.currDataClumpDetectionResult)
        for (let value of Object.values(values.data_clumps)) {
            this.currDataClumpDetectionResult.data_clumps[value.key] = value
            let nameTypeKey=this.createDataTypeNameClumpKey(value)
            if(!(nameTypeKey in this.byNameTypeKeys)){
                this.byNameTypeKeys[nameTypeKey]=[]
            }
            this.byNameTypeKeys[nameTypeKey].push(value)
        }
        
    }
    getRelevantLocations(lines:{[path:string]:Set<number>}):void {
        for(let dc of Object.values(this.currDataClumpDetectionResult.data_clumps)){
            if (!(dc.from_file_path in lines)){
                lines[dc.from_file_path]=new Set<number>();
            }
            for(let dcData of Object.values(dc.data_clump_data)){
                lines[dc.from_file_path].add(dcData.position.startLine)
            }
            if (!(dc.to_file_path in lines)){
                lines[dc.to_file_path]=new Set<number>();
            }
            for(let dcData of Object.values(dc.data_clump_data)){
                lines[dc.to_file_path].add(dcData.to_variable.position.startLine)
            }
            
        }
    }
    isFiltered() {
        return false;
    }

    private currDataClumpDetectionResult:  DataClumpsTypeContext=createDataClumpsTypeContext({})
    private byNameTypeKeys:{[key:string]:DataClumpTypeContext[]}={}
    getDataClumpDetectionResult(): DataClumpsTypeContext {
        //throw this.currDataClumpDetectionResult
        return this.currDataClumpDetectionResult
    }
    getRelatedDataClumpKeys(dc:DataClumpTypeContext):DataClumpTypeContext[]{
        let key=this.createDataTypeNameClumpKey(dc)
        let related=this.byNameTypeKeys[key]

        return this.byNameTypeKeys[key];
    }
    getFirstDataClumpByTypeNameKey(key:string):DataClumpTypeContext{
        return this.byNameTypeKeys[key][0]
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
    createDataTypeNameClumpKey(dataClump: DataClumpTypeContext):string {
        return Object.values(dataClump.data_clump_data).sort((a,b)=>a.name.localeCompare(b.name)).map((it)=>it.type +" " +it.name   ).join(";");
        
    }

    getContextIndex(): number {
        let index=0;
        let curr:DataClumpRefactoringContext|null=this;
        while(curr != null && curr.getPreviousContext()!=null){
            curr=curr.getPreviousContext()!;
            curr=curr.getByType(DataClumpDetectorContext);
            index++;
        }
        return index;

    }

    serialize(path?: string | undefined): void {
        let usedPath=this.getSerializationPath()
        usedPath=usedPath.replace(".json","_"+this.getContextIndex()+".json")
        fs.writeFileSync(usedPath, JSON.stringify(this.currDataClumpDetectionResult))
       
       
    }
    constructor(dataClumpDetectionResult: DataClumpsTypeContext) {
        super();
        this.currDataClumpDetectionResult = dataClumpDetectionResult
        for (let value of Object.values(this.currDataClumpDetectionResult.data_clumps)) {
            this.currDataClumpDetectionResult.data_clumps[value.key] = value
            let nameTypeKey=this.createDataTypeNameClumpKey(value)
            if(!(nameTypeKey in this.byNameTypeKeys)){
                this.byNameTypeKeys[nameTypeKey]=[]
            }
            this.byNameTypeKeys[nameTypeKey].push(value)
        }
    }
    cloneLastItem(){
        let cloned=JSON.parse(JSON.stringify(this.currDataClumpDetectionResult))
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
        return  "dataClumpDetectorContext.json"
    }
}

export class LargeLanguageModelContext extends DataClumpRefactoringContext {
    private chat:ChatMessage[]=[]   
    constructor(chat:ChatMessage[]) {
        super();
        this.chat=chat
    }
    getChat():ChatMessage[]{
        return this.chat
    }
}

export class NameFindingContext extends DataClumpRefactoringContext {
    private nameDataClumpKey: Map<string, string> = new Map<string, string>()
    private dataClumpKeyName: Map<string, string> = new Map<string, string>()
    getNameByDataClumpKey(name: string): string|undefined {
        return this.dataClumpKeyName.get(name)
    }
    getDataClumpKeyByName(name: string): string {
        return this.nameDataClumpKey.get(name)!
    }
    getPosition(): number {
        return 4;
    }
    getDefaultSerializationPath():string{
        return "nameFindingContext.json"
    }
    override serialize(path?: string): void {
        const usedPath=this.getSerializationPath()
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
       return this.dataClumpKeyClassPath[variableKey]
    }
    setExtractedClassPath(variableKey: string, classPath: string) {
        this.dataClumpKeyClassPath[variableKey] = classPath
    }
    deleteExtractedClassPath(variableKey: string) {
        delete this.dataClumpKeyClassPath[variableKey]
    }
    getAllExtractedClassPaths():Set<string>{
        return new Set( Object.values(this.dataClumpKeyClassPath))
    }
    getDataClumpKeysByPath(path:string):string[]{
        let result:string[]=[]
        for(let key in this.dataClumpKeyClassPath){
            if(this.dataClumpKeyClassPath[key]==path){
                result.push(key)
            }
        }
        return result;
    }
    private dataClumpKeyClassPath: { [key: string]: string } = {}
    getDefaultSerializationPath(): string {
        return "classExtractionContext.json"
    }
    serialize(path?: string | undefined): void {
        const usedPath=this.getSerializationPath()

        fs.writeFileSync(usedPath, JSON.stringify(this.dataClumpKeyClassPath))
    }
    getPosition(): number {
        return 5;
    }

}
export class UsageFindingContext extends DataClumpRefactoringContext implements RelevantLocationsContext {
    usages: { [key: string]: VariableOrMethodUsage[] } = {};
    constructor(usages: { [key: string]: VariableOrMethodUsage[] }) {
        super();
        this.usages = usages;
    }
    getDefaultSerializationPath(): string {
        return  "usageFindingContext.json"
    }
    getRelevantLocations(lines: { [path: string]: Set<number>; }): void {
        for(let usages of Object.values(this.usages)){
            for(let usg of usages){
                if (!(usg.filePath in lines)){
                    lines[usg.filePath]=new Set<number>();
                }
               
                lines[usg.filePath].add(usg.range.startLine)
            }
           
        }
    }
    serialize(path?: string | undefined): void {
        const usedPath=this.getSerializationPath()
        let serialized: Dictionary<VariableOrMethodUsage[]> = {}
        for (let [key, value] of Object.entries(this.usages)) {
            serialized[key] = value
        }
        fs.writeFileSync(usedPath, JSON.stringify(serialized))
    }
    getUsages(): { [key: string]: VariableOrMethodUsage[] } {
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
export type ValidationResult={
    errors: ValidationInfo[]
    success: boolean;
    raw?:string
}
export class ValidationContext extends DataClumpRefactoringContext  implements RelevantLocationsContext {
    errors: ValidationInfo[]
    success: boolean;
    raw?:string
    constructor(res: ValidationResult) {

        super()
        this.errors = res.errors;
        this.success=res.success
        this.raw=res.raw
    }
    getRelevantLocations(lines: { [path: string]: Set<number>; }): void {
       
        for(let v of this.errors){
            if(!(v.filePath in lines)){
                lines[v.filePath]=new Set<number>();
            }
            lines[v.filePath].add(v.lineNumber)
        }
    }
}
export class EvaluationContext extends DataClumpRefactoringContext {
    runningTimes:{[stepName:string]:number}={}
    constructor(runningTimes:{[stepName:string]:number}) {
        super()
        this.runningTimes=runningTimes
    }
    serialize(path?: string | undefined): void {
        const usedPath=this.getSerializationPath()
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
