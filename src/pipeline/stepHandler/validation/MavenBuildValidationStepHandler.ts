import { DataClumpRefactoringContext } from "../../../context/DataContext";
import { ValidationArgs, ValidationInfo, ValidationStepHandler } from "./ValidationStepHandler";
import {spawnSync} from 'child_process';
import fs from "fs";
export class MavenBuildValidationStepHandler extends ValidationStepHandler {
    validate(context: DataClumpRefactoringContext): Promise<{ success: boolean; validationInfos:ValidationInfo[] }>  {
        let args=["clean","package"]
        if(this.args.skipTests){
            args.push("-DskipTests")
        }
       let result= spawnSync("mvn",args,{cwd:context.getProjectPath()});
         if(result.status==0){
              return Promise.resolve({success:true,validationInfos:[]});
         }
         else {
             return Promise.resolve({success:false,validationInfos:this.parseMaven(result.stdout.toString())});
         }
    }
    private parseMaven(output:string){
        let foundError=false;
        let splitted=output.split("\n");
        let path=""
        let lineNr=0
        let colNr:number|undefined=undefined;
        let errorMesssages:string[]=[]
        let errors:ValidationInfo[]=[]
        let initial=true;
        for(let line of splitted){
            if(line.startsWith("[ERROR]")){
               
                let lineSplitted=line.split(/ |:/)
                if(fs.existsSync(lineSplitted[1])){
                    if(foundError){
                        errors.push(
                            {
                                lineNumber:lineNr,
                                filePath:path,
                                colNumber:colNr,
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
                    lineNr=parseInt(lineSplitted[2].replace("[","").replace("]",""))
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
                colNumber:colNr,
                errorMessage:errorMesssages.join("\n"),
                type:"[ERROR]"
            }
        );
        return errors;
    }

    constructor(args:ValidationArgs){
        super(args);
    }
 
}