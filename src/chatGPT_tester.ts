
import fs from "fs"
import { files } from "node-dir"
import path from "path";
import { createHash } from 'node:crypto'
import { ChatGPTInterface } from "./util/languageModel/ChatGPTInterface";
import { LanguageModelTemplateResolver, LanguageModelTemplateType } from "./util/languageModel/LanguageModelTemplateResolver";
async function main(){
    if(process.argv.length<3){
        throw new Error("Please provide the path to the template file")
    }
    let templateResolver = LanguageModelTemplateResolver.fromPath(process.argv[2])
    let api = new ChatGPTInterface()
    let input=templateResolver.resolveTemplate({
        "${programming_language}": "Java",
        "${examples}":fs.readFileSync("chatgpt_templates/DataClumpExamples.java", { encoding: "utf-8" })
    })
    api.prepareMessage(input);
    
    let projectPath = "./javaTest";
    let allFiles = []
    getRelevantFilesRec(projectPath, allFiles)
    for (let f of allFiles) {
        let content = fs.readFileSync(f, { encoding: "utf-8" })
        api.prepareMessage(content)
    }
    
    let response= (await api.sendMessages(false)).join("\n")
    let outDir=`chatGPT_results/${sha256(input)}`
    fs.mkdirSync(outDir,{recursive:true})
    fs.writeFileSync(`${outDir}/${sha256(response)}.txt`,response)
    fs.writeFileSync(`${outDir}/query.txt`,input)
    console.log(response)
}
   /**
* Recursively traverse through the directory and find all relavant files
* @param baseDir the current directory to enumerate the files there
* @param resultArray will be filled during the recursion to store all relevant files
*/
function getRelevantFilesRec(baseDir: string, resultArray: string[]): void {
    let entries = fs.readdirSync(baseDir, { withFileTypes: true });
    for (let entry of entries) {
        let fullname = path.join(baseDir, entry.name);
        if (entry.isDirectory()) {
            getRelevantFilesRec(fullname, resultArray);
        } else {
            if (shallIgnore(fullname)) {
                continue;
            }
            resultArray.push(fullname);
        }
    }
}
function shallIgnore(filePath: string): boolean { // Add shallIgnore method
    return !filePath.endsWith(".java")
}

function sha256(content:string):string {  
    return createHash('sha256').update(content).digest('hex')
}
  main()
