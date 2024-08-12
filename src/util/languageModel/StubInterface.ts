import fs from "fs"
import net from "net"



import { ChatMessage, AbstractLanguageModel, MessageType } from "./AbstractLanguageModel";
import { OutputChecker } from "./OutputChecker"

export class StubInterface extends AbstractLanguageModel{

    private responsePath:string="stuff/response.json"

    constructor(args:any){
        super();
        Object.assign(this,args)
        
    }
  
    clear(): void {
        this.messages=[]
    }
    private  messages:string[]=[]
    private lastUsage={
        prompt_tokens: 0,
        completion_tokens: 0,
        total_tokens: 0
    }

    async  sendMessages(clear:boolean): Promise<ChatMessage> {
        const chatPath="stuff/chat.txt"
        fs.writeFileSync("stuff/request.txt",this.messages.join("\n"))
        let output=fs.readFileSync(this.responsePath,{encoding:"utf-8"})
        let parsed=JSON.parse(output)

        return {messageType:"output",messages:[
            parsed.choices[0].message.content
        ]}
        
        
        }

    getTokenStats(): { prompt_tokens: number; completion_tokens: number; total_tokens: number; } {
        return this.lastUsage
    
    }
     prepareMessage(message:string,messageType?:MessageType):ChatMessage{
        let chatMsg={messages:[message],messageType:messageType??"input"}
        let role="user";
        if(messageType=="system"){
            role="assistant"
        }
        this.messages.push(message)
        return chatMsg; 
           
    }
    resetParameters(parameters: { temperature: number; model: string; }) {
        
    }
 
}