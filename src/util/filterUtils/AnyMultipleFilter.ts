import { AbstractMultipleFilters } from "./AbstractMultipleFilters";

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