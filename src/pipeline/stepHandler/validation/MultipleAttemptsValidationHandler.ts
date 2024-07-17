import { resolveFromInterfaceName } from "../../../config/Configuration";
import { DataClumpRefactoringContext, ValidationContext } from "../../../context/DataContext";
import { AbstractLanguageModel } from "../../../util/languageModel/AbstractLanguageModel";
import { LanguageModelTemplateResolver } from "../../../util/languageModel/LanguageModelTemplateResolver";
import { PipeLine } from "../../PipeLine";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { LanguageModelDetectOrRefactorHandler } from "../languageModelSpecific/LanguageModelDetectOrRefactorHandler";
import { CodeSnippetHandler } from "../languageModelSpecific/LargeLanguageModelHandlers";
import { GradleBuildValidationStepHandler } from "./GradleBuildValidationStepHandler";
import { MavenBuildValidationStepHandler } from "./MavenBuildValidationStepHandler";
import { ValidationInfo, ValidationStepHandler } from "./ValidationStepHandler";
import fs from 'fs'
import {resolve} from "path"
export class MultipleAttemptsValidationHandler extends AbstractStepHandler{
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.Validation];
    }
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
        createdContexts.add(ValidationContext.name);
    }
    
    async handle(step: PipeLineStepType, context: ValidationContext, pipeLine: PipeLine): Promise<ValidationContext> {
       let validator=this.getBuildSystem(context);
       let api=resolveFromInterfaceName(AbstractLanguageModel.name) as AbstractLanguageModel
       let result:ValidationContext=null as any;
       const maxAttempts=10;
       let attempts=0;

       do{
        result=await validator.handle(PipeLineStep.Validation,context,{}) as ValidationContext;
        if(result.success){
            return result;
        }
        attempts++;
        let errors:any[]=[]
       for(let v of result.validationResult){
        errors.push({path:v.filePath,line:v.lineNumber,errorMessage:v.errorMessage})
       }
       api.prepareMessage("Correct the following errors. Use the same JSON format as in the initial refactoring", "input")
       api.prepareMessage(JSON.stringify(errors), "input")
       let reply=await api.sendMessages(false);
       fs.writeFileSync("stuff/error_proposal"+new Date().getTime()+"_"+errors.length+".json", JSON.stringify(JSON.parse(reply.messages[0])))
       let handler=new LanguageModelDetectOrRefactorHandler({handlers:[],numberAttempts:1});
       await handler.createFittingContext(reply,PipeLineStep.Refactoring,context,[]);
       console.log("Refactoring", result)

       }while( attempts< maxAttempts && !result.success)
        return context;

       
    }
     getBuildSystem(context:DataClumpRefactoringContext): AbstractStepHandler {
        const mavenPath=resolve(context.getProjectPath(),"pom.xml");
        const gradlePath=resolve(context.getProjectPath(),"build.gradle");
        const gradleKtsPath=resolve(context.getProjectPath(),"build.gradle.kts");
        if (fs.existsSync(mavenPath)) {
            return  new MavenBuildValidationStepHandler({});
        }
        if (fs.existsSync(gradlePath)) {
            return  new GradleBuildValidationStepHandler({});
        }
        if (fs.existsSync(gradleKtsPath)) {
            return  new GradleBuildValidationStepHandler({});
        }
        throw new Error("Unknown build system")
    }
}