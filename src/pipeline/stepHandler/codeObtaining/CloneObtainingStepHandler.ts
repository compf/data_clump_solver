import { CodeObtainingContext, DataClumpRefactoringContext, ValidationContext } from "../../../context/DataContext";
import { GitHubService } from "../../../util/vcs/GitHubService";
import { getRepoDataFromUrl } from "../../../util/vcs/VCS_Service";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { ValidationStepHandler } from "../validation/ValidationStepHandler";
import shlex from "shlex";
import fs from "fs";
import { resolve } from "path";
import {spawnSync} from "child_process"
import { resolveFromConcreteName } from "../../../config/Configuration";
export class CloneObtainingStepHandler extends AbstractStepHandler {
    constructor(args:{
        url:string,
        alwaysClone?:boolean
    }) {
        super();
        this.url=args.url;
    }
    private url:string;
    private alwaysClone:boolean=false;
    private initialize(commands:string[]){
        for(let cmd of commands){
            let splitted=shlex.split(cmd);
            spawnSync(splitted[0],splitted.slice(1),{stdio:"inherit"})
        }
    }
    async handle(step: PipeLineStepType, context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
        let vcsService=new GitHubService();
        let outPath="cloned_projects/"+getRepoDataFromUrl(this.url).repo.replace(".git","");
        outPath=resolve(outPath)
        if(this.alwaysClone && fs.existsSync(outPath)){
            fs.rmdirSync(outPath,{recursive:true});
        }
        else if(!this.alwaysClone && fs.existsSync(outPath)){
            return context.buildNewContext(new CodeObtainingContext(outPath))
        }
        vcsService.clone(this.url);
        

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
        let validator=resolveFromConcreteName(PipeLineStep.Validation.name) as ValidationStepHandler;
        return await  validator.handle(PipeLineStep.Validation,context,null) as ValidationContext;
    }
}