import { DataClumpRefactoringContext, NameFindingContext, RefactoredContext, UsageFindingContext } from "../../../context/DataContext";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import fs from "fs"
import { resolve } from "path";
import { spawnSync } from "child_process"


export class RedcliffManualRefactoringStep extends AbstractStepHandler{
    handle(step:PipeLineStepType,context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
        const usageContextPath=context.getByType<UsageFindingContext>(UsageFindingContext)?.getSerializationPath();
        const projectPath=context.getProjectPath()
        /*
        demo-cli:runDemoPluginCLI -Prunner=DemoPluginCLI -PmyProjectPath='/home/compf/data/uni/master/sem4/data_clump_solver/javaTest/moreComprehensiveJavaTest'
         -PdataPath='/home/compf/data/uni/master/sem4/data_clump_solver/data' --stacktrace
        */
        const dataPath=resolve("./data")

      
        let availableContextsIds=context.getContextIds()
        let availableContext=0;
        for(let id of availableContextsIds){
            let mask=1<<id
            availableContext|=mask
        }
        let args=[
            "demo-cli:runDemoPluginCLI",
            "-Prunner=DemoPluginCLI",
            "-PmyProjectPath="+projectPath,
            "-PdataPath="+dataPath,
            "-PavailableContexts="+availableContext,
            
           ];
        console.log("spawn")
        let cp=spawnSync("gradle",args,{cwd:"REDCLIFF-Java"})
        console.log("finished")
        return Promise.resolve(context);
    }
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.Refactoring]
    }
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
        createdContexts.add(RefactoredContext.name)
    }
   

}


