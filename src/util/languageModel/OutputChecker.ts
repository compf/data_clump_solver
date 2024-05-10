import { DataClumpRefactoringContext } from "../../context/DataContext";
import { GradleBuildValidationStepHandler } from "../../pipeline/stepHandler/validation/GradleBuildValidationStepHandler";
import { MavenBuildValidationStepHandler } from "../../pipeline/stepHandler/validation/MavenBuildValidationStepHandler";
import { parseJSONDetailed, tryParseJSON } from "../Utils";

export interface OutputChecker{
    isValid(content:string,context:DataClumpRefactoringContext):Promise<boolean>; 
    getErrorMessage():string;
}

export class ValidJSONChecker implements OutputChecker{
    private lastError:string=""
    isValid(content: string,context:DataClumpRefactoringContext): Promise<boolean> {
        let result=parseJSONDetailed(content)
        if(result.jsonResult){
            return Promise.resolve(true);
        }
        else{
            this.lastError=result.errorMessage!
            return Promise.resolve(false);
        }
    }
    getErrorMessage(): string {
        return "Your output is not valid JSON.\n"+this.lastError
    }
}

export class BuildChecker implements OutputChecker{
    private lastErrorMessage=""
    async isValid(content: string, context: DataClumpRefactoringContext): Promise<boolean> {
       let gradleValidator=new MavenBuildValidationStepHandler({
    
       });
       return true;
       let result= await  gradleValidator.validate(context)
       console.log("gradle test",result)
       this.lastErrorMessage=result.messages?.stdout+"\n"+result.messages?.stderr;
       return result.success
    }
    getErrorMessage(): string {
        return this.lastErrorMessage
    }

}