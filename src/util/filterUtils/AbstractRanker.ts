import { DataClumpTypeContext } from "data-clumps-type-context";
import { DataClumpDetectorContext } from "../../context/DataContext";

export interface AbstractRanker {
      evaluate(data: string|DataClumpTypeContext,context:DataClumpDetectorContext): Promise<number>;
}