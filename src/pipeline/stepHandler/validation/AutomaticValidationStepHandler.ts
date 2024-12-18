import { DataClumpRefactoringContext, ValidationResult } from "../../../context/DataContext";
import { ValidationArgs, ValidationInfo, ValidationStepHandler } from "./ValidationStepHandler";
import {spawnSync} from 'child_process';
import fs from "fs";
import {resolve} from "path"
import { GradleBuildValidationStepHandler } from "./GradleBuildValidationStepHandler";
import { MavenBuildValidationStepHandler } from "./MavenBuildValidationStepHandler";
import { AntBuildValidationStepHandler } from "./AntBuildValidationStepHandler";

/**
 * runs the correct validation step handler based on the build tool used in the project
 */
export class AutomaticValidationStepHandler extends ValidationStepHandler {
    validate(context: DataClumpRefactoringContext): Promise<ValidationResult>  {
        let handler:ValidationStepHandler|null=null;
       if(fs.existsSync(resolve(context.getProjectPath(),"build.gradle")) || fs.existsSync ( resolve(context.getProjectPath(),"build.gradle.kts"))){
        let local=false;
        if(fs.existsSync(resolve(context.getProjectPath(),"gradlew"))){
            this.args.useLocal=true;
        }
           handler=new GradleBuildValidationStepHandler(this.args)
       }
       else if(fs.existsSync(resolve(context.getProjectPath(),"pom.xml"))){
        let local=false;
        if(fs.existsSync(resolve(context.getProjectPath(),"mvnw"))){
            this.args.useLocal=true;
            local=true;
        }
        handler=new MavenBuildValidationStepHandler(this.args);
       }
       else if(fs.existsSync(resolve(context.getProjectPath(),"build.xml"))){
              handler=new AntBuildValidationStepHandler(this.args)
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
