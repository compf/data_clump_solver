import { DataClumpTypeContext } from "data-clumps-type-context";
import { JavaAlwaysFromLocationProvider, ManualClassExtractor } from "./ManualClassExtractor";
import capitalize from "capitalize";
export class JavaManualClassExtractor extends ManualClassExtractor{
    createField(fieldName: string, type: string): string {
         return "private "+ type+" " + fieldName+";\n"
    }
    createGetter(fieldName: string, type: string): string {
        let capitalized=this.cpaitalize(fieldName)
        return "public "+type +" get"+capitalized+"(){\n"+"return " +fieldName+";\n}\n"; 
    }
    getExtension(): string {
        return "java";
    }
    createSetter(fieldName: string, type: string): string {
        let capitalized=this.cpaitalize(fieldName)

        return "public void" +" set"+capitalized+`(${type} value)`+"{\n" +fieldName+"=value;\n}\n"; 
    }
    createHead(className: string,context:DataClumpTypeContext,projectPath:string) {
       return "package "+this.locationProvider.getPackageName(projectPath,context)+";\npublic class "+ className+"{\n";
    }
    createTail(): string {
        return "}"
    }
    cpaitalize(text:string):string{
        return capitalize(text)
    }
    createConstructor(className: string, types: string[], fieldNames: string[]): string {
        let text="public "+className+"(";
        let params:string[]=[]
        for(let i=0;i<types.length;i++){
            params.push(types[i]+" "+fieldNames[i]);

        }
        text+=params.join(",");
        text+="){\n";
        for(let i=0;i<types.length;i++){
            text+="this."+fieldNames[i]+"="+fieldNames[i]+";\n";

        }
        text+="}\n";
        return text;
    }
    constructor(){
        super();
    }

}