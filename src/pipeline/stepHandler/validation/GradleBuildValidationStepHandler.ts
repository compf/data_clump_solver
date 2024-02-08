import { DataClumpRefactoringContext } from  "../../../context/DataContext";
import { ValidationStepHandler } from "./ValidationStepHandler";
import { spawnSync } from "child_process"

export class GradleBuildValidationStepHandler extends ValidationStepHandler {
    async validate(context: DataClumpRefactoringContext): Promise<{ success: boolean; messages: {stderr:string,stdout:string} | null; }> {
       let runResult= spawnSync("gradle",["build"],{cwd:context.getProjectPath()})
       runResult.error
       const status=runResult.status
       console.log("Status code",status)
       if(status===0){
           return {success:true,messages:null}
       }
       else {
              return {success:false,
                messages:{
                    stderr:runResult.stderr.toString(),
                    stdout:runResult.stdout.toString()
                
                }
            }
       }
    }
    protected isCompatibleWithSystem(): boolean {
       let runResult= spawnSync("gradle",["--version"])
       if(runResult.error){
           return false
       }
       return true
        
    }
}