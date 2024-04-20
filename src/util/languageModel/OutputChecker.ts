import { parseJSONDetailed, tryParseJSON } from "../Utils";

export interface OutputChecker{
    isValid(content:string):boolean; 
    getErrorMessage():string;
}

export class ValidJSONChecker implements OutputChecker{
    private lastError:string=""
    isValid(content: string): boolean {
        let result=parseJSONDetailed(content)
        if(result.jsonResult){
            return true;
        }
        else{
            this.lastError=result.errorMessage!
            return false;
        }
    }
    getErrorMessage(): string {
        return "Your output is not valid JSON.\n"+this.lastError
    }
}