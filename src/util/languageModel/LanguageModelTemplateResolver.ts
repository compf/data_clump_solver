import fs from 'fs';
export enum LanguageModelTemplateType {
    FindDataClumps="find_data_clump_fully",
    FullyRefactor="refactor_data_clump_fully",
    SuggestName="suggest_name",
}
export const FILE_REPLACE_START="%{";
export const IS_OPTIONAL_REFERENCE="?}"
export const TEMPLATE_EXTENSION=".template"
export class LanguageModelTemplateResolver {
    private replaceMap:{[key:string]:string}
    constructor(replaceMap: {[key:string]:string}) {
        this.replaceMap = replaceMap;
    }
    resolveFromTemplateType(templateType:LanguageModelTemplateType,additionalReplacements?:{[key:string]:string}|undefined):string{
        const template = fs.readFileSync(`chatgpt_templates/${templateType}.template`, 'utf-8');
        return this.resolveTemplate(template,additionalReplacements);
    }
    resolveTemplate(text:string,additionalReplacements?:{[key:string]:string}|undefined):string{
        let result=text
        if(additionalReplacements==undefined){
            additionalReplacements={}
        }
        Object.assign(additionalReplacements,this.replaceMap)
        for(let key of Object.keys(additionalReplacements)){
            if(key.startsWith(FILE_REPLACE_START)){
                let fileContent=fs.readFileSync(additionalReplacements[key], { encoding: "utf-8" })
                if(additionalReplacements[key].endsWith(TEMPLATE_EXTENSION)){
                    fileContent=this.resolveTemplate(fileContent,additionalReplacements);
                }
                result=result.replace(key,fileContent);
            }
            else{
                result=result.replace(key,this.replaceMap[key]);

            }
        }
        result=this.resolveRemainingReferences(result);
        return result;
      
    }
    resolveRemainingReferences(text:string):string{
        if(text.match(/(\$|%){(\w|_)+}/gm)){
            throw "Not all references are resolved"
        }
        while(text.match(/(\$|%){(\w|_)+\?}/gm)){
            text=text.replace(/(\$|%){(\w|_)+\?}/gm,"");
        }
        return text;
    }
}