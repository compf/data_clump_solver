import fs from "fs"
import net from "net"
const PORT=1997
const HOST="127.0.0.1"
import { ChatMessage, LanguageModelInterface } from "./LanguageModelInterface";
import ChildProcessWithoutNullStreams = require("child_process");
export class PhindraInterface extends LanguageModelInterface{
private static  staticClient:net.Socket|null=null;
private client:net.Socket
private shallClear=false;
private newMessages:string[]=[]
    constructor(args:{model:string,temperature:number}|undefined){
        super();
        if(PhindraInterface.staticClient==null){
            PhindraInterface.staticClient=new net.Socket();
            PhindraInterface.staticClient.connect(PORT,HOST,()=>{
                console.log("connected")
            });
            PhindraInterface.staticClient.on("data",(data)=>{
                let length=data.readInt32LE(0)
                let response=data.toString("utf-8",4);
                this.newMessages=[]
                let responseParsed=JSON.parse(response)  
                let newMessages:string[]=[]
                for(let msg of responseParsed){
                    this.messages.push("### Assistant\n"+msg)
                    newMessages.push(msg )
                    this.newMessages.push(msg)
                }
                if(this.shallClear){
                    this.clear()
                }
            })
            
        }

        this.client=PhindraInterface.staticClient
        let temperature:number
        if(args){
            temperature=args.temperature
        }
        else{
            temperature=0.9
        }
      
        this.setTemperature(temperature)
        
    }
    setTemperature(temperature:number){
        this.client.write("set_temperature "+temperature+"\n")
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
        this.client.write(input)
        
        return new Promise( (p)=>{
            this.client.once("data",(a)=>{
                let msg:ChatMessage={
                    messages:this.newMessages,
                    messageType:"output"
                }
                return p(msg)}
            
            )});
        }
            
           
           
       
  
     
        
      
    
    getTokenStats(): { prompt_tokens: number; completion_tokens: number; total_tokens: number; } {
        return this.lastUsage
    
    }
     prepareMessage(message:string):ChatMessage{
        this.messages.push("### User Message:\n"+message+"\n")
        return {messages:[message],messageType:"input"}
           
    }
 
}