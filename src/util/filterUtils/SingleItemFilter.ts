import { DataClumpTypeContext } from "data-clumps-type-context";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../context/DataContext";
export interface FilterOrMetric{
    isCompatibleWithDataClump():boolean;
    isCompatibleWithString():boolean;

}
export interface SingleItemFilter extends FilterOrMetric {
    shallRemain(data: string|DataClumpTypeContext,context:DataClumpRefactoringContext): Promise<boolean>;
  
}