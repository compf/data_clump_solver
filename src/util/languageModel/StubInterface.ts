import fs from "fs"
import net from "net"



import { ChatMessage, AbstractLanguageModel, MessageType } from "./AbstractLanguageModel";
import { OutputChecker } from "./OutputChecker"

export class StubInterface extends AbstractLanguageModel{

    private responsePath:string="stuff/response.txt"

    constructor(args:any){
        super();
       this.responsePath=args.responsePath
        
    }
  
    clear(): void {
        this.messages=[]
    }
    private  messages:string[]=[]
    private outputCheckers:OutputChecker[]=[]
    private lastUsage={
        prompt_tokens: 0,
        completion_tokens: 0,
        total_tokens: 0
    }

    async  sendMessages(clear:boolean): Promise<ChatMessage> {
        const chatPath="stuff/chat.txt"
        fs.writeFileSync("stuff/request.txt",this.messages.join("\n"))
        let output=fs.readFileSync(this.responsePath,{encoding:"utf-8"})
        return {messageType:"output",messages:[
            output
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
 
}