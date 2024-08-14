import { resolveFromConcreteName, resolveFromInterfaceName } from "../../../config/Configuration";
import { DataClumpRefactoringContext, LargeLanguageModelContext, ValidationContext } from "../../../context/DataContext";
import { AbstractLanguageModel } from "../../../util/languageModel/AbstractLanguageModel";
import { LanguageModelTemplateResolver } from "../../../util/languageModel/LanguageModelTemplateResolver";
import { setRelevantTime, writeFileSync } from "../../../util/Utils";
import { PipeLine } from "../../PipeLine";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { LanguageModelDetectOrRefactorHandler } from "../languageModelSpecific/LanguageModelDetectOrRefactorHandler";
import { CodeSnippetHandler, LargeLanguageModelHandler, resolveHandlers } from "../languageModelSpecific/LargeLanguageModelHandlers";
import { parse_piecewise_output, parseChat, StubOutputHandler } from "../languageModelSpecific/OutputHandler";
import { GradleBuildValidationStepHandler } from "./GradleBuildValidationStepHandler";
import { MavenBuildValidationStepHandler } from "./MavenBuildValidationStepHandler";
import { ValidationInfo, ValidationStepHandler } from "./ValidationStepHandler";
import fs from 'fs'
import { resolve } from "path"

export type MultipleAttemptsValidationArgs = {
    innerValidator?: ValidationStepHandler,
    handlers: (string|LargeLanguageModelHandler)[]
}

export class MultipleAttemptsValidationHandler extends AbstractStepHandler {
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.Validation];
    }
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
        createdContexts.add(ValidationContext.name);
    }
    private validator: ValidationStepHandler;
    private handlers: LargeLanguageModelHandler[]
    async getValidationCount(context: DataClumpRefactoringContext): Promise<number | null> {
        let api = resolveFromInterfaceName(AbstractLanguageModel.name) as AbstractLanguageModel
        console.log(api)
        let chat = context.getByType(LargeLanguageModelContext)!.getChat();
        console.log(chat)
        for (let c of chat) {
            api.prepareMessage(c.messages[0], c.messageType)
        }
        let result: ValidationContext = null as any;
        const maxAttempts = 10;
        let attempts = 0;
        let templateResolver=resolveFromInterfaceName(LanguageModelTemplateResolver.name) as LanguageModelTemplateResolver;

        do {
            setRelevantTime()
            result = await this.validator.handle(PipeLineStep.Validation, context, {}) as ValidationContext;
            context = context.buildNewContext(result);
            if (result.success) {
                return Promise.resolve(attempts);
            }
            attempts++;
            let errors: any[] = []
            
            for(let handler of this.handlers){
                chat.push(... await handler.handle(context,api,templateResolver))
            }
            let reply = chat[chat.length - 1];
            parseChat(chat, PipeLineStep.Refactoring, context, new StubOutputHandler())
            writeFileSync("error_proposal_" + errors.length + ".json", JSON.stringify(JSON.parse(reply.messages[0])))

            console.log("Refactoring", result)

        } while (attempts < maxAttempts && !result.success)
        if (result.success) {
            return Promise.resolve(attempts);
        }
        return Promise.resolve(null);
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