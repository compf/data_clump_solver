import simpleGit from "simple-git";
import { DataClumpRefactoringContext, ValidationContext } from "../../../context/DataContext";
import {resolve} from "path"
import fs from "fs"
import path from "path"
import readlineSync from "readline-sync"
export abstract class OutputHandler{
    abstract handleProposal(modifiedFiles:{[key:string]:string},context:DataClumpRefactoringContext,fullOutput?:any):void;
    abstract chooseProposal(context:DataClumpRefactoringContext):void;

    writeToFile(fullPath:string,content:string){
        fs.mkdirSync(path.dirname(fullPath),{recursive:true})
        fs.writeFileSync(fullPath,content)
    }
    applyProposal(modifiedFiles:{[key:string]:string}, context:DataClumpRefactoringContext){
        for(let p of Object.keys(modifiedFiles)){
            let content=modifiedFiles[p]
            p=resolve(context.getProjectPath(),p);
            this.writeToFile(p,content)
        }
    }
    deleteProposal(modifiedFiles:{[key:string]:string}, context:DataClumpRefactoringContext){
        for(let p of Object.keys(modifiedFiles)){
            p=resolve(context.getProjectPath(),p);
            fs.rmSync(p)
        }
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

export class InteractiveProposalHandler extends OutputHandler{
    private proposals:{ [key: string]: string; }[]=[]
    private outputs:string[]=[]
    handleProposal(modifiedFiles: { [key: string]: string; }, context: DataClumpRefactoringContext,  fullOutput?:any): void {
        this.proposals.push(modifiedFiles)
        this.outputs.push(fullOutput)
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
export interface OutputMetric{
    evaluate(modifiedFiles: { [key: string]: string; }, context: DataClumpRefactoringContext,   fullOutput?:any): number
}
export interface ValidationMetric{
    evaluate(modifiedFiles: { [key: string]: string; }, context: DataClumpRefactoringContext,   validationResult:ValidationContext,  fullOutput?:any): number

}

export class NumberOfLinesMetric implements OutputMetric{
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
export class SizeChangeMetric implements OutputMetric{
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
           return oldSize/newSize

    }

}
