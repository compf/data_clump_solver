import fs from "fs"
import OpenAI from 'openai';
import { ChatMessage, AbstractLanguageModel, MessageType, TokenStats } from "./AbstractLanguageModel";
type Formats="json_object"|"text"
import { HttpsProxyAgent } from 'https-proxy-agent';
export class ChatGPTInterface extends AbstractLanguageModel{

    resetParameters(parameters: { temperature: number; model: string; }) {
        this.completions.model=parameters.model
        this.completions.temperature=parameters.temperature
    }
    private api:OpenAI;
    private format?:string="text"
    private proxy=fs.existsSync("tokens/use_proxy")
    constructor(args:{model:string,temperature:number,format?:Formats}|undefined){
        super();
        let model:string
        let temperature:number
        if(args){
            model=args.model
            temperature=args.temperature
            if(args.format){
                this.format=args.format
            }
        }
        else{
            model="gpt-4-1106-preview"
            temperature=0.9
        }
        this.completions={
            messages:[],
            model:model,
            response_format:{type:this.format as any},
            temperature:temperature,
        }
        this.api=new OpenAI({
            apiKey:this.loadToken(),
            
        
        });
        if(this.proxy){
            this.api.httpAgent=new HttpsProxyAgent("http://www-proxy.rz.uni-osnabrueck.de:80")
        }
        
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
        return fs.readFileSync("tokens/CHATGPT_TOKEN",{encoding:"utf-8"})
    }
    async  sendMessages(clear:boolean): Promise<ChatMessage> {
        if(this.completions.messages.length==0)return {messages:[],messageType:"output"}
        console.log("SENDING",this.completions.messages)
        fs.writeFileSync("stuff/request.json",JSON.stringify(this.completions,undefined,4))
        //throw this.format
        let response= await this.api.chat.completions.create(this.completions);
        if(clear){
            this.clear()
        }
        fs.writeFileSync("stuff/response.json",JSON.stringify(response,undefined,4))
        //throw this.format
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
    getTokenStats(): TokenStats {
        return this.lastUsage
    
    }
     prepareMessage(message:string,messageType?:MessageType):ChatMessage{
        let role="user"
        if(messageType=="system"){
            role="system"
        }
        if(messageType=="output"){
            role="assistant"
        }
        this.completions.messages.push(
            {content:message,
                role:role as any,
               
            
            })
           return {messages:[message],messageType:"input"}
           
    }
 
}