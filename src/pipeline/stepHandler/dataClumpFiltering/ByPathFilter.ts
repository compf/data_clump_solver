import { DataClumpTypeContext } from "data-clumps-type-context";
import { SingleItemFilter } from "../../../util/filterUtils/SingleItemFilter";
import { DataClumpRefactoringContext, FileFilteringContext } from "../../../context/DataContext";
import { shallIgnore } from "../../../util/Utils";
/**
 * Use inclusion and exclusion patterns on paths to filter data clumps
 */
export class ByPathFilter implements SingleItemFilter{
    private  include: string[] = []
    private  exclude: string[] = []
    shallRemain(data: string | DataClumpTypeContext, context: DataClumpRefactoringContext): Promise<boolean> {
        let d=(data as DataClumpTypeContext)
        let filterContext=new FileFilteringContext(this.include,this.exclude)
        let check= !(shallIgnore(d.to_file_path,filterContext) || shallIgnore(d.to_file_path,filterContext))
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