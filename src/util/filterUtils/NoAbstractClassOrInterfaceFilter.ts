import { DataClumpTypeContext } from "data-clumps-type-context/ignoreCoverage/DataClumpTypeContext";
import { ASTBuildingContext, DataClumpRefactoringContext } from "../../context/DataContext";
import { SingleItemFilter } from "./SingleItemFilter";
import { AST_Class, AST_Type } from "../../context/AST_Type";

export class NoAbstractClassOrInterfaceFilter implements SingleItemFilter {
    shallRemain(data: string | DataClumpTypeContext, context: DataClumpRefactoringContext): Promise<boolean> {
        let astContext=context.getByType(ASTBuildingContext);
        if(typeof data==="string"){
            throw new Error("Data is not a data clump")
        }
        let dataClump=data as DataClumpTypeContext
        if(astContext==null){
            throw new Error("AST context not found")
        }
        let paths=[dataClump.from_file_path,dataClump.to_file_path]
        for(let key of paths){
            let item=astContext.getByPath(key) as AST_Class
            if(item.type=="interface"|| item.modifiers.includes("ABSTRACT")){
                return Promise.resolve(false)
            }
        }
        return Promise.resolve(true)
    }
    isCompatibleWithString(): boolean {
        return false
    }
    isCompatibleWithDataClump(): boolean {
        return true;
    }
}