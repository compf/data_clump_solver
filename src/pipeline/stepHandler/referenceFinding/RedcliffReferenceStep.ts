import { DataClumpDetectorContext, DataClumpRefactoringContext, getContextSerializationPath, NameFindingContext, RefactoredContext, UsageFindingContext } from "../../../context/DataContext";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import fs from "fs"
import { resolve } from "path";
import { spawnSync } from "child_process"


export class RedcliffReferenceStep extends AbstractStepHandler{
    handle(step:PipeLineStepType,context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
        const projectPath=context.getProjectPath()
        /*
        demo-cli:runDemoPluginCLI -Prunner=DemoPluginCLI -PmyProjectPath='/home/compf/data/uni/master/sem4/data_clump_solver/javaTest/moreComprehensiveJavaTest'
         -PdataPath='/home/compf/data/uni/master/sem4/data_clump_solver/data' --stacktrace
        */
        const dataPath=resolve("./data")
        /*
        (   val dataClumpContextPath:String?,
            val referenceFindingContextePath:String?,
            val classNamesContextPath:String?,
            val extractedClassContextsPath:String?,
            val refactorMode:String?) {

        */
        let contextData={
            refactorMode:"FindUsages"
        }
        let currContext:DataClumpRefactoringContext|null=context.getByType(DataClumpDetectorContext)
        if(currContext!=null){
            const basePath = getContextSerializationPath(currContext,currContext)
            let i=1;
            let lastPath=""
            let pathExist=fs.existsSync(basePath)
            while(pathExist){
                let path=basePath.replace(".json","_"+i+".json")
                if (fs.existsSync(path)){
                    lastPath=path
                    i++;
                }
                else{
                    pathExist=false
                }
            }
            contextData["dataClumpContextPath"]=lastPath
        }

        let usageContext=context.buildNewContext(new UsageFindingContext({}))
        contextData["referenceFindingContextePath"]=getContextSerializationPath(usageContext,usageContext)
        
        fs.writeFileSync(dataPath+"/contextPaths.json",JSON.stringify(contextData))
        
        let args=[
            "demo-cli:runDemoPluginCLI",
            "-Prunner=DemoPluginCLI",
            "-PmyProjectPath="+projectPath,
            "-PdataPath="+dataPath+"/contextPaths.json",
           
            
           ];
        console.log("spawn")
        let cp=spawnSync("gradle",args,{cwd:"REDCLIFF-Java",stdio:"inherit"})
        console.log("finished")
        return Promise.resolve(context);
    }
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.ReferenceFinding]
    }
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
        createdContexts.add(UsageFindingContext.name)
    }
   

}


