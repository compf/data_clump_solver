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
        const template = fs.readFileSync(`chatGPT_templates/${templateType}.template`, 'utf-8');
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
                    let otherReplacements=Object.assign({},additionalReplacements)
                    delete otherReplacements[key]
                    let otherResolver=new LanguageModelTemplateResolver(otherReplacements)

                    fileContent=otherResolver.resolveTemplate(fileContent,otherReplacements);
                }
                result=result.replaceAll(key,fileContent);
            }
            else{
                result=result.replaceAll(key,additionalReplacements[key]);

            }
        }
        result=this.resolveRemainingReferences(result);
        return result;
      
    }
    resolveRemainingReferences(text:string):string{
        let matches=text.match(/(\$|%){(\w|_)+}/gm)
        if(matches){
           console.log("TEX",text) 
            console.log(matches)
            throw "Not all references are resolved "
        }
        while(text.match(/(\$|%){(\w|_)+\?}/gm)){
            text=text.replace(/(\$|%){(\w|_)+\?}/gm,"");
        }
        return text;
    }
}