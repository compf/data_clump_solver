import { DataClumpTypeContext } from "data-clumps-type-context";
import { DataClumpDetectorContext } from "../../context/DataContext";

export interface AbstractSingleItemFilter {
    shallRemain(data: string|DataClumpTypeContext,context:DataClumpDetectorContext): Promise<boolean>;
}