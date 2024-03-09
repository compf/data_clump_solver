import { DataClumpTypeContext } from "data-clumps-type-context/ignoreCoverage/DataClumpTypeContext";
import { DataClumpDetectorContext, DataClumpRefactoringContext, GitRepositoryContext } from "../../context/DataContext";
import { SingleItemFilter } from "./SingleItemFilter";
import { GitHubService } from "../vcs/GitHubService";
import { Ranker } from "./Ranker";

export abstract class FileUpdateRanker implements Ranker {
    async evaluate(data: string|DataClumpTypeContext,context:DataClumpRefactoringContext): Promise<number> {
        let relevantPaths: string[] = []
        if (typeof data === "string") {
            relevantPaths.push(data)
        }
        else {
            relevantPaths.push(data.from_file_path)
            relevantPaths.push(data.to_file_path)
        }
        let gitContext = context.getByType(GitRepositoryContext)
        if(gitContext==null){
            throw new Error("Git context not found")
        }
        let sum=0;
        for(let path of relevantPaths){
            let timestamps=await gitContext!.getAllCommittedDates(path)
            let score=this.evaluateTimestamps(timestamps)
            sum+=score

        }
        return sum/relevantPaths.length
    }

    abstract evaluateTimestamps(timestamps: Date[]): number

    isCompatibleWithDataClump(): boolean {
        return true
    }
    isCompatibleWithString(): boolean {
        return true
    }
}