import { DataClumpTypeContext } from "data-clumps-type-context/ignoreCoverage/DataClumpTypeContext";
import { DataClumpRefactoringContext } from "../../../context/DataContext";
import { SingleItemFilter } from "../../../util/filterUtils/SingleItemFilter";

export class SingleTypeLetterFilter implements SingleItemFilter {
  isCompatibleWithDataClump(): boolean {
    return true;
  }
  isCompatibleWithString(): boolean {
    return false;
  }
  shallRemain(data: string | DataClumpTypeContext, context: DataClumpRefactoringContext): Promise<boolean> {
      let dc=data as DataClumpTypeContext;
      //throw "cool"
      let types=Object.values(dc.data_clump_data).map(v=>v.type)
      return Promise.resolve(types.some((it)=>it.length>1));
  }
}