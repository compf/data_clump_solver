import { DataClumpTypeContext } from "data-clumps-type-context/ignoreCoverage/DataClumpTypeContext";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../../context/DataContext";
import { Metric } from "../../../util/filterUtils/Metric";

export class OtherDataClumpsInFileMetric implements Metric{
    evaluate(data: string | DataClumpTypeContext, context: DataClumpRefactoringContext): Promise<number> {
        let dc =data as DataClumpTypeContext
        let counter=0;
        let dcContext=context.getByType(DataClumpDetectorContext);
        let myKey=dcContext?.createDataTypeNameClumpKey(dc)
        for(let other of Object.values( dcContext!.getDataClumpDetectionResult().data_clumps )){
            if(dc.from_file_path==other.from_file_path || dc.to_file_path==other.from_file_path || dc.from_file_path==other.to_file_path || dc.to_file_path==other.to_file_path){
                if(myKey!=dcContext?.createDataTypeNameClumpKey(other)){
                    counter++;
                }
            }
        }
        return Promise.resolve(counter)
    }
    isCompatibleWithDataClump(): boolean {
        return true;
    }
    isCompatibleWithString(): boolean {
        return false;
    }
}