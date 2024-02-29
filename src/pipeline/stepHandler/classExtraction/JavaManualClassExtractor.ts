import { DataClumpTypeContext } from "data-clumps-type-context";
import { JavaAlwaysFromLocationProvider, ManualClassExtractor } from "./ManualClassExtractor";
import capitalize from "capitalize";
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

        return "\tpublic void" +" set"+capitalized+`(${type} value)`+"{\n\t\t\t" +fieldName+"=value;\n\t}\n"; 
    }
    createHead(className: string,context:DataClumpTypeContext,projectPath:string) {
       return "package "+this.locationProvider.getPackageName(projectPath,context)+";\npublic class "+ className+"{\n";
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
    constructor(){
        super();
    }

}