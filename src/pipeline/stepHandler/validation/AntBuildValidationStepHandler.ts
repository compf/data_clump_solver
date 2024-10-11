import { DataClumpRefactoringContext, ValidationResult } from  "../../../context/DataContext";
import { ValidationInfo, ValidationStepHandler } from "./ValidationStepHandler";
import { spawnSync } from "child_process"
import fs from "fs";
import { relative } from "path";
export class AntBuildValidationStepHandler extends ValidationStepHandler {
  validate(context: DataClumpRefactoringContext): Promise<ValidationResult>  {
    let args=["clean","dist"]
   
    
       let runResult= spawnSync("ant",args,{cwd:context.getProjectPath()})
       runResult.error
       const status=runResult.status

       console.log("Status code",status,status==null)
       if(status===0){
           return Promise.resolve({success:true,errors:[]})
       }
       else {
              return Promise.resolve( {success:false, errors: [],raw:runResult.stderr.toString()})
               
            }
       }
    
  
    

    }

