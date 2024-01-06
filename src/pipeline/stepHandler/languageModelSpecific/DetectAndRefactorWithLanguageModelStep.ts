import { DataClumpsTypeContext } from "data-clumps-type-context";
import { CodeObtainingContext, DataClumpDetectorContext, DataClumpRefactoringContext, NameFindingContext, RefactoredContext } from "../../../context/DataContext";
import { ChatGPTInterface } from "../../../util/languageModel/ChatGPTInterface";
import { LanguageModelTemplateResolver, LanguageModelTemplateType } from "../../../util/languageModel/LanguageModelTemplateResolver";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import fs from "fs"
import { files } from "node-dir"
import path from "path";
import { registerFromName, resolveFromName } from "../../../config/Configuration";
import { DataIterator, InstructionIterator, LargeLanguageModelHandler,ReExecutePreviousHandlers } from "./LargeLanguageModelHandlers";
import { ChatMessage } from "../../../util/languageModel/LanguageModelInterface";
export class LargeLanguageModelDetectorContext extends DataClumpDetectorContext{
    public chat: ChatMessage[]
    constructor(typeContext:DataClumpsTypeContext,chat:ChatMessage[]){
        super(typeContext)
        this.chat=chat
    }
   
}
function isReExecutePreviousHandlers(object: any): object is ReExecutePreviousHandlers {
    // replace 'property' with a unique property of ReExecutePreviousHandlers
    return 'shallReExecute' in object;
}
export class DetectAndRefactorWithLanguageModelStep extends AbstractStepHandler {
    private handlers: LargeLanguageModelHandler[] = []
    async handle(context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
        let api = new ChatGPTInterface()
       let replaceMap={
            "${programming_language}": "Java",
            "${examples}":fs.readFileSync("chatGPT_templates/DataClumpExamples.java", { encoding: "utf-8" }),
            "${output_format}":fs.readFileSync("chatGPT_templates/json_output_format.json", { encoding: "utf-8" }),
        };
        let chat:ChatMessage[]=[]
        let handlerIndex=0
        for (handlerIndex=0;handlerIndex<this.handlers.length;handlerIndex++) {
            let handler=this.handlers[handlerIndex]
            let messages=await handler.handle(context, api, replaceMap)
            if( isReExecutePreviousHandlers(handler) && handler.shallReExecute()){
                handlerIndex=-1;
            }
            chat.push(...messages)
        }
        
        
       
        let newContext=context.buildNewContext(new LargeLanguageModelDetectorContext(this.buildTypeContext(chat),chat))
        return  newContext;
    }
    constructor(args:{handlers:{name:string,args:any}[]}){
        super();
        let i=0
        for(let handler of args.handlers){
            registerFromName(handler.name,LargeLanguageModelHandler.name+i,handler.args)
            this.handlers.push(resolveFromName(LargeLanguageModelHandler.name+i) as LargeLanguageModelHandler)
            i++;
        }

    }
    buildTypeContext(chat:ChatMessage[]):DataClumpsTypeContext{
        return  {data_clumps:{}} as any;
    }

   
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.ASTGeneration, PipeLineStep.DataClumpDetection, PipeLineStep.NameFinding, PipeLineStep.ClassExtraction, PipeLineStep.ReferenceFinding, PipeLineStep.Refactoring]
    }
  addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
    
    createdContexts.add(DataClumpDetectorContext.name) 
    createdContexts.add(NameFindingContext.name);   
    createdContexts.add(RefactoredContext.name)
  }

}