import { DataClumpsTypeContext } from "data-clumps-type-context";
import { CodeObtainingContext, DataClumpDetectorContext, DataClumpRefactoringContext, NameFindingContext, RefactoredContext } from "../../../context/DataContext";
import { ChatGPTInterface } from "../../../util/languageModel/ChatGPTInterface";
import { LanguageModelTemplateResolver, LanguageModelTemplateType } from "../../../util/languageModel/LanguageModelTemplateResolver";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import fs from "fs"
import { files } from "node-dir"
import path from "path";
import { PromptIterator } from "./PromptIterator";
import { registerFromName, resolveFromName } from "../../../config/Configuration";
import { DataIterator, InstructionIterator } from "./DependentOnAnotherIterator";
export type ChatType={input:string[],output:string[]}[]
export class LargeLanguageModelDetectorContext extends DataClumpDetectorContext{
    public chat: ChatType
    constructor(typeContext:DataClumpsTypeContext,chat:ChatType){
        super(typeContext)
        this.chat=chat
    }
   
}
export class DetectAndRefactorWithLanguageModelStep extends AbstractStepHandler {
    async handle(context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
        let api = new ChatGPTInterface()
       let replaceMap={
            "${programming_language}": "Java",
            "${examples}":fs.readFileSync("chatGPT_templates/DataClumpExamples.java", { encoding: "utf-8" }),
            "${output_format}":fs.readFileSync("chatGPT_templates/json_output_format.json", { encoding: "utf-8" }),
        };
        let chat:ChatType=[]
        
        let isDone=false
        do{
            let curr=this.promptIterator.next(context);
            isDone=curr.done!
            let currMessages=curr.value.messages;
            for (let r of Object.keys(replaceMap)) {
                for (let i = 0; i < currMessages.length; i++) {
                    currMessages[i] = currMessages[i].replace(r, replaceMap[r])
                }
            }
            console.log("MESSAGES",currMessages)

            for(let msg of currMessages){
                api.prepareMessage(msg)
            }
            console.log("SEND")
            let response:string[]=[]
            if(curr.value.shallSend){
                 response=await api.sendMessages(curr.value.clear!)
            }
          
            console.log("RESPONDED")
            let chatResult={
                input:currMessages,
                output:response
            }
            chat.push(chatResult)


            console.log("Done",isDone)
        }while(!isDone)
        let response=await api.sendMessages(true)
        chat.push({
            input:[],
            output: response
        })
        let newContext=context.buildNewContext(new LargeLanguageModelDetectorContext(this.buildTypeContext(chat),chat))
        return  newContext;
    }
    constructor(args:{instructionIterator:any,dataIterator:any}){
        super();
        registerFromName(args.instructionIterator.name,InstructionIterator.name,args.instructionIterator.args)
        registerFromName(args.dataIterator.name,DataIterator.name,args.dataIterator.args)

        this.promptIterator=new PromptIterator(resolveFromName(InstructionIterator.name),resolveFromName(DataIterator.name)) 
    }
    buildTypeContext(chat:ChatType):DataClumpsTypeContext{
        return  {data_clumps:{}} as any;
    }

    private promptIterator:PromptIterator;
   
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.ASTGeneration, PipeLineStep.DataClumpDetection, PipeLineStep.NameFinding, PipeLineStep.ClassExtraction, PipeLineStep.ReferenceFinding, PipeLineStep.Refactoring]
    }
  addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
    
    createdContexts.add(DataClumpDetectorContext.name) 
    createdContexts.add(NameFindingContext.name);   
    createdContexts.add(RefactoredContext.name)
  }

}