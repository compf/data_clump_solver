import { DataClumpsTypeContext } from "data-clumps-type-context";
import { CodeObtainingContext, DataClumpDetectorContext, DataClumpRefactoringContext, FileFilteringContext, NameFindingContext, RefactoredContext, UsageFindingContext, createDataClumpsTypeContext } from "../../../context/DataContext";
import { ChatGPTInterface } from "../../../util/languageModel/ChatGPTInterface";
import { LanguageModelTemplateResolver, LanguageModelTemplateType } from "../../../util/languageModel/LanguageModelTemplateResolver";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import fs from "fs"
const Levenshtein=require("levenshtein")
import { files } from "node-dir"
import path from "path";
import { resolve } from "path"
import { getContextSerializationPath, registerFromName, resolveFromConcreteName, resolveFromInterfaceName } from "../../../config/Configuration";
import { LargeLanguageModelHandler, ReExecutePreviousHandlers } from "./LargeLanguageModelHandlers";
import { ChatMessage, LanguageModelInterface, LanguageModelInterfaceCategory } from "../../../util/languageModel/LanguageModelInterface";
import { PipeLine } from "../../PipeLine";
import { getRelevantFilesRec, indexOfSubArray, tryParseJSON } from "../../../util/Utils";
import { DataClumpDetectorStep } from "../dataClumpDetection/DataClumpDetectorStep";
import { BuildChecker, OutputChecker } from "../../../util/languageModel/OutputChecker";

function isReExecutePreviousHandlers(object: any): object is ReExecutePreviousHandlers {
    // replace 'property' with a unique property of ReExecutePreviousHandlers
    return 'shallReExecute' in object;
}
export class LanguageModelDetectOrRefactorHandler extends AbstractStepHandler {
    private handlers: LargeLanguageModelHandler[] = []
    private providedApi: LanguageModelInterface | null = null
    deserializeExistingContext(context: DataClumpRefactoringContext, step: PipeLineStepType): DataClumpRefactoringContext | null {
        let path=getContextSerializationPath(PipeLineStep.DataClumpDetection.name,context)
        if( step== PipeLineStep.DataClumpDetection && fs.existsSync(path)){
            let data=JSON.parse(fs.readFileSync (path,{encoding:"utf-8"}))
            return context.buildNewContext( DataClumpDetectorContext.fromArray(data as DataClumpsTypeContext[]))
        }
        return null
    }
    async createDataClumpLocationAndUsageFilterContext(context: DataClumpRefactoringContext): Promise<DataClumpRefactoringContext> {
        let detectionContext = context.getByType(DataClumpDetectorContext) as DataClumpDetectorContext
        let usageFindingContext=context.getByType(UsageFindingContext) as UsageFindingContext
        if(detectionContext==null){
            return context
        }
        let relevantFiles = new Set<string>()
        //throw " "+Object.values(detectionContext.getDataClumpDetectionResult().data_clumps).length
        for (let dc of Object.values(detectionContext.getDataClumpDetectionResult().data_clumps)) {
            relevantFiles.add(dc.from_file_path)
            relevantFiles.add(dc.to_file_path)
            if(usageFindingContext!=null && dc.key in usageFindingContext.getUsages()){
                for(let usage of usageFindingContext.getUsages()[dc.key]!){
                    //throw  usage.filePath
                    relevantFiles.add(usage.filePath)
                }
            }
            
        }
        let includes: string[] =Array.from(relevantFiles)
        return Promise.resolve( context.buildNewContext(new FileFilteringContext(includes, [])))
    }
     relevantFiles:string[]=[]
    async handle(step:PipeLineStepType, context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
        let api: LanguageModelInterface;
        if (this.providedApi != null) {
            api = this.providedApi
        }
        else {
            api = resolveFromInterfaceName(LanguageModelInterface.name) as LanguageModelInterface
        }
        let templateResolver = resolveFromConcreteName(LanguageModelTemplateResolver.name) as LanguageModelTemplateResolver
        this.providedApi = api
        let chat: ChatMessage[] = []
        let handlerIndex = 0
        getRelevantFilesRec(context.getProjectPath(),this.relevantFiles,context.getByType(FileFilteringContext))
        context=await this.createDataClumpLocationAndUsageFilterContext(context)
        for (handlerIndex = 0; handlerIndex < this.handlers.length; handlerIndex++) {
            let handler = this.handlers[handlerIndex]
            let messages = await handler.handle(context, api, templateResolver)
            if (isReExecutePreviousHandlers(handler) && handler.shallReExecute()) {
                handlerIndex = -1;
            }
            else if (isReExecutePreviousHandlers(handler) && !handler.shallReExecute()) {
                api.clear();
            }
            chat.push(...messages)
        }



        return  await this.tryBuildContext(chat[chat.length-1], params!=null?null:step, context) as any;
    }
    parsePath(filePath:string,context:DataClumpRefactoringContext){
       
        if(fs.existsSync(resolve(context.getProjectPath(),filePath)) && fs.statSync(resolve(context.getProjectPath(),filePath)).isFile() ){
            console.log("exists")
            return resolve(context.getProjectPath(),filePath)
        }
        let bestMatchingResults=this.relevantFiles.filter((it)=>it.endsWith(filePath)).sort((a,b)=>a.length-b.length)
        if(bestMatchingResults.length>0){
            console.log("best matching",bestMatchingResults[0])
            return bestMatchingResults[0]
        }
        else{
            if(filePath.endsWith(".java")){
                let dir=resolve(context.getProjectPath(),path.dirname(filePath))
                if(fs.existsSync(dir)){
                    console.log("existing file")
                    return resolve(context.getProjectPath(),filePath)
                }
                else{
                    let somePath=this.relevantFiles[0]
                    console.log("somepath",somePath)
                    return resolve(path.dirname(somePath),filePath)
                }
            }
        }
        throw "Could not parse "+filePath
    }
    parseMarkdown(context:DataClumpRefactoringContext,message:string, errorMessages:string[]){
        let insideCodeBlock=false;
        let path="";
        let code=""
        let foundPath=false;
        let foundCode=false;
       
        const pathRegex=/([a-zA-z]:\\\\)?((\/|\\)?\w+(\\|\/)?)+\.java/gm
        let lines=message.split("\n")
        for(let line of lines){
            console.log("line",line)
            if ( !insideCodeBlock && line.match(pathRegex)){
                let m=line.match(pathRegex)!
                console.log(line)
                console.log(m)
                line=m[0]
                console.log("detected",line)
                console.log("parsing path")
                path=this.parsePath(line,context);
               // throw path
                foundPath=path!="";
            }
            else if(line.includes("``" )&& !insideCodeBlock){
                insideCodeBlock=true;
                foundCode=true;
            }
            else if(line.startsWith("``" )&& insideCodeBlock){
              
                console.log("path",path)
                insideCodeBlock=false;
                if(path==""){
                    errorMessages.push("I could not identify a valid path in your response. I am processing your response automatically so it is important to mark the path as described")
                }
                else{
                    //fs.writeFileSync(path,code);

                }
                path=""
                code=""
            }
            else if (insideCodeBlock){
                console.log("code",line)
                code+=line+"\n"
            }
            else{
                console.log("OTHER:",line)
            }
        }
        if(!foundCode){
            errorMessages.push("I could not identify source code in your response. I am processing your response automatically so it is important to mark the coding sections as described")
        }
        if(!foundPath){
            errorMessages.push("I could not identify a valid path in your response. I am processing your response automatically so it is important to mark the path as described")

        }
    }
    async tryBuildContext(chat: ChatMessage,step:PipeLineStepType|null,context:DataClumpRefactoringContext){
        let maxAttempts=1
        let outputCheckers:OutputChecker[]=[];
        let shallContinue=true;
        let counter=0
        let nextContext=context;
        while(shallContinue){
            
            chat=await this.providedApi?.sendMessages(false)!
            fs.writeFileSync("stuff/chat.txt",chat.messages[0])
            
            let errorMessages:string[]=[]
             nextContext=await this.createFittingContext(chat,step,context,errorMessages);
            if(errorMessages.length==0){
             for(let checker of outputCheckers){
                if(await checker.isValid("",context)){
                    shallContinue=false;
                }
                else{
                    errorMessages.push(checker.getErrorMessage())
                   
                }
            }
        }
            this.providedApi?.prepareMessage(errorMessages.join("\n"))
            counter++;
            shallContinue=counter<maxAttempts;
        }
        return nextContext

    }
   async createFittingContext(chat: ChatMessage, step: PipeLineStepType|null, context: DataClumpRefactoringContext,errorMessages:string[]): Promise<DataClumpRefactoringContext> {

        let resultContext:DataClumpRefactoringContext = step==PipeLineStep.DataClumpDetection? new DataClumpDetectorContext(createDataClumpsTypeContext({},context)): new RefactoredContext();
        resultContext=context.buildNewContext(resultContext);
        (resultContext as any).chat = chat
        let c=chat
        {
            if (c.messageType == "output") {
                for (let m of c.messages) {
                    let json = tryParseJSON(m)
                    
                    
                     if (step == PipeLineStep.Refactoring) {
                        if(json==null){
                          
                               
                            this.parseMarkdown(context,m,errorMessages)
                        }
                       else if(( "refactorings" in json)){
                            this.parse_piecewise_output(json, context)
                        }
                        else{
                            for (let key in json) {
                                let path = this.parse_key(key, context)
                                let content = json[key]
                                let shallContinue=false
                                do{
                                    break;
                                    console.log("###############################")
                                    console.log(content)
                                    shallContinue=false
                                    content =json[key];
                                    if(typeof content=="string"){
                                        if (!content.includes("{")) {
                                           shallContinue=true
                                        }
                                        let contentStr=content  as string
                                        if(contentStr.split("\n").some((x)=>x.trim().startsWith("//") || x.trim().endsWith("..."))){
                                        const warningMessage="The code you returned contains comments that ends with '...'. This means that you have not returned the whole source code. Please return the full source code including all unchanged parts and do not omit anything for brevity"    
                                        this.providedApi?.prepareMessage(warningMessage)
                                            json=JSON.parse((await this.providedApi!.sendMessages(false)).messages.join("\n"))!
                                        }
                                    }
                                }while(shallContinue)
                                 
                               
                                if (content) {
                                    (resultContext as RefactoredContext).setReturnedCode(path, content)
                                    fs.writeFileSync(resolve(context.getProjectPath(), path), content)
                                }
                            }
                        }
                       
                    }
                    else if (step == PipeLineStep.DataClumpDetection) {
                        let data_clumps_type_context = (resultContext as DataClumpDetectorContext).getDataClumpDetectionResult()
                        for (let key in json.data_clumps) {
                            let newKey = key
                            if (key in data_clumps_type_context.data_clumps) {
                                newKey = newKey + Math.random()
                            }
                            data_clumps_type_context.data_clumps[newKey] = json.data_clumps[newKey]
                        }

                    }





                }
            }
        }
        return resultContext
    }

    parse_key(key: string, context: DataClumpRefactoringContext): string {
        return key
    }
    async parse_full_content(content: any, context: DataClumpRefactoringContext): Promise<string | null>{
       return Promise.resolve(null)
    }
    parse_piecewise_output(content: any, context: DataClumpRefactoringContext): string | null {
        
         if(typeof content=="object"){
            fs.writeFileSync("stuff/test.json",JSON.stringify(content))
            for(let refactoredPath of Object.keys(content.refactorings)){
                console.log(refactoredPath)
                let path = resolve(context.getProjectPath(), refactoredPath)
                let fileContent=fs.readFileSync(path,{encoding:"utf-8"})
                let minLevenshtein=1000000
                let minOffset=100000
                let sign=1
               /* for(let change of content.refactorings[refactoredPath]){
                    let lines=change.lineRange.split("-").map((x)=>parseInt(x))
                    let start=lines[0]
                    for(let target=0;target<fileContent.length;target++){
                        let offset=0
                        let value=new Levenshtein(fileContent[target],change.oldContent).distance
                        
                        
                        if(value<minLevenshtein){
                            minLevenshtein=value
                            minOffset=Math.min(Math.abs(target-start),minOffset)
                            sign=Math.sign(target-start)
                            console.log(change.oldContent)
                            console.log(fileContent[target])
                            console.log(start,target)
                            console.log()
                        }
                    }
                }*/

                //throw minLevenshtein+" "+minOffset +" "+sign
                console.log(content.refactorings[refactoredPath])
                for(let change of content.refactorings[refactoredPath]){
                    let lines=[change.fromLine,change.toLine]
                    let start=lines[0]
                    let end=lines[1]
                    
                    let newContent=change.newContent
                    let oldContent=change.oldContent
                    let index=fileContent.indexOf(oldContent)
                    console.log("change",change)
                    const MAX_OFFSET=100
                    if(index==-1){
                        let splitted=fileContent.split("\n")
                        for(let i=Math.max(0,start-MAX_OFFSET);i<Math.min(end+MAX_OFFSET,splitted.length);i++){
                            console.log("CHECK",splitted[i])
                            let s=splitted[i]
                            if(s!="" && oldContent.trim().startsWith(s.trim())){
                                let newContentSplitted=newContent.split("\n")
                                let oldContentSplitted=oldContent.split("\n")
                                for(let j=0;j<newContentSplitted.length;j++){
                                    s=splitted[i+j]
                                    console.log("REPLACE",s,"by",newContentSplitted[j])
                                    if(j<oldContentSplitted.length){
                                        splitted[i+j]= newContentSplitted[j]
                                    }
                                    else{
                                        splitted.splice(i+j,0,newContentSplitted[j])
                                    }

                                    
                                }
                            }
                        }
                        fileContent=splitted.join("\n")
                       
                        
                    }
                    fileContent=fileContent.replaceAll(oldContent,newContent)
                    console.log()
                   // console.log(oldContent)
                    //console.log(newContent)
                    let startIndex=start
                    const offset=-4
                    startIndex-=offset
                    if(startIndex<0){
                        throw new Error("Invalid line range")
                    }
                    
                    
                   
                }
                console.log(path)
                //fs.writeFileSync(path,fileContent)
            }
            for(let extractedClassPath of Object.keys(content.extractedClasses)){
                let path = resolve(context.getProjectPath(), extractedClassPath)
                //fs.writeFileSync(path,content.extractedClasses[extractedClassPath])
            }
        }
        console.log("return")
        return content
    }
    static createFromCreatedHandlers(handlers: LargeLanguageModelHandler[], api: LanguageModelInterface): LanguageModelDetectOrRefactorHandler {
        let step = new LanguageModelDetectOrRefactorHandler({ handlers: [] })
        step.handlers = handlers
        step.providedApi = api
        return step
    }
    constructor(args: { handlers: string[] }) {
        super();
        for (let handler of args.handlers) {
            this.handlers.push(resolveFromConcreteName(handler) as LargeLanguageModelHandler)
        }

    }
 


    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.ASTGeneration, PipeLineStep.DataClumpDetection, PipeLineStep.Refactoring]
    }
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
        if (pipeLineStep == PipeLineStep.DataClumpDetection) {
            createdContexts.add(DataClumpDetectorContext.name)
        }
        else if (pipeLineStep == PipeLineStep.Refactoring) {
            createdContexts.add(RefactoredContext.name)
        }

    }

}