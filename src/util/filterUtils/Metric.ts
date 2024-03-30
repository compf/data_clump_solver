import { DataClumpTypeContext } from "data-clumps-type-context";
import { DataClumpRefactoringContext } from "../../context/DataContext";
import { FilterOrMetric } from "./SingleItemFilter";

export interface Metric extends FilterOrMetric{
    evaluate(data: string|DataClumpTypeContext,context:DataClumpRefactoringContext): Promise<number>;
   
}