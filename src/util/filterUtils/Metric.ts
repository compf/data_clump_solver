import { DataClumpTypeContext } from "data-clumps-type-context";
import { DataClumpRefactoringContext } from "../../context/DataContext";
import { FilterOrMetric } from "./SingleItemFilter";
export type PathOrDataClump=string|DataClumpTypeContext
export interface Metric extends FilterOrMetric{
    /**
     * Evaluate a path or a data clump and returns a number
     * @param data a path or a data clump
     * @param context the current context
     */
    evaluate(data: PathOrDataClump,context:DataClumpRefactoringContext): Promise<number>;
   
}