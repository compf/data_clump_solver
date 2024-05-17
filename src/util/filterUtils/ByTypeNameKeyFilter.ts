import { DataClumpTypeContext } from "data-clumps-type-context/ignoreCoverage/DataClumpTypeContext";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../context/DataContext";
import { SingleItemFilter } from "./SingleItemFilter";

export class ByTypeNameKeyFilter implements SingleItemFilter{
    shallRemain(data: string | DataClumpTypeContext, context: DataClumpRefactoringContext): Promise<boolean> {
        let dcContext=context.getByType(DataClumpDetectorContext) as DataClumpDetectorContext;
        let remain=dcContext.createDataTypeNameClumpKey(data as DataClumpTypeContext)==this.typeNameKey
        console.log("Check",remain,this.typeNameKey)
        return Promise.resolve(remain)
    }
    isCompatibleWithDataClump(): boolean {
        return true;
    }
    isCompatibleWithString(): boolean {
       return false;
    }
    private typeNameKey:string
    constructor(args: { typeNameKey: string|string[] }) {
        if(Array.isArray(args.typeNameKey)){
            args.typeNameKey=args.typeNameKey.join(";")
        }
        this.typeNameKey=args.typeNameKey
    }

}