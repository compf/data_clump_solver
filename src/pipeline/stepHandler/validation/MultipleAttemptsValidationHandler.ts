import simpleGit from "simple-git";
import { resolveFromConcreteName, resolveFromInterfaceName } from "../../../config/Configuration";
import { DataClumpRefactoringContext, LargeLanguageModelContext, ValidationContext } from "../../../context/DataContext";
import { AbstractLanguageModel } from "../../../util/languageModel/AbstractLanguageModel";
import { LanguageModelTemplateResolver } from "../../../util/languageModel/LanguageModelTemplateResolver";
import { setCurrLabel, writeFileSync } from "../../../util/Utils";
import { PipeLine } from "../../PipeLine";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { CodeSnippetHandler, LargeLanguageModelHandler, resolveHandlers } from "../languageModelSpecific/ContextToModelHandlers";
import {  ValidationStepHandler } from "./ValidationStepHandler";
import fs from 'fs'
import { resolve } from "path"
import { parseChat, StubOutputHandler } from "../languageModelSpecific/ModelToContextHandlers";

export type MultipleAttemptsValidationArgs = {
    innerValidator?: ValidationStepHandler,
    handlers: (string|LargeLanguageModelHandler)[]
}
export enum CompilingResult{Success,NotCompile, CompileButTestFail}
/**
 * Attempts multiple times via an LLM fix building issues
 * Stops after 5 attempts or when the validation is successful
 */
export class MultipleAttemptsValidationHandler extends AbstractStepHandler {
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.Validation];
    }
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
        createdContexts.add(ValidationContext.name);
    }
    private validator: ValidationStepHandler;
    public handlers: LargeLanguageModelHandler[]
    public doTestRun=false;
    /**
     * executed after each validation step to allow for additional steps
     */
    public afterValidationStep?:{(nr:number):Promise<void>}
    async getValidationCount(context: DataClumpRefactoringContext): Promise<{
        attempts: number,
        compilingResults:CompilingResult[]
    }|null> {
        let api = resolveFromInterfaceName(AbstractLanguageModel.name) as AbstractLanguageModel
        let chat = context.getByType(LargeLanguageModelContext)!.getChat();
        api.clear()
        for (let c of chat) {
            api.prepareMessage(c.messages[0], c.messageType)
        }
        let result: ValidationContext = null as any;
        const maxAttempts = 5;
        let attempts = 0;
        let compilingResults:CompilingResult[]=[];
        let templateResolver=resolveFromInterfaceName(LanguageModelTemplateResolver.name) as LanguageModelTemplateResolver;

        do {
            setCurrLabel("validation-"+attempts)
            if(this.doTestRun){
                this.validator.enableTests()
            }
            result = await this.validator.handle(PipeLineStep.Validation, context, {}) as ValidationContext;
            
            if(this.doTestRun && !result.success){
                this.validator.disableTests()
                result = await this.validator.handle(PipeLineStep.Validation, context, {}) as ValidationContext;
                if(result.success){
                    compilingResults.push(CompilingResult.CompileButTestFail)
                }
                else{
                    compilingResults.push(CompilingResult.NotCompile)
                }
            }
            else if(result.success){
                compilingResults.push(CompilingResult.Success)
            }
            else if(!this.doTestRun){
                compilingResults.push(CompilingResult.NotCompile)
            }
            context = context.buildNewContext(result);
            if (result.success) {
                return Promise.resolve({
                    attempts: attempts,
                    compilingResults: compilingResults
                });
            }
            attempts++;
            let errors: any[] = []
            
            for(let handler of this.handlers){
                chat.push(... await handler.handle(context,api,templateResolver))
            }
            let reply = chat[chat.length - 1];
            parseChat(chat, PipeLineStep.Refactoring, context, new StubOutputHandler())
            if(this.afterValidationStep){
                await this.afterValidationStep(attempts)
            }
            let git=simpleGit(context.getProjectPath())
            writeFileSync("errors.txt", result.raw!)


        } while (attempts < maxAttempts && !result.success)
        if (result.success) {
            return Promise.resolve({
                attempts: attempts,
                compilingResults: compilingResults
            });
        }
        return Promise.resolve({attempts:null as any,compilingResults:compilingResults});
    }
    async handle(step: PipeLineStepType, context: DataClumpRefactoringContext): Promise<DataClumpRefactoringContext> {

        await this.getValidationCount(context);
        return context;


    }
    constructor(args: MultipleAttemptsValidationArgs) {
        super();
        if(args.innerValidator){
            this.validator=args.innerValidator;
        }
        else{
            this.validator=resolveFromInterfaceName(ValidationStepHandler.name) as ValidationStepHandler;
        }
        this.handlers=resolveHandlers(args.handlers);
    }
  
}