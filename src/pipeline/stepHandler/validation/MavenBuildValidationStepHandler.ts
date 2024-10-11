import { DataClumpRefactoringContext, ValidationResult } from "../../../context/DataContext";
import { ValidationArgs, ValidationInfo, ValidationStepHandler } from "./ValidationStepHandler";
import {spawnSync} from 'child_process';
import fs from "fs";
export class MavenBuildValidationStepHandler extends ValidationStepHandler {
    validate(context: DataClumpRefactoringContext): Promise<ValidationResult>  {
        let args=["clean","package"]
        if(this.args.skipTests){
            args.push("-DskipTests")
        }
        let cmd=this.args.useLocal?"./mvnw":"mvn"
       let result= spawnSync(cmd,args,{cwd:context.getProjectPath()});
         if(result.status==0){
              return Promise.resolve({success:true,errors:[]});
         }
         else {
            let r=parseMaven(result.stdout.toString())
             return Promise.resolve({success:false,errors:r.errors,raw:r.raw});
         }
    }
   

    constructor(args:ValidationArgs){
        super(args);
    }
 
}

export function  parseMaven(output:string):{errors:ValidationInfo[], raw:string}{
    let foundError=false;
    let splitted=output.split("\n");
    let path=""
    let lineNr=0
    let colNr:number|undefined=undefined;
    let errorMesssages:string[]=[]
    let errors:ValidationInfo[]=[]
    let initial=true;
    let relevantLines:string[]=[]
    console.log("start",splitted.length)
    for(let i=splitted.length-1;i>=0;i--){
        if(splitted[i].trim()!="" && !splitted[i].trim().startsWith("[ERROR]")){
            break;
        }
        relevantLines.splice(0,0,splitted[i])
    }
    for(let line of relevantLines){
        if(line.startsWith("[ERROR]")){
           
            let lineSplitted=line.split(/ |:/)
            if(fs.existsSync(lineSplitted[1])){
                if(foundError){
                    errors.push(
                        {
                            lineNumber:lineNr,
                            filePath:path,
                            columnNumber:colNr,
                            errorMessage:errorMesssages.join("\n"),
                            type:lineSplitted[0]
                        }
                        
                    );
                    errorMesssages=[]
                    foundError=false;
                    initial=false;
                  
                }
                
                foundError=true;
                path=lineSplitted[1];
                let lineNrData=(lineSplitted[2].replace("[","").replace("]","")).split(",")
                lineNr=parseInt(lineNrData[0])
                colNr=parseInt(lineNrData[1])
                let lineError=line.split("error:")
                if(lineError.length>1){
                    errorMesssages.push("error: "+lineError[1]);
                }
                console.log(path,lineNr)
               
            }
            else if (foundError || initial){
                line=line.replace("[ERROR]","");
                errorMesssages.push(line)

            }
        }
    }


    errors.push(
        {
            lineNumber:lineNr,
            filePath:path,
            columnNumber:colNr,
            errorMessage:errorMesssages.join("\n"),
            type:"[ERROR]"
        }
    );
    return {errors:errors,raw:relevantLines.join("\n")}
}