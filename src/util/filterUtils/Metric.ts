import { DataClumpTypeContext } from "data-clumps-type-context";
import { DataClumpRefactoringContext } from "../../context/DataContext";
import { FilterOrMetric } from "./SingleItemFilter";
export type PathOrDataClump=string|DataClumpTypeContext
export interface Metric extends FilterOrMetric{
    evaluate(data: PathOrDataClump,context:DataClumpRefactoringContext): Promise<number>;
   
}