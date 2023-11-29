import { DataClumpRefactoringContext } from "../../context/DataContext";
import { ChatGPTInterface } from "../../util/languageModel/ChatGPTInterface";
import { LanguageModelTemplateResolver, LanguageModelTemplateType } from "../../util/languageModel/LanguageModelTemplateResolver";
import { PipeLineStep, PipeLineStepType } from "../PipeLineStep";
import { AbstractStepHandler } from "./AbstractStepHandler";
import fs from "fs"
import { files } from "node-dir"
import path from "path";
export class DetectAndRefactorWithLanguageModelStep extends AbstractStepHandler {
    async handle(context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
        let templateResolver = LanguageModelTemplateResolver.fromTemplateType(LanguageModelTemplateType.FullyRefactor)
        let api = new ChatGPTInterface()
        api.prepareMessage(templateResolver.resolveTemplate({
            "${programming_language}": "Java",
        }));

        let projectPath = context.getProjectPath();
        let allFiles = []
        this.getRelevantFilesRec(projectPath, allFiles)
        for (let f of allFiles) {
            let content = fs.readFileSync(f, { encoding: "utf-8" })
            api.prepareMessage(content)
        }

        let response=await api.sendMessages(true)
        console.log(response)
        return Promise.resolve(context);
    }


    private shallIgnore(filePath: string): boolean { // Add shallIgnore method
        return !filePath.endsWith(".java")
    }
    /**
* Recursively traverse through the directory and find all relavant files
* @param baseDir the current directory to enumerate the files there
* @param resultArray will be filled during the recursion to store all relevant files
*/
    private getRelevantFilesRec(baseDir: string, resultArray: string[]): void {
        let entries = fs.readdirSync(baseDir, { withFileTypes: true });
        for (let entry of entries) {
            let fullname = path.join(baseDir, entry.name);
            if (entry.isDirectory()) {
                this.getRelevantFilesRec(fullname, resultArray);
            } else {
                if (this.shallIgnore(fullname)) {
                    continue;
                }
                resultArray.push(fullname);
            }
        }
    }
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.ASTGeneration, PipeLineStep.DataClumpDetection, PipeLineStep.NameFinding, PipeLineStep.ClassExtraction, PipeLineStep.UsageFinding, PipeLineStep.Refactoring]
    }

}