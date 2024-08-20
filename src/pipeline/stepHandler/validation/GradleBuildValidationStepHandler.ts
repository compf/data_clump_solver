import { DataClumpRefactoringContext } from  "../../../context/DataContext";
import { ValidationInfo, ValidationStepHandler } from "./ValidationStepHandler";
import { spawnSync } from "child_process"
import fs from "fs";
import { relative } from "path";
export class GradleBuildValidationStepHandler extends ValidationStepHandler {
  validate(context: DataClumpRefactoringContext): Promise<{ success: boolean; validationInfos:ValidationInfo[] }>  {
    let args=["build"]
    if(this.args.skipTests){
        args.push("-x")
        args.push("test")
    }
    
       let runResult= spawnSync("gradle",args,{cwd:context.getProjectPath()})
       runResult.error
       const status=runResult.status

       console.log("Status code",status,status==null)
       if(status===0){
           return Promise.resolve({success:true,validationInfos:[]})
       }
       else {
              return Promise.resolve( {success:false, validationInfos: this.parseGradle(runResult.stderr.toString(),context)})
               
            }
       }
    
  private parseGradle(output:string, context: DataClumpRefactoringContext){
      let foundError=false;
      let path=""
      let lineNr=0
      let colNr:number|undefined=undefined;
      let errorMesssages:string[]=[]
      let errors:ValidationInfo[]=[]
      let splitted=output.split("\n");
      for(let line of splitted){
          if(line.includes(": error:")){
              let lineSplitted=line.split(":")
              if(fs.existsSync(lineSplitted[0])){
                  if(foundError){
                      errors.push(
                          {
                              lineNumber:lineNr,
                              filePath:relative(context.getProjectPath(),path),
                              colNumber:colNr,
                              errorMessage:errorMesssages.join("\n"),
                              type:"error"
                          }
                      );
                      foundError=false;
                  }
                  
                  foundError=true;
                  path=lineSplitted[0];
                  lineNr=parseInt(lineSplitted[1])
                  console.log(path,lineNr)
                 
              }
             
          }
          else if (foundError){
              errorMesssages.push(line)
  
          }
      }
      errors.push(
          {
              lineNumber:lineNr,
              filePath:path,
              colNumber:colNr,
              errorMessage:errorMesssages.join("\n"),
              type:"error"
          }
      );
      return errors;
  }
    
    protected isCompatibleWithSystem(): boolean {
       let runResult= spawnSync("gradle",["--version"])
       if(runResult.error){
           return false
       }
       return true
        
    }
}