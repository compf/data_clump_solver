import fs from "fs"
import OpenAI from 'openai';
import { ChatMessage, LanguageModelInterface } from "./LanguageModelInterface";
export class ChatGPTInterface extends LanguageModelInterface{
    private api:OpenAI;

    constructor(args:{model:string,temperature:number}|undefined){
        super();
        let model:string
        let temperature:number
        if(args){
            model=args.model
            temperature=args.temperature
        }
        else{
            model="gpt-4-1106-preview"
            temperature=0.9
        }
        this.completions={
            messages:[],
            model:model,
            response_format:{type:"json_object"},
            temperature:temperature,
        }
        this.api=new OpenAI({
            apiKey:this.loadToken(),
            
        
        });
        
    }
    clear(): void {
        this.completions.messages=[]
    }
    private completions:OpenAI.ChatCompletionCreateParamsNonStreaming
    private lastUsage:OpenAI.CompletionUsage={
        prompt_tokens: 0,
        completion_tokens: 0,
        total_tokens: 0
    }
    loadToken():string{
        return fs.readFileSync("CHATGPT_TOKEN",{encoding:"utf-8"})
    }
    async  sendMessages(clear:boolean): Promise<ChatMessage> {
        console.log("SENDING")
        let response= await this.api.chat.completions.create(this.completions);
        if(clear){
            this.clear()
        }
        this.lastUsage=response.usage!
        console.log(JSON.stringify(response,undefined,4))
        if(response.choices.length>0){
            let allMessages=response.choices.map((x)=>x.message.content!!)
            for(let choice of response.choices){
                console.log(choice.message.content)
                this.completions.messages.push({role:"assistant",content:choice.message.content})
                console.log("####")
            }
            return {messages:allMessages,messageType:"output"}
        }
        return {messages:["No response"],messageType:"output"}
    }
    getTokenStats(): { prompt_tokens: number; completion_tokens: number; total_tokens: number; } {
        return this.lastUsage
    
    }
     prepareMessage(message:string):ChatMessage{
        this.completions.messages.push(
            {content:message,
                role:"user",
               
            
            })
           return {messages:[message],messageType:"input"}
           
    }
 
}