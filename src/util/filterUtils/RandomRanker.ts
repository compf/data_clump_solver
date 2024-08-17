import { DataClumpTypeContext } from "data-clumps-type-context/ignoreCoverage/DataClumpTypeContext";
import { DataClumpRefactoringContext } from "../../context/DataContext";
import { Metric } from "./Metric";

export class RandomRanker implements Metric{
    evaluate(data: string | DataClumpTypeContext, context: DataClumpRefactoringContext): Promise<number> {
        return  Promise.resolve(Math.random())
    }
    isCompatibleWithDataClump(): boolean {
        return true;
    }
    isCompatibleWithString(): boolean {
        return true;
    }
    
}