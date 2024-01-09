import fs from "fs"
import { ChatMessage, LanguageModelInterface } from "./LanguageModelInterface";
import ChildProcessWithoutNullStreams = require("child_process");
export class PhindraInterface extends LanguageModelInterface{
private cp:ChildProcessWithoutNullStreams.ChildProcessWithoutNullStreams
    constructor(args:{model:string,temperature:number}|undefined){
        super();
        let temperature:number
        if(args){
            temperature=args.temperature
        }
        else{
            temperature=0.9
        }
      
        this.cp=ChildProcessWithoutNullStreams.spawn("phython3",["scripts/phindra_server.py"])
        this.cp.stdin.write("set_temperature "+temperature+"\n")
        
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
        if(this.messages.length==0)return {messages:[],messageType:"output"}
        console.log("SENDING",this.messages)
        let input=this.messages.join("\n")
        this.cp.stdin.write(input)
        return new Promise((p)=>{
            this.cp.stdout.on("data", (data: Buffer) => {
            let response= data.toString("utf-8")
            let responseParsed=JSON.parse(response)  
            let newMessages:string[]=[]
            for(let msg of responseParsed){
                this.messages.push("### Assistant\n"+msg)
                newMessages.push(msg )
            }
            p({messages:newMessages,messageType:"output"})
       })
    })
     
        if(clear){
            this.clear()
        }
      
    }
    getTokenStats(): { prompt_tokens: number; completion_tokens: number; total_tokens: number; } {
        return this.lastUsage
    
    }
     prepareMessage(message:string):ChatMessage{
        this.messages.push("### User Message:\n"+message+"\n")
        return {messages:[message],messageType:"input"}
           
    }
 
}