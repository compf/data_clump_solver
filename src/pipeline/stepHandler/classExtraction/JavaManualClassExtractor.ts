import { DataClumpTypeContext } from "data-clumps-type-context";
import {  ManualClassExtractor } from "./ManualClassExtractor";
import capitalize from "capitalize";
import path from "path";
import fs from "fs";
import { ASTBuildingContext, DataClumpRefactoringContext } from "../../../context/DataContext";
export class JavaManualClassExtractor extends ManualClassExtractor{
    createField(fieldName: string, type: string): string {
         return "\tprivate "+ type+" " + fieldName+";\n"
    }
    createGetter(fieldName: string, type: string): string {
        let capitalized=this.capitalize(fieldName)
        return "\tpublic "+type +" get"+capitalized+"(){\n"+"\t\treturn " +fieldName+";\n\t}\n"; 
    }
    getExtension(): string {
        return "java";
    }
    createSetter(fieldName: string, type: string): string {
        let capitalized=this.capitalize(fieldName)

        return "\tpublic void" +" set"+capitalized+`(${type} value)`+"{\n\t\t" +fieldName+"=value;\n\t}\n"; 
    }
    createHead(className: string,context:DataClumpTypeContext,projectPath:string,refactoring:DataClumpRefactoringContext) {
        let astContext=refactoring.getByType(ASTBuildingContext)
        let importSet:Set<string>=new Set()
        for(let imp of astContext?.getByPath(context.from_file_path)?.imports??[]){
            importSet.add(imp)
        }
        for(let imp of astContext?.getByPath(context.to_file_path)?.imports??[]){
            importSet.add(imp)
        }
        let imports=""
        for(let imp of importSet){
            if(!imp.endsWith(".*")){
                let lastPart=imp.split(".").pop()?.replace(";","")!
                let isUsed=Object.values(context.data_clump_data).some((param)=>param.type.includes(lastPart));
                if(!isUsed){
                    continue;
                }
            }   
            imports+=imp+"\n";
        }

        
       return "package "+this.getPackageName(projectPath,context)+";\n"+imports+"\npublic class "+ className+"{\n";
    }
    getPackageName(projectPath: string, context: DataClumpTypeContext): string {
        let fileContent=fs.readFileSync(path.resolve(projectPath,context.from_file_path)).toString().split("\n")
        for(let line of fileContent){
            if(line.trim().startsWith("package")){
                return line.trim().split(" ")[1].replace(";","")
            }
        }
        throw "No package name found"
    }
    createTail(): string {
        return "}"
    }
    capitalize(text:string):string{
        return capitalize(text,true)
    }
    createConstructor(className: string, types: string[], fieldNames: string[]): string {
        let text="\tpublic "+className+"(";
        let params:string[]=[]
        for(let i=0;i<types.length;i++){
            params.push(types[i]+" "+fieldNames[i]);

        }
        text+=params.join(",");
        text+="){\n";
        for(let i=0;i<types.length;i++){
            text+="\t\tthis."+fieldNames[i]+"="+fieldNames[i]+";\n";

        }
        text+="\t}\n";
        return text;
    }
   

}