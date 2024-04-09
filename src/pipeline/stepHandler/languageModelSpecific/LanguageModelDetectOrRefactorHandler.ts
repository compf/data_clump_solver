import { DataClumpsTypeContext } from "data-clumps-type-context";
import { CodeObtainingContext, DataClumpDetectorContext, DataClumpRefactoringContext, NameFindingContext, RefactoredContext, createDataClumpsTypeContext } from "../../../context/DataContext";
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
import { indexOfSubArray, tryParseJSON } from "../../../util/Utils";
import { DataClumpDetectorStep } from "../dataClumpDetection/DataClumpDetectorStep";

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
    async handle(step:PipeLineStepType, context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
        let api: LanguageModelInterface;
        if (this.providedApi != null) {
            api = this.providedApi
        }
        else {
            api = resolveFromInterfaceName(LanguageModelInterface.name) as LanguageModelInterface
        }
        let templateResolver = resolveFromConcreteName(LanguageModelTemplateResolver.name) as LanguageModelTemplateResolver

        api.clear();
        let chat: ChatMessage[] = []
        let handlerIndex = 0
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



        return  this.createFittingContext(chat, params!=null?null:step, context) as any;
    }
    createFittingContext(chat: ChatMessage[], step: PipeLineStepType|null, context: DataClumpRefactoringContext): DataClumpRefactoringContext {

        let resultContext:DataClumpRefactoringContext = step==PipeLineStep.DataClumpDetection? new DataClumpDetectorContext(createDataClumpsTypeContext({},context)): new RefactoredContext();
        resultContext=context.buildNewContext(resultContext);
        (resultContext as any).chat = chat
        for (let c of chat) {
            if (c.messageType == "output") {
                for (let m of c.messages) {
                    let json = tryParseJSON(m)
                    if (json == null) {
                        continue
                    }
                    
                    else if (step == PipeLineStep.Refactoring) {
                        if(("refactorings" in json)){
                            this.parse_content(json, context)
                        }
                        else{
                            for (let key in json) {
                                let path = this.parse_key(key, context)
                                let content = this.parse_content(json[key], context)
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
    parse_content(content: any, context: DataClumpRefactoringContext): string | null {
        if(typeof content=="string"){
            if (!content.includes("{")) {
                return null
            }
        }
        else if(typeof content=="object"){
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

                for(let change of content.refactorings[refactoredPath]){
                    let lines=change.lineRange.split("-").map((x)=>parseInt(x))
                    let start=lines[0]
                    let end=lines[1]
                    
                    let newContent=change.newContent
                    let oldContent=change.oldContent
               
                    fileContent=fileContent.replaceAll(oldContent,newContent)
                    console.log()
                    console.log(oldContent)
                    console.log(newContent)
                    let startIndex=start
                    const offset=-4
                    startIndex-=offset
                    if(startIndex<0){
                        throw new Error("Invalid line range")
                    }
                    
                    
                   
                }
                console.log(path)
                fs.writeFileSync(path,fileContent)
            }
            for(let extractedClassPath of Object.keys(content.extractedClasses)){
                let path = resolve(context.getProjectPath(), extractedClassPath)
                fs.writeFileSync(path,content.extractedClasses[extractedClassPath])
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