import simpleGit, { SimpleGit } from "simple-git";
import { registerFromName, resolveFromConcreteName } from "../config/Configuration";
import { CodeObtainingContext, DataClumpRefactoringContext, FileFilteringContext, RelevantLocationsContext, ValidationResult } from "../context/DataContext";
import { PipeLineStep } from "../pipeline/PipeLineStep";
import {spawnSync} from 'child_process';
import { AllFilesHandler, AllFilesWithErrorHandler, CodeSnippetHandler, LargeLanguageModelHandler, SendHandler, SimpleInstructionHandler, SystemInstructionHandler, ValidationResultHandler } from "../pipeline/stepHandler/languageModelSpecific/ContextToModelHandlers";
import { parseChat, StubOutputHandler } from "../pipeline/stepHandler/languageModelSpecific/ModelToContextHandlers";
import { MavenBuildValidationStepHandler } from "../pipeline/stepHandler/validation/MavenBuildValidationStepHandler";
import { MultipleAttemptsValidationHandler } from "../pipeline/stepHandler/validation/MultipleAttemptsValidationHandler";
import { FileIO } from "../util/FileIO";
import { AbstractLanguageModel, ChatMessage, MessageType, TokenStats } from "../util/languageModel/AbstractLanguageModel";
import { LanguageModelTemplateResolver } from "../util/languageModel/LanguageModelTemplateResolver";
import { getCurrLabel, getRelevantFilesRec, tryParseJSON, waitSync, writeFileSync } from "../util/Utils";
import { basename, resolve } from "path";
import fs from "fs"
import { Arrayified, BaseEvaluator, getInstancePath, init, Instance, InstanceBasedFileIO, isDebug } from "./base_eval";
import { ValidationStepHandler } from "../pipeline/stepHandler/validation/ValidationStepHandler";
import { DataClumpDoctorStepHandler } from "../pipeline/stepHandler/dataClumpDetection/DataClumpDoctorStepHandler";
import { LanguageServerReferenceStepHandler } from "../pipeline/stepHandler/referenceFinding/LanguageServerReferenceStepHandler";
import { LanguageServerAPI } from "../util/languageServer/LanguageServerAPI";
import { FilterOrMetric } from "../util/filterUtils/SingleItemFilter";
import { RandomRanker } from "../util/filterUtils/RandomRanker";
import { loadExistingContext } from "../context/ExistingContextLoader";
import { ByDataClumpTypeFilter } from "../util/filterUtils/ByDataClumpTypeFilter";
import { DataClumpDoctorASTGeneratorStep } from "../pipeline/stepHandler/astGeneration/DataClumpDoctorASTGeneratorStepHandler";
export type RefactorInstance = Instance & {
    includeUsages: string

}

type RefactorInstanceCombination = Arrayified<RefactorInstance>
const refactorHandlersName = "refactorHandlers"
const multiValidationHandlerName = "multiValidationHandler"
export class RefactorEval extends BaseEvaluator {
    getOutputPath(): string {
        return "stuff/eval/refactor_eval.json";
    }
    isProjectFullyAnalyzed(): boolean {
        return false;
    }
    getNumDataClumpsPerBlock(): number {
        return 3;
    }
    getCriteria(): FilterOrMetric[] {
        return [
            new RandomRanker(),
            new ByDataClumpTypeFilter({ type: "parameters_to_parameters_data_clump" })
        ]
    }
    simplifyInstance(instance: RefactorInstance): RefactorInstance {
        if (instance.inputFormat != "instructionSnippet") {
            delete instance["margin" as any];
        }
        return instance
    }
    createInstanceCombination(): RefactorInstanceCombination {
        let result = {
            instanceType: ["refactor"],
            model: ["gpt-4-1106-preview"],
            temperature: [
                0.1
                ,
                0.5
                ,
                0.9
            ],
            instructionType: [
                // "definitionBased",
                "exampleBased"
                //,
                //"noDefinitionBased"
            ],
            inputFormat: [



                "instruction",
                "instructionSnippet",
                //"fullCode"
            ],
            iteration: Array.from({ length: 10 }, (x, i) => i),
            margin: [0, 1, 2, 5, 10],
            projectName: [],
            includeUsages: []
        }
        if (isDebug()) {
            result.iteration = [0]
            result.temperature = [0.1]
        }
        if (this.includeUsage()) {
            result.includeUsages = ["withUsages"] as any
        }
        else {
            result.includeUsages = [] as any
        }
        return result
    }
    includeUsage(): boolean {
        return false;
    }
    getBaseDirLabel(): string {
        return "refactoring"
    }
    async getUsageInformation(context: RelevantLocationsContext): Promise<RelevantLocationsContext> {
        registerFromName("EclipseLSP_API", LanguageServerAPI.name, {})
        let ctx = loadExistingContext(PipeLineStep.ReferenceFinding, context)
        if (ctx == null) {
            let usageFinder = new LanguageServerReferenceStepHandler({ apiName: "EclipseLSP_API", useExistingReferences: true, apiArgs: {} });
            context = (await usageFinder.handle(PipeLineStep.ReferenceFinding, context, {})) as RelevantLocationsContext
        }
        else {
            context = ctx as RelevantLocationsContext
        }

        return context;
    }

    async initProject(url: string): Promise<DataClumpRefactoringContext | null> {
        let context = await super.initProject(url);
        let git = simpleGit(context?.getProjectPath())
        if (context == null) {
            return null;
        }
        if (this.includeUsage()) {
            context = context.buildNewContext(await this.getUsageInformation(context as RelevantLocationsContext))

        }
        spawnSync("mvn",["clean"],{cwd:context.getProjectPath()});
        await git.checkout("-Bcontext")
        await git.add(["-f", ".data_clump_solver_data"])
        await git.commit("context")

        return context;

    }
    getValidationInstance(): ValidationStepHandler {
        return new MavenBuildValidationStepHandler({ skipTests: true })
    }
    async validateInstance(context: DataClumpRefactoringContext) {
        let valL = this.getValidationInstance()
        let resL = await valL.validate(context)
        if (!resL.success) {
            throw "Project does not compile"
        }
    }
    async detectDataClump(git: SimpleGit, context: DataClumpRefactoringContext) {
        let detector = new DataClumpDoctorStepHandler({})
        let ctx = await detector.handle(PipeLineStep.DataClumpDetection, context.getByType(CodeObtainingContext)!, undefined)
        await git.add(["-f", ".data_clump_solver_data"])
        await git.commit("added data clumps data")
    }
    async analyzeInstance(instance: RefactorInstance, context: DataClumpRefactoringContext): Promise<void> {
        let git = simpleGit(context.getProjectPath())
        let g = await git.checkout("-B" + getInstancePath([], "-", instance))
        await this.validateInstance(context)
        let refactorHandlers: LargeLanguageModelHandler[] = [
            new SystemInstructionHandler({
                instructionPath: `chatGPT_templates/refactor/${instance.inputFormat == "fullCode" ? "instruction" : instance.inputFormat}.template`
            }),

        ];
        let sourceHandler = instance.inputFormat == "instructionSnippet" ? new CodeSnippetHandler({ additionalMargin: instance.margin }) : new AllFilesWithErrorHandler()
        refactorHandlers.push(sourceHandler)
        refactorHandlers.push(new SendHandler());
        let resolver = resolveFromConcreteName(LanguageModelTemplateResolver.name) as LanguageModelTemplateResolver;
        resolver.set("%{output_format}", "chatGPT_templates/use_json.template")
        resolver.set("%{output_format_refactor}", "chatGPT_templates/json_format_refactor_piecewise.json")
        if (instance.inputFormat == "fullCode") {
            resolver.set("%{output_format_refactor}", "chatGPT_templates/json_format_refactor_output.json")

        }
        let defPath = "";
        if (instance.instructionType == "definitionBased") {
            defPath = "chatGPT_templates/data_clump_def.template"
        }
        else if (instance.instructionType == "exampleBased") {
            defPath = "chatGPT_templates/data_clump_examples.template"
        }
        else {
            defPath = "chatGPT_templates/empty_file.template"
        }
        resolver.set("%{data_clump_def}", defPath);
        let multiValidationHandler = new MultipleAttemptsValidationHandler({
            innerValidator: this.getValidationInstance(),
            handlers: [
                new SimpleInstructionHandler({ instructionPath: "chatGPT_templates/validation/fix_errors.template" }),
                new ValidationResultHandler(),
                new SimpleInstructionHandler({ instructionPath: "chatGPT_templates/validation/current_state.template" }),
                sourceHandler,
                new SendHandler()
            ]

        })
        multiValidationHandler.afterValidationStep = async (attempt: number) => {
            await git.add("-A")
            await git.commit(getCurrLabel())
            await git.raw(["tag", getInstancePath([], "-", instance) + "-" + getCurrLabel(), "-f"])

        }

        let api = resolveFromConcreteName(AbstractLanguageModel.name) as AbstractLanguageModel;
        let chat: ChatMessage[] = []

        for (let h of refactorHandlers) {
            chat.push(... (await h.handle(context, api, resolver)));
        }

        let reply = chat[chat.length - 1];
        let stubOutputHandler = new StubOutputHandler();
        stubOutputHandler.apply = true;
        await this.writeExtractedClasses(reply)
        context = context.buildNewContext(await parseChat(chat, PipeLineStep.Refactoring, context, stubOutputHandler));
        let val = this.getValidationInstance()
        let res = await val.validate(context)
        writeFileSync("errors.txt", res.raw ?? "")
        await git.add("-A")
        await git.commit("refactoring")
        await git.raw(["tag", getInstancePath([], "-", instance) + "-" + getCurrLabel(), "-f"])

        context = context.buildNewContext(await stubOutputHandler.chooseProposal(context));

        let count = await multiValidationHandler.getValidationCount(context);

        await this.detectDataClump(git, context)
        await git.checkout("context")
        writeFileSync("validation_count.json", JSON.stringify(count, null, 2))
        console.log("Validation count", count);
        waitSync(1000)
        AllFilesHandler.processed.clear()
    }

    async writeExtractedClasses(msg: ChatMessage) {
        let content = tryParseJSON(msg.messages[0])

        let sourcePath = FileIO.instance.resolvePath("extractedClassesSource")
        let astPath = FileIO.instance.resolvePath("extractedClassesAST");
        fs.mkdirSync(sourcePath, { recursive: true })
        fs.mkdirSync(astPath, { recursive: true })
        if (content == null || content == undefined) return
        if ("extractedClasses" in content) {
            for (let p in content.extractedClasses) {
                let classContent = content.extractedClasses[p]
                if(classContent==null || classContent==undefined || typeof(classContent)!="string")continue;
                let fName = basename(p)
                let dest = resolve(sourcePath, fName);
                if (fName != "") {
                    fs.writeFileSync(resolve(sourcePath, fName), classContent)

                }

            }
        }
        let astGen = new DataClumpDoctorASTGeneratorStep({})
        await astGen.analyzeSourceCodeFiles(sourcePath, astPath, new DataClumpRefactoringContext())
        fs.rmSync(sourcePath, { force: true, recursive: true })

    }

}









//###########################################################################


export class InstanceBasedLanguageModelAPI extends AbstractLanguageModel {
    public fileIO: InstanceBasedFileIO;
    private relevantFiles: string[] = []
    private counter = 0
    prepareMessage(message: string, messageType?: MessageType): ChatMessage {
        return { messages: [message], messageType: messageType! }
    }

    sendMessages(clear: boolean): Promise<ChatMessage> {
        let resp = "{}"

        if (this.counter < this.relevantFiles.length) {
            resp = fs.readFileSync(this.relevantFiles[this.counter]).toString()
        }
        this.counter++;

        return Promise.resolve({
            messageType: "output",
            messages: [resp]
        })
    }
    clear(): void {
    }
    getTokenStats(): TokenStats {
        return {}
    }
    resetParameters(instance: Instance) {
        let path = getInstancePath(["evalData"], "/", instance)
        this.relevantFiles = []
        getRelevantFilesRec(path, this.relevantFiles, new FileFilteringContext([".*response.json"], []))
        this.counter = 0;
    }

    constructor(fileIo: InstanceBasedFileIO) {
        super()
        this.fileIO = fileIo;
    }

}


class DummyInstanceBasedIO extends InstanceBasedFileIO {
    readFileSync(path: string): string {
        return "{}"
    }
    writeFileSync(path: string, data: string): void {

    }
}

export class ReplayRefactorEvaluator extends RefactorEval {

    shallIgnore(instance: Instance): boolean {
        return !super.shallIgnore(instance)
    }
    async validateInstance(context: DataClumpRefactoringContext): Promise<void> {

    }


    prepareLargeLanguageModelAPI(): void {
        registerFromName(InstanceBasedLanguageModelAPI.name, AbstractLanguageModel.name, FileIO.instance)
    }

    getValidationInstance(): ValidationStepHandler {
        return new DummyValidationStep({ skipTests: true })
    }
    async getUsageInformation(context: RelevantLocationsContext): Promise<RelevantLocationsContext> {
        return context
    }


}
class DummyValidationStep extends ValidationStepHandler {
    validate(context: DataClumpRefactoringContext): Promise<ValidationResult> {
        return Promise.resolve({ errors: [], success: false })
    }

}

if (require.main === module) {
    const replay = false;
    if (replay) {
        FileIO.instance = new DummyInstanceBasedIO()
        let refactorEval = new ReplayRefactorEvaluator();
        refactorEval.analyzeProject(init());
    }
    else {
        FileIO.instance = new InstanceBasedFileIO()
        let refactorEval = new RefactorEval();
        refactorEval.analyzeProject(init());
    }


}


