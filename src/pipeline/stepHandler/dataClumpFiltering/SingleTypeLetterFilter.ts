import { DataClumpTypeContext } from "data-clumps-type-context/ignoreCoverage/DataClumpTypeContext";
import { DataClumpRefactoringContext } from "../../../context/DataContext";
import { SingleItemFilter } from "../../../util/filterUtils/SingleItemFilter";

/**
 * Filters data clumps that have a type with more than one letter
 */
export class SingleTypeLetterFilter implements SingleItemFilter {
  isCompatibleWithDataClump(): boolean {
    return true;
  }
  isCompatibleWithString(): boolean {
    return false;
  }
  shallRemain(data: string | DataClumpTypeContext, context: DataClumpRefactoringContext): Promise<boolean> {
      let dc=data as DataClumpTypeContext;
      let types=Object.values(dc.data_clump_data).map(v=>v.type)
      return Promise.resolve(types.some((it)=>it.length>1));
  }
}