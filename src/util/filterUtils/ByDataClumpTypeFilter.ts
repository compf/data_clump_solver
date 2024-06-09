import { DataClumpTypeContext } from "data-clumps-type-context/ignoreCoverage/DataClumpTypeContext";
import { DataClumpRefactoringContext } from "../../context/DataContext";
import { SingleItemFilter } from "./SingleItemFilter"

export class ByDataClumpTypeFilter implements SingleItemFilter{
    constructor(args:{type:string}){
        if(args){
            this.type=args.type
        }
    }
    shallRemain(data: string | DataClumpTypeContext, context: DataClumpRefactoringContext): Promise<boolean> {
        let dc=data as DataClumpTypeContext
        return Promise.resolve(dc.data_clump_type==this.type)
    }
    private type:string=""
    
    isCompatibleWithDataClump(): boolean {
        return true;
    }
    isCompatibleWithString(): boolean {
        return false;
    }
}