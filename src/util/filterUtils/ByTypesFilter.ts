import { DataClumpTypeContext } from "data-clumps-type-context/ignoreCoverage/DataClumpTypeContext";
import { DataClumpRefactoringContext } from "../../context/DataContext";
import { SingleItemFilter } from "./SingleItemFilter";

export class ByTypesFilter implements SingleItemFilter{
    private types:string[]=[]
    shallRemain(data: string | DataClumpTypeContext, context: DataClumpRefactoringContext): Promise<boolean> {
        let dc =data as DataClumpTypeContext
        let types=Object.values(dc.data_clump_data).map((it)=>(it as any).displayedType).sort()

        if(this.types.length==types.length){
            for(let i=0;i<types.length;i++){
                if(types[i]!=this.types[i]){
                    console.log("compare",this.types[i],types[i])
                }
            }
        }
        
        if(types==this.types){
            console.log(types,this.types);
            throw "test"
        }
        return Promise.resolve(this.types==types)
    }
    isCompatibleWithDataClump(): boolean {
        return true;
    }
    isCompatibleWithString(): boolean {
       return false;
    }
    constructor(args:{
        types:string[]
    }){
        this.types=args.types.sort()
    }

}