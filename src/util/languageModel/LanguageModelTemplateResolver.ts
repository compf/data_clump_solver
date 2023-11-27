import fs from 'fs';
export enum LanguageModelTemplateType {FullyRefactor="refactor_data_clump_fully"}
export class LanguageModelTemplateResolver {
    private template: string;
    private constructor(text:string) {
        this.template = text;
    }
    static fromTemplateType(templateType:LanguageModelTemplateType):LanguageModelTemplateResolver{
       const template = fs.readFileSync(`chatgpt_templates/${templateType}.template`, 'utf-8');
       return new LanguageModelTemplateResolver(template);
    }
    static fromPath(path:string):LanguageModelTemplateResolver{
        return new LanguageModelTemplateResolver(fs.readFileSync(`${path}`, 'utf-8'));
    }
    resolveTemplate(replaceMap:Map<string,string>):string{
        let result=this.template;
        replaceMap.forEach((value,key)=>{
            result=result.replace(key,value);
        })
        return result;
      
    }
}