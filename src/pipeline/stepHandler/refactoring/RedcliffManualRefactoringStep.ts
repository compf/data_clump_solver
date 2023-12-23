import { DataClumpRefactoringContext, NameFindingContext, RefactoredContext, UsageFindingContext } from "../../../context/DataContext";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import fs from "fs"
import { spawn } from "child_process"

import {parse,BaseJavaCstVisitorWithDefaults, MethodHeaderCtx} from "java-parser"
class MyVisitor extends BaseJavaCstVisitorWithDefaults{
 methodHeader(ctx: MethodHeaderCtx, param?: any) {
     console.log(ctx.methodDeclarator)
 }
}
export class RedcliffManualRefactoringStep extends AbstractStepHandler{
    handle(context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
       let args=[
        "demo-cli:runDemoPluginCLI",
        "-Prunner=DemoPluginCLI",
        "-PusageContextPath=/home/compf/data/uni/master/sem4/data_clump_solver/stuff/usages.json",
         "-Poutput=/home/compf/data/uni/master/sem4/data_clump_solver/stuff/refac",
          "-PmyProjectPath=/home/compf/data/uni/master/sem4/data_clump_solver/javaTest/"
       ]
        let cp=spawn("gradle",args,{cwd:"REDCLIFF-Java"})
        cp.stdout.on("data",(data)=>{
            console.log(data.toString())
        })
        return Promise.resolve(context);
    }
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.Refactoring]
    }
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
        createdContexts.add(RefactoredContext.name)
    }
    addAditionalContextRequirementNames(pipeLineStep: PipeLineStepType, requirements: Set<string>): void {
        requirements.add(UsageFindingContext.name)
    }

}


