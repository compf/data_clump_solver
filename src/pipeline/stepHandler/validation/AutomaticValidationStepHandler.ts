import { DataClumpRefactoringContext, ValidationResult } from "../../../context/DataContext";
import { ValidationArgs, ValidationInfo, ValidationStepHandler } from "./ValidationStepHandler";
import {spawnSync} from 'child_process';
import fs from "fs";
import {resolve} from "path"
import { GradleBuildValidationStepHandler } from "./GradleBuildValidationStepHandler";
import { MavenBuildValidationStepHandler } from "./MavenBuildValidationStepHandler";
export class AutomaticValidationStepHandler extends ValidationStepHandler {
    validate(context: DataClumpRefactoringContext): Promise<ValidationResult>  {
        let handler:ValidationStepHandler|null=null;
       if(fs.existsSync(resolve(context.getProjectPath(),"build.gradle")) || fs.existsSync ( resolve(context.getProjectPath(),"build.gradle.kts"))){
           handler=new GradleBuildValidationStepHandler(this.args)
       }
       else if(fs.existsSync(resolve(context.getProjectPath(),"pom.xml"))){
        handler=new MavenBuildValidationStepHandler(this.args);
       }

       if(handler){
        return handler.validate(context)
       }
       throw "Could not find fitting validator"
    }
   

    constructor(args:ValidationArgs){
        super(args);
    }
 
}
