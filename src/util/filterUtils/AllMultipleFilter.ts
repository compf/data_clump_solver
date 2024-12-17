import { DataClumpTypeContext } from "data-clumps-type-context";
import { AbstractMultipleFilters } from "./AbstractMultipleFilters";

/**
 * Only return true for shall remain if all filters return true
 */
export class AllMultipleFilter extends AbstractMultipleFilters {
   
    async shallRemain(data, context) {
        for(let f of this.filters){
            if(!await f.shallRemain(data, context)){
                return false;
            }
        }
       return true
    }
  
}