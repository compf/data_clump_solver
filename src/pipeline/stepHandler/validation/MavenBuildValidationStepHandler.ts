import { DataClumpRefactoringContext } from "../../../context/DataContext";
import { ValidationStepHandler } from "./ValidationStepHandler";
import {spawnSync} from 'child_process';
export class MavenBuildValidationStepHandler extends ValidationStepHandler {
    validate(context: DataClumpRefactoringContext): Promise<{ success: boolean; messages: {stderr:string,stdout:string} | null; }>  {
       let result= spawnSync("mvn",["compile"],{cwd:context.getProjectPath()});
         if(result.status==0){
              return Promise.resolve({success:true,messages:null});
         }
         else {
             return Promise.resolve({success:false,messages:
                {stderr:result.stderr.toString(),stdout:result.stdout.toString()}});
         }
    }
 
}