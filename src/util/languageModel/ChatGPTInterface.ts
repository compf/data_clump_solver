import fs from "fs"
import OpenAI from 'openai';
import { ChatMessage, LanguageModelInterface } from "./LanguageModelInterface";
export class ChatGPTInterface extends LanguageModelInterface{
    private api:OpenAI;
    constructor(){
        super();
        this.api=new OpenAI({
            apiKey:this.loadToken(),
            
        
        });
        
    }
    private chatID:string|undefined=undefined
    private completions:OpenAI.ChatCompletionCreateParamsNonStreaming={
        messages:[],
        model:"gpt-4-1106-preview",
        response_format:{type:"json_object"},temperature:0.9
    }
    loadToken():string{
        return fs.readFileSync("CHATGPT_TOKEN",{encoding:"utf-8"})
    }
    async  sendMessages(clear:boolean): Promise<ChatMessage> {
        let response= await this.api.chat.completions.create(this.completions);
        if(clear){
            this.completions.messages=[]
        }
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
     prepareMessage(message:string):ChatMessage{
        this.completions.messages.push(
            {content:message,
                role:"user",
               
            
            })
           return {messages:[message],messageType:"input"}
           
    }
 
}