import { DataClumpTypeContext } from "data-clumps-type-context";
import { SingleItemFilter } from "../../../util/filterUtils/SingleItemFilter";
import { DataClumpRefactoringContext } from "../../../context/DataContext";
import { checkPath } from "../../../util/Utils";

export class ByPathFilter implements SingleItemFilter{
    private  include: string[] = []
    private  exclude: string[] = []
    shallRemain(data: string | DataClumpTypeContext, context: DataClumpRefactoringContext): Promise<boolean> {
        let d=(data as DataClumpTypeContext)
        let check= checkPath(d.to_file_path,this.include,this.exclude,true) || checkPath(d.to_file_path,this.include,this.exclude,true)
        return Promise.resolve( check);
    }
    isCompatibleWithDataClump(): boolean {
       return true;
    }
    isCompatibleWithString(): boolean {
        return false
    }
    constructor(args:{include:string[],exclude:string[]}){
        this.include=args.include
        this.exclude=args.exclude
        
    }
    
}