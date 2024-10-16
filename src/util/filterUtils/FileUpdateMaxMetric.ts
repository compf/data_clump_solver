import { DataClumpTypeContext } from "data-clumps-type-context";
import { DataClumpRefactoringContext, GitRepositoryContext } from "../../context/DataContext";
import {Metric} from "./Metric";
export class FileUpdateMaxMetric implements Metric {
    async evaluate(data: string | DataClumpTypeContext, context: DataClumpRefactoringContext): Promise<number> {
        let gitContext=context.getByType(GitRepositoryContext);
        if(gitContext==null){
            throw new Error("Git context not found")
        }
        return (await gitContext.getLastCommittedDate(data as string)).getTime()
    }
    isCompatibleWithDataClump(): boolean {
        return false;
    }
    isCompatibleWithString(): boolean {
       return true;
    }
    
}