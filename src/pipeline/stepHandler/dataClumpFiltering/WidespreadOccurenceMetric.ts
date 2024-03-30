import { DataClumpTypeContext } from "data-clumps-type-context/ignoreCoverage/DataClumpTypeContext";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../../context/DataContext";
import { Metric } from "../../../util/filterUtils/Metric";

export class WidespreadOccurenceRanker implements Metric {
    evaluate(data: string | DataClumpTypeContext, context: DataClumpRefactoringContext): Promise<number> {
        let dc=data as DataClumpTypeContext
        let counter=0;
       let size=0;
        for(let key of context.getByType(DataClumpDetectorContext)!.getDataClumpKeys()){
            let compDc=context.getByType(DataClumpDetectorContext)!.getDataClumpTypeContext(key)
            if(dc.from_class_or_interface_key==compDc.from_class_or_interface_key || dc.to_class_or_interface_key==compDc.to_class_or_interface_key){
                return Promise.resolve(1)
                counter++;
            }
            size++;
        }
        return Promise.resolve(counter/size)

    }
    isCompatibleWithDataClump(): boolean {
        return true;
    }
    isCompatibleWithString(): boolean {
        return false;
    }
}