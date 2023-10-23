import { ManualClassExtractor } from "./ManualClassExtractor";

export class JavaManualClassExtractor extends ManualClassExtractor{
    createField(fieldName: string, type: string): string {
         return "private "+ type+" " + fieldName+";\n"
    }
    createGetter(fieldName: string, type: string): string {
        return "public "+type +" get"+fieldName.toUpperCase()+"(){\n"+"return " +fieldName+";\n}\n"; 
    }
    createSetter(fieldName: string, type: string): string {
        return "public void" +" set"+fieldName.toUpperCase()+`(${type} value)`+"{\n" +fieldName+"=value;\n}\n"; 
    }
    createHead(className: string) {
       return "public class "+ className+"{\n";
    }
    createTail(): string {
        return "}"
    }
    constructor(){
        super();
    }

}