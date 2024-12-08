import { DataClumpDetectorContext, DataClumpRefactoringContext, getContextSerializationBasePath, getContextSerializationPath, NameFindingContext, RefactoredContext, UsageFindingContext } from "../../../context/DataContext";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import fs from "fs"
const commandExistsSync = require('command-exists').sync;
import { resolve } from "path";
import { spawnSync } from "child_process"

/**
 * Handles the manual refactoring step
 */
export class RedcliffManualRefactoringStepHandler extends AbstractStepHandler{
    handle(step:PipeLineStepType,context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
        const projectPath=context.getProjectPath()
        /*
        demo-cli:runDemoPluginCLI -Prunner=DemoPluginCLI -PmyProjectPath='/home/compf/data/uni/master/sem4/data_clump_solver/javaTest/moreComprehensiveJavaTest'
         -PdataPath='/home/compf/data/uni/master/sem4/data_clump_solver/data' --stacktrace
        */
        const dataPath=getContextSerializationBasePath(context)
        /*
        (   val dataClumpContextPath:String?,
            val referenceFindingContextePath:String?,
            val classNamesContextPath:String?,
            val extractedClassContextsPath:String?,
            val refactorMode:String?) {

        */
        let contextData={
            refactorMode:"Manual"
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
        currContext=context.getByType(NameFindingContext)
        if(currContext!=null){
            contextData["classNamesContextPath"]=getContextSerializationPath(currContext,currContext)
        }
        currContext=context.getByType(UsageFindingContext)
        if(currContext!=null){
            contextData["referenceFindingContextePath"]=getContextSerializationPath(currContext,currContext)
        }
        fs.writeFileSync(dataPath+"/contextPaths.json",JSON.stringify(contextData))
        
        let args=[
            "demo-cli:runDemoPluginCLI",
            "-Prunner=DemoPluginCLI",
            "-PmyProjectPath="+projectPath,
            "-PdataPath="+dataPath+"/contextPaths.json",
           
            
           ];
        fs.rmSync("REDCLIFF-Java/demo-cli/build/idea-sandbox/system",{recursive:true,force:true})
        console.log("spawn")
        let cp=spawnSync("gradle",args,{cwd:"REDCLIFF-Java",stdio:"inherit"})
        console.log("finished")
        return Promise.resolve(context);
    }
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.Refactoring]
    }
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
        createdContexts.add(RefactoredContext.name)
    }

    checkCompatibleWithSystem(): void {
        if(!commandExistsSync("gradle")){
            throw new Error("Gradle not found. Please install gradle")
        }
        if(!fs.existsSync("REDCLIFF-Java")){
            throw new Error("Redcliff not found. Please clone the Redcliff repository")
        }
    }
   

}


