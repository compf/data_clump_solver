export namespace ContextWindowsChecker{
    export function checkContextSize(query:string, modelName:string, contextSize:number,tolerance:number=1.2):boolean{
        let tokens=calcTokens(query,modelName)
        let ratio=tokens/contextSize;
       return ratio >= tolerance;
    }
    function calcTokens(query:string, modelName:string):number{
        let suffix="";
        if(modelName.startsWith("codellama")){
            suffix="llama2";
        }
        else if(modelName.startsWith("codegemma")){
            suffix="gemma";
        }
        const fromPreTrained=require("@lenml/tokenizer-"+suffix)
        const tokenizer = fromPreTrained.fromPreTrained();
        return tokenizer.encode(query,null,{add_special_tokens: true,}).length
    }
}