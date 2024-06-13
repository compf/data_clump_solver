import { DataClumpTypeContext } from "data-clumps-type-context";
import { AbstractMultipleFilters } from "./AbstractMultipleFilters";

export class AllMultipleFilter extends AbstractMultipleFilters {
   
    async shallRemain(data, context) {
        let result=true;
        for(let f of this.filters){
            let b=await f.shallRemain(data,context)
            console.log("all",f.constructor.name,b)
            result=result &&  b;
        }
        return result;
    }
  
}