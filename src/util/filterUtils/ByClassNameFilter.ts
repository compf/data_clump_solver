import { DataClumpTypeContext } from "data-clumps-type-context/ignoreCoverage/DataClumpTypeContext";
import { DataClumpRefactoringContext } from "../../context/DataContext";
import { SingleItemFilter } from "./SingleItemFilter";

export class ByClassNameFilter implements SingleItemFilter{
    private name?:string
    shallRemain(data: string | DataClumpTypeContext, context: DataClumpRefactoringContext): Promise<boolean> {
        let d=(data as DataClumpTypeContext)
        return Promise.resolve( d.from_class_or_interface_name==this.name && d.to_class_or_interface_name==this.name);
    }
    isCompatibleWithDataClump(): boolean {
       return true;
    }
    isCompatibleWithString(): boolean {
        return false
    }
    constructor(args:{name:string}){
        this.name=args.name
    }
    
}