import { resolveFromInterfaceName } from "../../config/Configuration";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../context/DataContext";
import { AbstractLanguageModel } from "./AbstractLanguageModel";

/**
 * This class is responsible for parsing the output of the language model
 * It uses a list of parsers to parse the output and returns the parsed output for the first parser that
 * does not return null
 */
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