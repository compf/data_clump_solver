import { DataClumpTypeContext } from "data-clumps-type-context";
import { DataClumpRefactoringContext } from "../../context/DataContext";
import { SingleItemFilter } from "./SingleItemFilter";

export class RandomProbabilityFilter implements SingleItemFilter{
    shallRemain(data: string | DataClumpTypeContext, context: DataClumpRefactoringContext): Promise<boolean> {
        return Promise.resolve(Math.random() < this.probability);
    }
    private probability: number;
    constructor(args: { probability: number }) {
        this.probability = args.probability;
    }
    isCompatibleWithDataClump(): boolean {
        return true;
    }
    isCompatibleWithString(): boolean {
        return true;
    }
}