import { DataClumpTypeContext } from "data-clumps-type-context/ignoreCoverage/DataClumpTypeContext";
import { DataClumpDetectorContext, GitRepositoryContext } from "../../context/DataContext";
import { AbstractRanker } from "./AbstractRanker";
import { AbstractSingleItemFilter } from "./AbstractSingleItemFilter";
import { GitHubService } from "../vcs/GitHubService";

export abstract class FileUpdateRanker implements AbstractRanker {
    async evaluate(data: string|DataClumpTypeContext,context:DataClumpDetectorContext): Promise<number> {
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
}