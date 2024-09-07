import simpleGit from "simple-git";
import { createDataClumpsTypeContext, DataClumpDetectorContext, DataClumpRefactoringContext, FileFilteringContext, getContextSerializationBasePath, getContextSerializationPath, LargeLanguageModelContext, RefactoredContext, ValidationContext } from "../../../context/DataContext";
import {resolve} from "path"
import fs from "fs"
import path from "path"
import readlineSync from "readline-sync"
import { resolveFromConcreteName } from "../../../config/Configuration";
import { ChatMessage } from "../../../util/languageModel/AbstractLanguageModel";
import { getRelevantFilesRec, parseInvalidJSON, tryParseJSON, tryParseJSONWithSlice, writeFileSync } from "../../../util/Utils";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";

export function parsePath(filePath: string, context: DataClumpRefactoringContext) {

    if (fs.existsSync(resolve(context.getProjectPath(), filePath)) && fs.statSync(resolve(context.getProjectPath(), filePath)).isFile()) {
        console.log("exists")
        return resolve(context.getProjectPath(), filePath)
    }
    let relevantFiles:string[]=[]
    getRelevantFilesRec(context.getProjectPath(),relevantFiles,context.getByType(FileFilteringContext))
    let bestMatchingResults = relevantFiles.filter((it) => it.endsWith(filePath)).sort((a, b) => a.length - b.length)
    if (bestMatchingResults.length > 0) {
        console.log("best matching", bestMatchingResults[0])
        return bestMatchingResults[0]
    }
    else {
        if (filePath.endsWith(".java")) {
            let dir = resolve(context.getProjectPath(), path.dirname(filePath))
            if (fs.existsSync(dir)) {
                console.log("existing file")
                return resolve(context.getProjectPath(), filePath)
            }
            else {
                let somePath = relevantFiles[0]
                console.log("somepath", somePath)
                return resolve(path.dirname(somePath), filePath)
            }
        }
    }
    throw "Could not parse " + filePath
}
export function parseMarkdown(context: DataClumpRefactoringContext, message: string, outputHandler:OutputHandler) {
    let insideCodeBlock = false;
    let path = "";
    let code = ""
    let foundPath = false;
    let foundCode = false;
    let changes = {}
    const pathRegex = /([a-zA-Z]:\\)?(\\?\w+)+\.java/gm
    let lines = message.split("\n")
    for (let line of lines) {
        console.log("line", line)
        if (false && !insideCodeBlock && !line.includes("\\n") && line.match(pathRegex)) {
            let m = line.match(pathRegex)!
            console.log(line)
            console.log(m)
            line = m[0]
            console.log("detected", line)
            console.log("parsing path")
            path = parsePath(line, context);
            // throw path
            foundPath = path != "";
        }
        else if (line.includes("``") && !insideCodeBlock) {
            insideCodeBlock = true;
            foundCode = true;
        }
        else if (line.startsWith("``") && insideCodeBlock) {

            console.log("path", path)
            insideCodeBlock = false;
            if (path == "") {
                console.log("path not found")
            }
            else {
                changes[path] = code
                //fs.writeFileSync(path,code);

            }
            path = ""
            code = ""
        }
        else if (insideCodeBlock) {
            console.log("code", line)
            code += line + "\n"
        }
        else {
            console.log("OTHER:", line)
        }
    }
    
    outputHandler.handleProposal(new ModifiedFilesProposal(changes,[
        {
            messageType:"output",
            messages:[message]
        }
    ]), context);

}
function findBestFittingLine(lines:string[], startLine:number, compareLine:string){
    let deltas=[0,1,-1,2,-2,3,-3]
    for(let s of deltas){
        let line=lines[startLine+s]
        if(line){
            if(line.trim()==compareLine.trim()){
                return startLine+s
            }
        }
       
    }
}
function concatenateNewContentArrayLength(array:string[],start:number){
    for(let i=start+1;i<array.length;i++){
       array[start]=array[start]+"\n"+array[i]
    }
    return array.slice(0,start+1)

}
export function   parse_piecewise_output(content: any,fullChat:ChatMessage[], context: DataClumpRefactoringContext, outputHandler:OutputHandler): string | null {
    let changes = {};

    if (typeof content == "object") {
        content.date=(new Date()).toISOString();
        for (let refactoredPath of Object.keys(content.refactorings)) {
            if (refactoredPath=="extractedClasses") {

                content["extractedClasses"]=content.refactorings.extractedClasses
                delete content.refactorings["extractedClasses"]
                continue
            }
            console.log(refactoredPath)
            let path = resolve(context.getProjectPath(), refactoredPath)
            if(!fs.existsSync(path) ||  fs.statSync(path).isDirectory()){
                continue;
            }
            let fileContent = fs.readFileSync(path, { encoding: "utf-8" })
            let fileContentSplitted = fileContent.split("\n")

            console.log(content.refactorings[refactoredPath])
            for (let change of content.refactorings[refactoredPath]) {
                let start = change.fromLine
                if(typeof(start)=="string"){
                    start=parseInt(start)
                }

                let newContent = change.newContent
                let oldContent = change.oldContent
                if(oldContent==undefined || newContent==undefined || change.fromLine==undefined || change.toLine==undefined){
                    continue;
                }
                let index = fileContent.indexOf(oldContent)
                console.log("change", change)
                const MAX_OFFSET = 5
                if(index==-1) {
                    let newContentSplitted = newContent.split("\n")
                    let oldContentSplitted = oldContent.split("\n")
                    if(newContentSplitted.length>oldContentSplitted.length){
                        newContentSplitted=concatenateNewContentArrayLength(newContentSplitted,oldContentSplitted.length-1)
                    }
                    for(let i=0;i<oldContentSplitted.length;i++){
                        let otherIndex=findBestFittingLine(fileContentSplitted,start+i,oldContentSplitted[i])
                        if(otherIndex){
                        fileContentSplitted[otherIndex]=newContentSplitted[i]
                        fileContent=fileContentSplitted.join("\n")
                        fileContentSplitted=fileContent.split("\n")


                        }

                    }
                    if(oldContentSplitted.length>newContentSplitted.length){
                        fileContentSplitted=fileContentSplitted.filter((it=>it!=undefined))
                        fileContent=fileContentSplitted.join("\n")
                    }
                    
                    
                    fileContent = fileContentSplitted.join("\n")


                }
                else{
                if (oldContent != "") {
                    fileContent = fileContent.replaceAll(oldContent, newContent)
                    fileContentSplitted = fileContent.split("\n")


                }
                console.log()
                // console.log(oldContent)
                //console.log(newContent)
                let startIndex = start
                const offset = -4
                startIndex -= offset
                if (startIndex < 0) {
                    throw new Error("Invalid line range")
                }



            }
        }
            console.log(path)
            changes[path] = fileContent;
            if ("extractedClasses" in content) {


                for (let extractedClassPath of Object.keys(content.extractedClasses)) {
                    let outPath = resolve(context.getProjectPath(), extractedClassPath)
                    changes[outPath] = content.extractedClasses[extractedClassPath]
                }
            }

        }

    }
    console.log("handle proposal")
    outputHandler.handleProposal(new  ModifiedFilesProposal(changes,fullChat),context);
    return content

}
export async   function parseChat(fullChat: ChatMessage[], step: PipeLineStepType | null, context: DataClumpRefactoringContext, outputHandler:OutputHandler): Promise<DataClumpRefactoringContext> {

    let chat=fullChat[fullChat.length-1]
    let resultContext: DataClumpRefactoringContext = step == PipeLineStep.DataClumpDetection ? new DataClumpDetectorContext(createDataClumpsTypeContext({}, context)) : new RefactoredContext();
    resultContext = context.buildNewContext(resultContext);
    (resultContext as any).chat = chat
    let c = chat
    {
        if (c.messageType == "output") {
            for (let m of c.messages) {
                let json = tryParseJSONWithSlice(m)
                


                if (step == PipeLineStep.Refactoring) {
                    if(json==null){
                        json=parseInvalidJSON(m," }]}}")
                    }
                    if (json == null) {


                        parseMarkdown(context, m,outputHandler)
                    }
                    else if (typeof(json)=="object" && ("refactorings" in json)) {
                        parse_piecewise_output(json, fullChat,context,outputHandler)
                    }


                }
                else if (step == PipeLineStep.DataClumpDetection) {
                    let data_clumps_type_context = (resultContext as DataClumpDetectorContext).getDataClumpDetectionResult()
                    for (let key in json.data_clumps) {
                        let newKey = key
                        if (key in data_clumps_type_context.data_clumps) {
                            newKey = newKey + Math.random()
                        }
                        data_clumps_type_context.data_clumps[newKey] = json.data_clumps[newKey]
                    }

                }





            }
        }
    }
    return resultContext
}

export interface Proposal{
    apply(context:DataClumpRefactoringContext):DataClumpRefactoringContext
    delete(context:DataClumpRefactoringContext);
    getFullOutput():ChatMessage[]
    evaluate(context:DataClumpRefactoringContext):number
}

export class ModifiedFilesProposal implements Proposal{
    constructor(private modifiedFiles:{[key:string]:string}, fullOutput:ChatMessage[]){
        this.modifiedFiles=modifiedFiles
        this.fullOutput=fullOutput
    }
    private  fullOutput:ChatMessage[]
    private metric:ProposalMetric=new NumberOfLinesProposalMetric()
    evaluate(context: DataClumpRefactoringContext): number {
        return this.metric.evaluate(this.modifiedFiles,context)
    }
    getFullOutput():ChatMessage[] {
        return this.fullOutput;
    }
    getModifiedFiles(){
        return this.modifiedFiles;
    }
    apply(context:DataClumpRefactoringContext): DataClumpRefactoringContext {
        let modifiedFiles=this.modifiedFiles;
        for(let p of Object.keys(modifiedFiles)){
            let content=modifiedFiles[p]
            writeFileSync( path.relative(context.getProjectPath(),p),content)

            p=resolve(context.getProjectPath(),p);
            if(!(p in this.existingFiles) && fs.existsSync(p)){
                this.existingFiles[p]=fs.readFileSync(p,{encoding:"utf-8"})
            }
            else if(!(p in this.newFiles) && !fs.existsSync(p)){
                this.newFiles[p]=true
            }
            this.writeToFile(p,content)
        }
        return context
    }
    delete(context:DataClumpRefactoringContext){
        for(let p of Object.keys(this.modifiedFiles)){
            p=resolve(context.getProjectPath(),p);
            if(p in this.existingFiles){
                this.writeToFile(p,this.existingFiles[p])
            }
            else if (p in this.newFiles){
                fs.unlinkSync(p)

            }
        }
    }
    private existingFiles:{[key:string]:string}={}
    private newFiles:{[key:string]:boolean}={}
    writeToFile(fullPath:string,content:string){
        fs.mkdirSync(path.dirname(fullPath),{recursive:true})
        fs.writeFileSync(fullPath,content)
    }
}

export abstract class OutputHandler{
    abstract handleProposal(proposal:Proposal, context:DataClumpRefactoringContext):void;
    abstract chooseProposal(context:DataClumpRefactoringContext):Promise<DataClumpRefactoringContext>;
}
export class StubOutputHandler extends OutputHandler{
    public proposal:Proposal|null=null
    public apply:boolean=true
    handleProposal(proposal: Proposal, context: DataClumpRefactoringContext): void {
       if(this.apply)
        proposal.apply(context)
       this.proposal=proposal
        
    }
    chooseProposal(context: DataClumpRefactoringContext): Promise<DataClumpRefactoringContext> {
        return Promise.resolve(new LargeLanguageModelContext(this.proposal!.getFullOutput()));
    }
}
export class MultipleBrancheHandler extends OutputHandler{
    private originalBranch:string="main"

    async handleProposal(proposal: Proposal, context: DataClumpRefactoringContext){
        let git=simpleGit(context.getProjectPath());
        let status=await git.status()
        let originalBranch=status.current!
        this.originalBranch=originalBranch;
       await git.checkout("-b data_clump_proposal"+(new Date()).getTime().toString())
       proposal.apply(context)
       
        await git.add("-A");
        await  git.commit("Refactored data clumps");
        await  git.checkout(originalBranch)
    }
    async chooseProposal(context:DataClumpRefactoringContext): Promise<DataClumpRefactoringContext> {
        readlineSync.question("Switch to the correct branch")
        let git=simpleGit(context.getProjectPath());
        let currBranch=(await git.status()).current!;
        await git.checkout(this.originalBranch);
        await git.merge([currBranch]);
        return context;
    }

}
export abstract class SimpleProposalHandler extends OutputHandler{
    protected proposals:Proposal[]=[]
    handleProposal(proposal: Proposal,  context: DataClumpRefactoringContext): void {
        this.proposals.push(proposal)
        writeFileSync("proposal"+(new Date().getTime())+".json",JSON.stringify(proposal.getFullOutput(),null,2))
    }

}
export class InteractiveProposalHandler extends SimpleProposalHandler{
 
    handleProposal(proposal: Proposal,  context: DataClumpRefactoringContext): void {
        this.proposals.push(proposal)
        let outPath=getContextSerializationBasePath(context)
        
        {
            fs.writeFileSync(resolve(outPath,"proposal"+(new Date().getTime())+".json"),JSON.stringify(proposal.getFullOutput(),null,2))

        }
    }

    chooseProposal(context: DataClumpRefactoringContext): Promise<DataClumpRefactoringContext> {
        const question=`
        Choose an option?
        0) Next proposal
        1) previous proposal
        2) Mark current proposal as best
        3) Return to best proposal
        4) Exit
        
        `;
        let currProposal=this.proposals[0];
        let tempContext= currProposal.apply(context);
        let bestProposalIndex=0;
        let currProposalIndex=0;
        let shallContinue=true;
        while(shallContinue){
            let option=readlineSync.question(question)
            let index=parseInt(option);

            switch(index){
                case 0:
                   tempContext= currProposal.delete(context)
                    currProposalIndex++;
                    if(currProposalIndex>=this.proposals.length){
                        currProposalIndex=0;
                    }
                    currProposal=this.proposals[currProposalIndex];
                    console.log(currProposalIndex,currProposal.getFullOutput())
                    tempContext= currProposal.apply(context)
                    break;
                case 1:
                    tempContext= currProposal.delete(context)
                    currProposalIndex--;
                    if(currProposalIndex<0){
                        currProposalIndex=this.proposals.length-1;
                    }
                    currProposal=this.proposals[currProposalIndex];
                    tempContext= currProposal.apply(context)
                    break;
                case 2:
                    bestProposalIndex=currProposalIndex;
                    break;
                case 3:
                    tempContext= currProposal.delete(context)
                    currProposalIndex=bestProposalIndex
                   
                    currProposal=this.proposals[currProposalIndex];
                    tempContext= currProposal.apply(context)
                case 4:
                    shallContinue=false;
                    break;
                default:
                    console.log("Invalid option")
                



            }
        }
        tempContext=tempContext.buildNewContext(new LargeLanguageModelContext(currProposal.getFullOutput()))
        return Promise.resolve(tempContext);
        /*if(context!=tempContext){
            return Promise.resolve(context.buildNewContext(tempContext))

        }
        else{
            return Promise.resolve(context);
        }*/
    }
}
export interface ProposalMetric{
    evaluate(modifiedFiles: { [key: string]: string; }, context: DataClumpRefactoringContext,   fullOutput?:any): number
}
export interface ValidationMetric{
    evaluate(modifiedFiles: { [key: string]: string; }, context: DataClumpRefactoringContext,   validationResult:ValidationContext,  fullOutput?:any): number

}
export class MetricBasedProposalHandler extends SimpleProposalHandler{
   
    chooseProposal(context: DataClumpRefactoringContext): Promise<DataClumpRefactoringContext> {
        let mostScoredProposalIndex=0;
        let bestScore=0;
       for(let i=0;i<this.proposals.length;i++){
        let score=this.proposals[i].evaluate(context)
        if(score>bestScore){
            bestScore=score;
            mostScoredProposalIndex=i
        }
       }
       console.log("Best proposal is ",mostScoredProposalIndex, bestScore, Object.keys(this.proposals[mostScoredProposalIndex]))
       let tempContext=this.proposals[mostScoredProposalIndex].apply(context)
       tempContext=tempContext.buildNewContext(new LargeLanguageModelContext(this.proposals[mostScoredProposalIndex].getFullOutput()))
       return  Promise.resolve(tempContext)

    }
    private metric:ProposalMetric
    constructor(args:{proposalMetricName}){
        super()
        this.metric=resolveFromConcreteName(args.proposalMetricName) as ProposalMetric
    
    }
}

export class AffectedFilesProposalMetric implements ProposalMetric{
    evaluate(modifiedFiles: { [key: string]: string; }, context: DataClumpRefactoringContext, fullOutput?: any): number {
        return Object.keys(modifiedFiles).length
    }

}
export class NumberOfLinesProposalMetric implements ProposalMetric{
    evaluate(modifiedFiles: { [key: string]: string; }, context: DataClumpRefactoringContext,   fullOutput?:any): number {
       let result=0
        if(fullOutput){
        for(let key in fullOutput.refactorings){
            for(let change of fullOutput.refactorings[key]){
                result+=change.newContent.split("\n").length;
            }
        }
       }
       return result;
    }
    
}
export class SizeChangeProposalMetric implements ProposalMetric{
    evaluate(modifiedFiles: { [key: string]: string; }, context: DataClumpRefactoringContext, fullOutput?: any): number {
        let oldSize=0;
        let newSize=0
        if(fullOutput){
            for(let key in fullOutput.refactorings){
                for(let change of fullOutput.refactorings[key]){
                    newSize+=change.newContent.length
                    oldSize+=change.oldContent.length
                }
            }
           }
           if(newSize==0){
            return 0
           }
           return oldSize/newSize

    }

}
