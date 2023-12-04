import fs from "fs"
import OpenAI from 'openai';
import { LanguageModelInterface } from "./LanguageModelInterface";
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
        model:"gpt-3.5-turbo-1106",
        response_format:{type:"json_object"}
    }
    loadToken():string{
        return fs.readFileSync("CHATGPT_TOKEN",{encoding:"utf-8"})
    }
    async  sendMessages(clear:boolean): Promise<any> {
        let response= await this.api.chat.completions.create(this.completions);
        if(clear){
            this.completions.messages=[]
        }
        console.log(JSON.stringify(response,undefined,4))
        if(response.choices.length>0){
            let allMessages=response.choices.map((x)=>x.message.content)
            for(let choice of response.choices){
                console.log(choice.message.content)
                this.completions.messages.push({role:"assistant",content:choice.message.content})
                console.log("####")
            }
            return allMessages
        }
        return null
    }
     prepareMessage(message:string):LanguageModelInterface{
        this.completions.messages.push(
            {content:message,
                role:"user",
               
            
            })
            return this
           
    }
 
}