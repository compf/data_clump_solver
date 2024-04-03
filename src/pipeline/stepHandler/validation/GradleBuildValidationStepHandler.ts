import { DataClumpRefactoringContext } from  "../../../context/DataContext";
import { ValidationStepHandler } from "./ValidationStepHandler";
import { spawnSync } from "child_process"

export class GradleBuildValidationStepHandler extends ValidationStepHandler {
    async validate(context: DataClumpRefactoringContext): Promise<{ success: boolean; messages: {stderr:string,stdout:string} | null; }> {
       let runResult= spawnSync("gradle",["build"],{cwd:context.getProjectPath()})
       runResult.error
       const status=runResult.status
       if(status==null){
              return {success:false,messages:{stderr:"Gradle not found",stdout:"Gradle not found"}}
         }
       console.log("Status code",status,status==null)
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
     getPathsOfFilesWithErrors(errors:string[]):string[]{
        let result:string[]=[]
        for(let error of errors){
          let splitted=error.split(/:\d+:/);
          if(splitted.length>1){
            console.log("line",error)
            result.push(splitted[0])
          }
         
        }
        return result
      
      
      }
    protected isCompatibleWithSystem(): boolean {
       let runResult= spawnSync("gradle",["--version"])
       if(runResult.error){
           return false
       }
       return true
        
    }
}