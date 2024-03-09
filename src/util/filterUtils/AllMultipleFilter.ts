import { AbstractMultipleFilters } from "./AbstractMultipleFilters";

export class AllMultipleFilter extends AbstractMultipleFilters {
   
    async shallRemain(data, context) {
        return this.filters.every(f => f.shallRemain(data, context));
    }
  
}