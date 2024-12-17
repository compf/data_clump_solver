import { AbstractMultipleFilters } from "./AbstractMultipleFilters";

/**
 * Only return true for shall remain if any filter returns true
 */
export class AnyMultipleFilter extends AbstractMultipleFilters {
    async shallRemain(data, context) {
        for(let f of this.filters){
            if(await f.shallRemain(data, context)){
                return true;
            }
        }
        return false;
    }
}