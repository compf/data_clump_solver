import fs from "fs"
export class ChatGPTInterface{
    private api:any=null
    private chatID:string="";
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
       
        const res = await this.api.sendMessage(message)
        this.chatID=res.id
        return res.text;
    }
     constructor(){
        
        
          
    }
}