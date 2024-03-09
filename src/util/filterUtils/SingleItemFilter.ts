import { DataClumpTypeContext } from "data-clumps-type-context";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../context/DataContext";
export interface FilterOrRanker{
    isCompatibleWithDataClump():boolean;
    isCompatibleWithString():boolean;

}
export interface SingleItemFilter extends FilterOrRanker {
    shallRemain(data: string|DataClumpTypeContext,context:DataClumpRefactoringContext): Promise<boolean>;
  
}