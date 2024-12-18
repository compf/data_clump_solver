import { DataClumpTypeContext } from "data-clumps-type-context"
import { ASTBuildingContext, DataClumpRefactoringContext } from "../../../context/DataContext"
import { AST_Method } from "../../../context/AST_Type"
import { Metric } from "../../../util/filterUtils/Metric"
import { assignOrResolve } from "../../../config/Configuration"

/**
 * Returns the size of the data clump
 */
export class DataClumpSizeMetric implements Metric{
    constructor(args:{normalize?:boolean}){
        assignOrResolve(this,args,{normalize:false})
    }
    private normalize:boolean=false
    evaluate(data: string | DataClumpTypeContext, context: DataClumpRefactoringContext): Promise<number> {
    
        let dc=data as DataClumpTypeContext
        let dataClumpSize=Object.keys(dc.data_clump_data).length;
        if(this.normalize){
            let astContext=context.getByType(ASTBuildingContext) as ASTBuildingContext;
            let fromClass=astContext.findInPath(dc.from_file_path,dc.from_class_or_interface_key)!
            let toClass=astContext.findInPath(dc.to_file_path,dc.to_class_or_interface_key)!
            let fromMethod:AST_Method|null=null;
            let toMethod:AST_Method|null=null;
            let total=0;
            if(dc.from_method_key){
                fromMethod=fromClass.methods[dc.from_method_key]
                total+=fromMethod?.parameters.length;
            }
            else{
                total+=Object.keys(fromClass.fields).length
            }
            if(dc.to_method_key){
                toMethod=toClass.methods[dc.to_method_key]
                total+=toMethod.parameters.length;
            }
            else{
                total+=Object.keys(toClass.fields).length
            }
            return Promise.resolve(dataClumpSize/total)

        }
        return Promise.resolve(dataClumpSize)
    }
    isCompatibleWithDataClump(): boolean {
        return true;
    }
    isCompatibleWithString(): boolean {
        return false;
    }
}