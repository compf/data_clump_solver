import { DataClumpsTypeContext } from "data-clumps-type-context";
import { CodeObtainingContext, DataClumpDetectorContext, DataClumpRefactoringContext, FileFilteringContext, NameFindingContext, RefactoredContext, UsageFindingContext, createDataClumpsTypeContext } from "../../../context/DataContext";
import { ChatGPTInterface } from "../../../util/languageModel/ChatGPTInterface";
import { LanguageModelTemplateResolver, LanguageModelTemplateType } from "../../../util/languageModel/LanguageModelTemplateResolver";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import fs from "fs"
const Levenshtein = require("levenshtein")
import { files } from "node-dir"
import path from "path";
import { resolve } from "path"
import {  registerFromName, resolveFromConcreteName, resolveFromInterfaceName } from "../../../config/Configuration";
import { LargeLanguageModelHandler, ReExecutePreviousHandlers } from "./LargeLanguageModelHandlers";
import { ChatMessage, AbstractLanguageModel, AbstractLanguageModelCategory } from "../../../util/languageModel/AbstractLanguageModel";
import { PipeLine } from "../../PipeLine";
import { getRelevantFilesRec, indexOfSubArray, randInt, tryParseJSON } from "../../../util/Utils";
import {  OutputChecker } from "../../../util/languageModel/OutputChecker";
import { InteractiveProposalHandler, MetricBasedProposalHandler, ModifiedFilesProposal, MultipleBrancheHandler, OutputHandler, parse_piecewise_output, parseChat, parseMarkdown, StubOutputHandler } from "./OutputHandler";

function isReExecutePreviousHandlers(object: any): object is ReExecutePreviousHandlers {
    // replace 'property' with a unique property of ReExecutePreviousHandlers
    return 'shallReExecute' in object;
}
export interface NumberAttemptsProvider{
    getNumberAttempts(context:DataClumpRefactoringContext):number

}
export class ConstantNumberAttemptsProvider implements NumberAttemptsProvider{
    private numberAttempts:number
    constructor(numberAttempts:number){
        this.numberAttempts=numberAttempts
    }
    getNumberAttempts(context: DataClumpRefactoringContext): number {
        return this.numberAttempts
    }
}

export class ProposalsNumberAttemptsProvider implements NumberAttemptsProvider{
    path: string | undefined;
    constructor(args:{path?:string}){
        this.path=args.path
    }
    getNumberAttempts(context: DataClumpRefactoringContext): number {
       let path=this.path??resolve(context.getProjectPath(),".data_clump_solver_data","proposals")
       return fs.readdirSync(path).length
    }

}
export  class LanguageModelDetectOrRefactorHandler extends AbstractStepHandler {
    private handlers: LargeLanguageModelHandler[] = []
    private providedApi: AbstractLanguageModel | null = null
    private temperatures: number[] = [0.1,0.5]
    private lastTemp = 0;
    private models: string[] = [""]
    private numberAttempts: NumberAttemptsProvider;;
    private outputHandler: OutputHandler = new  InteractiveProposalHandler();

   
    async handle(step: PipeLineStepType, context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
        let api: AbstractLanguageModel;
        if (this.providedApi != null) {
            api = this.providedApi
        }
        else {
            api = resolveFromInterfaceName(AbstractLanguageModel.name) as AbstractLanguageModel
        }
        let templateResolver = resolveFromConcreteName(LanguageModelTemplateResolver.name) as LanguageModelTemplateResolver
        this.providedApi = api
        let handlerIndex = 0
        let numberAttempts=this.numberAttempts.getNumberAttempts(context);

        for (let i = 0; i < numberAttempts; i++) {
            api.clear();
            let temperature = this.temperatures[randInt(this.temperatures.length)]
            this.lastTemp = temperature
            let model = "gpt-4-1106-preview"
            api.resetParameters({ model, temperature })
            let chat: ChatMessage[] = []

            for (handlerIndex = 0; handlerIndex < this.handlers.length; handlerIndex++) {
                let handler = this.handlers[handlerIndex]
                console.log("Running attempt "+i+" with handler "+handler.constructor.name )
                let messages = await handler.handle(context, api, templateResolver)
                if (isReExecutePreviousHandlers(handler) && handler.shallReExecute()) {
                    handlerIndex = -1;
                }
                else if (isReExecutePreviousHandlers(handler) && !handler.shallReExecute()) {
                    api.clear();
                }
                chat.push(...messages)
            }
            let reply = chat[chat.length - 1];
            await parseChat(chat, step, context,this.outputHandler)
        }
        let proposal=await this.outputHandler.chooseProposal(context)
        return proposal



    }
   


    static createFromCreatedHandlers(handlers: LargeLanguageModelHandler[], api: AbstractLanguageModel): LanguageModelDetectOrRefactorHandler {
        let step = new LanguageModelDetectOrRefactorHandler({ handlers: [],numberAttempts:1 })
        step.handlers = handlers
        step.providedApi = api
        return step
    }
    constructor(args: { handlers: string[], numberAttempts:string | number }) {
        super();
        Object.assign(this, args)
        if(typeof(args.numberAttempts)=="number"){
            this.numberAttempts=new ConstantNumberAttemptsProvider(args.numberAttempts)
        }
        else if(args.numberAttempts==undefined){
            this.numberAttempts=new ConstantNumberAttemptsProvider(1)
        }
        else{
            this.numberAttempts=resolveFromConcreteName(args.numberAttempts) as NumberAttemptsProvider
        }
        this.handlers = []

        for (let handler of args.handlers) {
            this.handlers.push(resolveFromConcreteName(handler) as LargeLanguageModelHandler)
        }

    }



    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.ASTGeneration, PipeLineStep.DataClumpDetection, PipeLineStep.Refactoring]
    }
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
        if (pipeLineStep == PipeLineStep.DataClumpDetection) {
            createdContexts.add(DataClumpDetectorContext.name)
        }
        else if (pipeLineStep == PipeLineStep.Refactoring) {
            createdContexts.add(RefactoredContext.name)
        }

    }

}