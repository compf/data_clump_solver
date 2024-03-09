import { DataClumpTypeContext } from "data-clumps-type-context/ignoreCoverage/DataClumpTypeContext";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../context/DataContext";
import { SingleItemFilter } from "./SingleItemFilter";

export abstract class AbstractMultipleFilters implements SingleItemFilter {
    abstract shallRemain(data: string | DataClumpTypeContext, context: DataClumpRefactoringContext): Promise<boolean>;
    protected filters: SingleItemFilter[] = []
    constructor(filters: SingleItemFilter[]) {
        this.filters = filters
    }
    isCompatibleWithString(): boolean {
        return this.filters.every(f => f.isCompatibleWithString())
    }
    isCompatibleWithDataClump(): boolean {
        return this.filters.every(f => f.isCompatibleWithDataClump())
    }
}