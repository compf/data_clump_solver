import { resolveFromName } from "../../../config/Configuration";
import { CodeObtainingContext, DataClumpRefactoringContext, ValidationContext } from "../../../context/DataContext";
import { GitHubService } from "../../../util/vcs/GitHubService";
import { getRepoDataFromUrl } from "../../../util/vcs/VCS_Service";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { ValidationStepHandler } from "../validation/ValidationStepHandler";
import shlex from "shlex";
import { resolve } from "path";
import {spawnSync} from "child_process"
export class CloneObtainingStepHandler extends AbstractStepHandler {
    constructor(args:any) {
        super();
        this.args=args;
    }
    private args:any;
    private initialize(commands:string[]){
        for(let cmd of commands){
            let splitted=shlex.split(cmd);
            spawnSync(splitted[0],splitted.slice(1),{stdio:"inherit"})
        }
    }
    async handle(step: PipeLineStepType, context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
        let vcsService=new GitHubService();
        let url=context.sharedData.url;
        let initializeCommands=context.sharedData.initializeCommands;
        if(initializeCommands!=undefined){
            this.initialize(initializeCommands)
        }
        if(this.args.doFork){
            try{
                await vcsService.forkAndClone(undefined,url);

            }
            catch(e){
                console.log("Forking failed, cloning directly")
            }
        }
        else{
            vcsService.clone(url);
        }
        
        let outPath="cloned_projects/"+getRepoDataFromUrl(url).repo.replace(".git","");
        outPath=resolve(outPath)
        context=context.buildNewContext(new CodeObtainingContext(outPath))
        //context=context.buildNewContext(await this.validate(context));
        return context
    }
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.CodeObtaining];
    }
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
        createdContexts.add(CodeObtainingContext.name)
    }
    async validate(context:DataClumpRefactoringContext): Promise<ValidationContext> {
        let validator=resolveFromName(PipeLineStep.Validation.name) as ValidationStepHandler;
        return await  validator.handle(PipeLineStep.Validation,context,null) as ValidationContext;
    }
}