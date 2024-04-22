import { CodeObtainingContext } from "./context/DataContext";
import { LanguageModelDetectOrRefactorHandler } from "./pipeline/stepHandler/languageModelSpecific/LanguageModelDetectOrRefactorHandler";
import { LargeLanguageModelHandler } from "./pipeline/stepHandler/languageModelSpecific/LargeLanguageModelHandlers";
import fs from "fs"
 function main(){
    let handler=new LanguageModelDetectOrRefactorHandler({handlers:[]});
    let content=JSON.parse(fs.readFileSync("stuff/test.json",{encoding:"utf-8"}));
    let context=new CodeObtainingContext("/home/compf/data/uni/master/sem4/github_projects/OpenSearch/");
    handler.parse_piecewise_output(content,context)
}
if(require.main===module){
    main()
}