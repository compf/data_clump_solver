import { AbstractMultipleFilters } from "./AbstractMultipleFilters";

export class AnyMultipleFilter extends AbstractMultipleFilters {
    async shallRemain(data, context) {
        return this.filters.some(f => f.shallRemain(data, context));
    }
}