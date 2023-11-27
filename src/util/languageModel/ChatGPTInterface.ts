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
        model:"gpt-3.5-turbo"
    }
    loadToken():string{
        return fs.readFileSync("CHATGPT_TOKEN",{encoding:"utf-8"})
    }
    async  sendMessages(clear:boolean): Promise<string|null> {
        let response= await this.api.chat.completions.create(this.completions);
        if(clear){
            this.completions.messages=[]
        }
        if(response.choices.length>0){
            return response.choices[0].message.content!!
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