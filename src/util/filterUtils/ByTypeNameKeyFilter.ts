import { DataClumpTypeContext } from "data-clumps-type-context/ignoreCoverage/DataClumpTypeContext";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../context/DataContext";
import { SingleItemFilter } from "./SingleItemFilter";

export class ByTypeNameKeyFilter implements SingleItemFilter{
    shallRemain(data: string | DataClumpTypeContext, context: DataClumpRefactoringContext): Promise<boolean> {
        let dcContext=context.getByType(DataClumpDetectorContext) as DataClumpDetectorContext;
        let remain=dcContext.createDataTypeNameClumpKey(data as DataClumpTypeContext)==this.typeNameKey
        return Promise.resolve(remain)
    }
    isCompatibleWithDataClump(): boolean {
        return true;
    }
    isCompatibleWithString(): boolean {
       return false;
    }
    private typeNameKey:string
    constructor(args: { typeNameKey: string }) {
        this.typeNameKey=args.typeNameKey
    }

}