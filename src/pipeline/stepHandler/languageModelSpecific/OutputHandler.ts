import simpleGit from "simple-git";
import { DataClumpRefactoringContext, getContextSerializationBasePath, getContextSerializationPath, ValidationContext } from "../../../context/DataContext";
import {resolve} from "path"
import fs from "fs"
import path from "path"
import readlineSync from "readline-sync"
import { resolveFromConcreteName } from "../../../config/Configuration";
export abstract class OutputHandler{
    abstract handleProposal(modifiedFiles:{[key:string]:string},context:DataClumpRefactoringContext,fullOutput?:any):void;
    abstract chooseProposal(context:DataClumpRefactoringContext):void;

    writeToFile(fullPath:string,content:string){
        fs.mkdirSync(path.dirname(fullPath),{recursive:true})
        fs.writeFileSync(fullPath,content)
    }
    private existingFiles:{[key:string]:string}={}
    private newFiles:{[key:string]:boolean}={}

    applyProposal(modifiedFiles:{[key:string]:string}, context:DataClumpRefactoringContext){
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
    }
    deleteProposal(modifiedFiles:{[key:string]:string}, context:DataClumpRefactoringContext){
        for(let p of Object.keys(modifiedFiles)){
            p=resolve(context.getProjectPath(),p);
            if(p in this.existingFiles){
                this.writeToFile(p,this.existingFiles[p])
            }
            else if (p in this.newFiles){
                fs.unlinkSync(p)

            }
        }
    }
}
export class StubOutputHandler extends OutputHandler{
    handleProposal(modifiedFiles: { [key: string]: string; }, context: DataClumpRefactoringContext, fullOutput?: any): void {
        this.applyProposal(modifiedFiles, context)
        
    }
    chooseProposal(context: DataClumpRefactoringContext): void {
        
    }
}
export class MultipleBrancheHandler extends OutputHandler{
    private originalBranch:string="main"

    async handleProposal(modifiedFiles:{[key:string]:string},context:DataClumpRefactoringContext, fullOutput?:any) {
        let git=simpleGit(context.getProjectPath());
        let status=await git.status()
        let originalBranch=status.current!
        this.originalBranch=originalBranch;
       await git.checkout("-b data_clump_proposal"+(new Date()).getTime().toString())
       this.applyProposal(modifiedFiles, context)
       
        await git.add("-A");
        await  git.commit("Refactored data clumps");
        await  git.checkout(originalBranch)
    }
    async chooseProposal(context:DataClumpRefactoringContext) {
        readlineSync.question("Switch to the correct branch")
        let git=simpleGit(context.getProjectPath());
        let currBranch=(await git.status()).current!;
        await git.checkout(this.originalBranch);
        await git.merge([currBranch])
    }

}
export abstract class SimpleProposalHandler extends OutputHandler{
    protected proposals:{ [key: string]: string; }[]=[]
    protected outputs:string[]=[]
    handleProposal(modifiedFiles: { [key: string]: string; }, context: DataClumpRefactoringContext,  fullOutput?:any): void {
        this.proposals.push(modifiedFiles)
        this.outputs.push(fullOutput)
        fs.writeFileSync("stuff/proposal"+(new Date().getTime())+".json",JSON.stringify(fullOutput,null,2))
    }
    abstract chooseProposal(context:DataClumpRefactoringContext):void;

}
export class InteractiveProposalHandler extends SimpleProposalHandler{
 
    handleProposal(modifiedFiles: { [key: string]: string; }, context: DataClumpRefactoringContext,  fullOutput?:any): void {
        this.proposals.push(modifiedFiles)
        this.outputs.push(fullOutput)
        let outPath=getContextSerializationBasePath(context)
        fs.writeFileSync(resolve(outPath,"proposal"+(new Date().getTime())+".json"),JSON.stringify(fullOutput,null,2))
    }

    chooseProposal(context: DataClumpRefactoringContext): void {
        const question=`
        Choose an option?
        0) Next proposal
        1) previous proposal
        2) Mark current proposal as best
        3) Return to best proposal
        4) Exit
        
        `;
        let currProposal:{ [key: string]: string; }=this.proposals[0]
        this.applyProposal(currProposal,context)
        let bestProposalIndex=0;
        let currProposalIndex=0;
        let shallContinue=true;
        while(shallContinue){
            let option=readlineSync.question(question)
            let index=parseInt(option);

            switch(index){
                case 0:
                    this.deleteProposal(currProposal,context)
                    currProposalIndex++;
                    if(currProposalIndex>=this.proposals.length){
                        currProposalIndex=0;
                    }
                    currProposal=this.proposals[currProposalIndex];
                    console.log(currProposalIndex,this.outputs[currProposalIndex])
                    this.applyProposal(currProposal,context)
                    break;
                case 1:
                    this.deleteProposal(currProposal,context)
                    currProposalIndex--;
                    if(currProposalIndex<0){
                        currProposalIndex=this.proposals.length-1;
                    }
                    currProposal=this.proposals[currProposalIndex];
                    this.applyProposal(currProposal,context)
                    break;
                case 2:
                    bestProposalIndex=currProposalIndex;
                    break;
                case 3:
                    this.deleteProposal(currProposal,context)
                    currProposalIndex=bestProposalIndex
                   
                    currProposal=this.proposals[currProposalIndex];
                    this.applyProposal(currProposal,context);
                case 4:
                    shallContinue=false;
                    break;
                default:
                    console.log("Invalid option")
                



            }
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
   
    chooseProposal(context: DataClumpRefactoringContext): void {
        let mostScoredProposalIndex=0;
        let bestScore=0;
       for(let i=0;i<this.proposals.length;i++){
        let score=this.metric.evaluate(this.proposals[i],context,this.outputs[i])
        if(score>bestScore){
            bestScore=score;
            mostScoredProposalIndex=i
        }
       }
       console.log("Best proposal is ",mostScoredProposalIndex, bestScore, Object.keys(this.proposals[mostScoredProposalIndex]))
       this.applyProposal(this.proposals[mostScoredProposalIndex],context)

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
