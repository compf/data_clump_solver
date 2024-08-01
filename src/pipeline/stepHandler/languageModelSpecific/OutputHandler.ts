import simpleGit from "simple-git";
import { DataClumpRefactoringContext, getContextSerializationBasePath, getContextSerializationPath, ValidationContext } from "../../../context/DataContext";
import {resolve} from "path"
import fs from "fs"
import path from "path"
import readlineSync from "readline-sync"
import { resolveFromConcreteName } from "../../../config/Configuration";

export interface Proposal{
    apply(context:DataClumpRefactoringContext):DataClumpRefactoringContext
    delete(context:DataClumpRefactoringContext);
    getFullOutput():any
    evaluate(context:DataClumpRefactoringContext):number
}

export class ModifiedFilesProposal implements Proposal{
    constructor(private modifiedFiles:{[key:string]:string}, fullOutput?:any){
        this.modifiedFiles=modifiedFiles
        this.fullOutput=fullOutput
    }
    private fullOutput:any
    private metric:ProposalMetric=new NumberOfLinesProposalMetric()
    evaluate(context: DataClumpRefactoringContext): number {
        return this.metric.evaluate(this.modifiedFiles,context)
    }
    getFullOutput() {
        return this.fullOutput;
    }
    apply(context:DataClumpRefactoringContext): DataClumpRefactoringContext {
        let modifiedFiles=this.modifiedFiles;
        for(let p of Object.keys(modifiedFiles)){
            let content=modifiedFiles[p]
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
    handleProposal(proposal: Proposal, context: DataClumpRefactoringContext): void {
       proposal.apply(context)
        
    }
    chooseProposal(context: DataClumpRefactoringContext): Promise<DataClumpRefactoringContext> {
        return Promise.resolve(context);
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
        fs.writeFileSync("stuff/proposal"+(new Date().getTime())+".json",JSON.stringify(proposal.getFullOutput(),null,2))
    }

}
export class InteractiveProposalHandler extends SimpleProposalHandler{
 
    handleProposal(proposal: Proposal,  context: DataClumpRefactoringContext): void {
        this.proposals.push(proposal)
        let outPath=getContextSerializationBasePath(context)
        if(typeof(proposal.getFullOutput())=="string"){
        fs.writeFileSync(resolve(outPath,"proposal"+(new Date().getTime())+".json"),proposal.getFullOutput());

        }
        else{
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
        if(context!=tempContext){
            return Promise.resolve(context.buildNewContext(tempContext))

        }
        else{
            return Promise.resolve(context);
        }
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
       return  Promise.resolve(this.proposals[mostScoredProposalIndex].apply(context))

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
