import { DataClumpTypeContext } from "data-clumps-type-context";
import { DataClumpRefactoringContext } from "../../context/DataContext";
import { SingleItemFilter } from "./SingleItemFilter";
import { PathOrDataClump } from "./Metric";
import { shallIgnore } from "../Utils";

export class GlobFilter implements SingleItemFilter{
    private glob: string
    pr
   async shallRemain(data:PathOrDataClump, context: DataClumpRefactoringContext): Promise<boolean> {
        let path=data as string
        let m=path.match(this.glob);
        return m!=null

    }
    isCompatibleWithDataClump(): boolean {
        return false;
    }
    isCompatibleWithString(): boolean {
        return true
    }
    constructor(args: {glob:string}) {
        this.glob=args.glob
    }

}