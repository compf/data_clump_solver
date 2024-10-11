import { DataClumpRefactoringContext, ValidationResult } from  "../../../context/DataContext";
import { ValidationInfo, ValidationStepHandler } from "./ValidationStepHandler";
import { spawnSync } from "child_process"
import fs from "fs";
import { relative } from "path";
export class GradleBuildValidationStepHandler extends ValidationStepHandler {
  validate(context: DataClumpRefactoringContext): Promise<ValidationResult>  {
    let args=["clean","build"]
    if(this.args.skipTests){
        args.push("-x")
        args.push("test")
    }
    let cmd=this.args.useLocal?"./gradlew":"gradle"
    
       let runResult= spawnSync(cmd,args,{cwd:context.getProjectPath()})
       runResult.error
       const status=runResult.status

       console.log("Status code",status,status==null)
       if(status===0){
           return Promise.resolve({success:true,errors:[]})
       }
       else {
              return Promise.resolve( {success:false, errors: parseGradle(runResult.stderr.toString()),raw:runResult.stderr.toString()})
               
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
export function parseGradle(output:string){
    let foundError=false;
    let path=""
    let lineNr=0
    let colNr:number|undefined=undefined;
    let errorMesssages:string[]=[]
    let errors:ValidationInfo[]=[]
    let splitted=output.split("\n");
    for(let line of splitted){
        if(line.includes(": error:")){
            let lineSpaceSplitted=line.split(": ")
            let pathWithLine=lineSpaceSplitted[0]
            let pathTemp=pathWithLine.substring(0,pathWithLine.lastIndexOf(":"))
            if(fs.existsSync(pathTemp)){
                if(foundError){
                    errors.push(
                        {
                            lineNumber:lineNr,
                            filePath:path,
                            columnNumber:colNr,
                            errorMessage:errorMesssages.join("\n"),
                            type:"error"
                        }
                    );
                    foundError=false;
                    errorMesssages=[]
                }
                
                foundError=true;
                path=pathTemp;
                errorMesssages.push(lineSpaceSplitted[1]+" " +lineSpaceSplitted[2])

                lineNr=parseInt(pathWithLine.substring(pathWithLine.lastIndexOf(":")+1))
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
            columnNumber:colNr,
            errorMessage:errorMesssages.join("\n"),
            type:"error"
        }
    );
    return errors;
}