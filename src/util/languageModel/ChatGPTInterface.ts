import fs from "fs"
import { LanguageModelInterface } from "./LanguageModelInterface";
export class ChatGPTInterface extends LanguageModelInterface{
    private api:any=null
    private chatID:string|undefined=undefined
    loadToken():string{
        return fs.readFileSync("CHATGPT_TOKEN",{encoding:"utf-8"})
    }
    async sendMessage(message:string):Promise<string>{
        if(this.api==null){
            const ChatGPTAPI=await import ( "chatgpt");
            this.api = new ChatGPTAPI.ChatGPTAPI({
                apiKey: this.loadToken()
              })
        }
       
        const res = await this.api.sendMessage(message,{
            parentMessageId: this.chatID
          })
        this.chatID=res.id
        return res.text;
    }
 
}