import { DataClumpTypeContext } from "data-clumps-type-context/ignoreCoverage/DataClumpTypeContext";
import { ASTBuildingContext, DataClumpRefactoringContext } from "../../context/DataContext";
import { SingleItemFilter } from "./SingleItemFilter";
import { AST_Class, AST_Method, AST_Type } from "../../context/AST_Type";

export class NoAbstractClassOrInterfaceFilter implements SingleItemFilter {
    shallRemain(data: string | DataClumpTypeContext, context: DataClumpRefactoringContext): Promise<boolean> {
        let astContext = context.getByType(ASTBuildingContext);
        if (typeof data === "string") {
            throw new Error("Data is not a data clump")
        }
        let dataClump = data as DataClumpTypeContext
        if (astContext == null) {
            throw new Error("AST context not found")
        }
        let dataClumpParts = [
            { path: dataClump.from_file_path, method: dataClump.from_method_key },


            { path: dataClump.to_file_path, method: dataClump.to_method_key }]
        for (let part of dataClumpParts) {
            let item = astContext.getByPath(part.path) as AST_Class
            if (!item) {
                return Promise.resolve(false)
            }
            if(part.method){
                let method=item.methods[part.method];
                if(method)
                item=this.getMostSuperClassOrInterfaceWithMethod(astContext,item,method);
            }

            if (item && item.type == "interface" || item && item.modifiers.includes("ABSTRACT")) {
                return Promise.resolve(false)
            }
        }
        return Promise.resolve(true)
    }
    private generateMethodSignature(astMethod: AST_Method): string {
        let result = astMethod.name + "("
        for (let param of astMethod.parameters) {
            result += param.type + ","
        }
        return result + ")"
    }
    private getMostSuperClassOrInterfaceWithMethod(astContext:ASTBuildingContext,astClass:AST_Class,mandatoryIncludedMethod:AST_Method):AST_Class{
        let  queue:string[]=[astClass.file_path];
        let methodKey=this.generateMethodSignature(mandatoryIncludedMethod);
        let superClass=astClass
        while(queue.length>0){
            let current=queue.pop() as string;
            let currentClass=astContext.getByPath(current) as AST_Class;
            for(let m of Object.values(currentClass.methods)){
                if(this.generateMethodSignature(m)==methodKey){
                    superClass=currentClass;
                    for(let extends_ of currentClass.extends_){
                        let path=astContext.getCorrectPath(extends_);
                        if(path!=null)
                        queue.push(path);
                    }
                    for(let implements_ of currentClass.implements_){
                        let path=astContext.getCorrectPath(implements_);
                        if(path!=null)
                        queue.push(path);
                    }
                }
            }
          
        }
        return superClass;
    }
    isCompatibleWithString(): boolean {
        return false
    }
    isCompatibleWithDataClump(): boolean {
        return true;
    }
}