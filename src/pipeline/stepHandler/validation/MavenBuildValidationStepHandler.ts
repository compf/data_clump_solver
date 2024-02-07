import { DataClumpRefactoringContext } from "../../../context/DataContext";
import { ValidationStepHandler } from "./ValidationStepHandler";
import {spawnSync} from 'child_process';
export class MavenBuildValidationStepHandler extends ValidationStepHandler {
    validate(context: DataClumpRefactoringContext): Promise<{ success: boolean; message: string | null; }> {
       let result= spawnSync("mvn",["compile"],{cwd:context.getProjectPath()});
         if(result.status==0){
              return Promise.resolve({success:true,message:null});
         }
         else {
             return Promise.resolve({success:false,message:result.stderr.toString()});
         }
    }
 
}