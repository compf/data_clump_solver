import { DataClumpTypeContext } from "data-clumps-type-context/ignoreCoverage/DataClumpTypeContext";
import { DataClumpRefactoringContext } from "../../context/DataContext";
import { Ranker } from "./Ranker";

export class RandomRanker implements Ranker{
    evaluate(data: string | DataClumpTypeContext, context: DataClumpRefactoringContext): Promise<number> {
        return new Promise((resolve, reject) => {
            resolve(Math.random())
        })
    }
    isCompatibleWithDataClump(): boolean {
        return true;
    }
    isCompatibleWithString(): boolean {
        return true;
    }
    
}