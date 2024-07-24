import { resolveFromInterfaceName } from "../../config/Configuration";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../context/DataContext";
import { AbstractLanguageModel } from "./AbstractLanguageModel";

export class TolerantOutputParser{
    private parsers:{(text:string,context:DataClumpRefactoringContext):any}[]
    private api:AbstractLanguageModel;
    constructor(api:AbstractLanguageModel,parsers:{(text:string,context:DataClumpRefactoringContext):any}[] ){
        this.parsers=parsers;
        this.api=api;
    }

    async send(clear:boolean, context:DataClumpRefactoringContext):Promise<any>{
        
        let result= await this.api.sendMessages(clear);
        let content=result.messages[result.messages.length-1]
        for(let p of this.parsers){
            let parsed=p(content,context)
            if(parsed){
                return Promise.resolve(parsed)
            }
        }
        throw "Could not parse "+content
    }

}