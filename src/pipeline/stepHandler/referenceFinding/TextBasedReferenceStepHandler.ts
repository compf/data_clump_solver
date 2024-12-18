import { DataClumpTypeContext } from "data-clumps-type-context";
import { DataClumpDetectorContext, DataClumpRefactoringContext, UsageFindingContext } from "../../../context/DataContext";
import { UsageType, VariableOrMethodUsage } from "../../../context/VariableOrMethodUsage";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import fs from "fs";
import { resolve, basename, dirname, relative } from "path"
import { getRelevantFilesRec, makeUnique, nop } from "../../../util/Utils";
import { getDataClumpThreshold } from "../../../config/Configuration";
type IncludedFiles = "data_clump" | "folder" | "folderRecursive"

/** 
 * find reference by only looking at the raw names without considering the scope
 *  
 */
export class TextBasedReferenceStepHandler extends AbstractStepHandler {

    private fileContentCache: { [path: string]: string } = {}
    private includedFiles: IncludedFiles = "folder"
    private processedFiles: { [path: string]: boolean } = {}
    private getFilesToSearch(dc: DataClumpTypeContext, context: DataClumpRefactoringContext): string[] {
        let result = makeUnique([resolve(context.getProjectPath(), dc.from_file_path), resolve(context.getProjectPath(), dc.to_file_path)])
        if (result.every((it) => it in this.processedFiles)) {
            return []
        }
        if (this.includedFiles == "folder") {
            for (let r of result) {
                let dir = dirname(r)
                let files = fs.readdirSync(dir, { withFileTypes: true }).map((it) => resolve(dir, it.name))
                for (let file of files) {
                    if(fs.statSync(file).isDirectory()){
                        continue;
                    }
                    result.push(file);
                    this.processedFiles[file] = true
                    if (!(file in this.fileContentCache)) {
                        this.fileContentCache[file] = fs.readFileSync(file, { encoding: "utf-8" })
                    }
                }
                result=makeUnique(result)

            }
        }
        else if (this.includedFiles == "folderRecursive") {

            for (let r of result) {
                let dir = dirname(r)
                let files: string[] = []
                getRelevantFilesRec(dir, files, null)
                result.push(...files)
                for (let file of files) {
                    this.processedFiles[file] = true
                    if (!(file in this.fileContentCache)) {
                        this.fileContentCache[file] = fs.readFileSync(file, { encoding: "utf-8" })
                    }
                }

            }
        }
        return result
    }
    
    handle(step: PipeLineStepType, context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
        let dcContext = context.getByType(DataClumpDetectorContext)!;
        let allUsages: { [key: string]: VariableOrMethodUsage[] } = {}
        for (let dc of Object.values(dcContext.getDataClumpDetectionResult().data_clumps)) {
            let usages: VariableOrMethodUsage[] = []
            let files = this.getFilesToSearch(dc, context)
            let tempUsages: VariableOrMethodUsage[] = []
            let counter=0
            for (let f of files) {
                let lines = this.fileContentCache[f].split("\n")


                for (let i = 0; i < lines.length; i++) {
                    let line = lines[i]

                   
                   
                    for (let dcData of Object.values(dc.data_clump_data)) {
                        if (line.match("\\W"+dcData.name+"\\W")) {
                            if(!(f.includes(dc.from_file_path) || f.includes(dc.to_file_path))){
                                nop()
                            }
                            if (line.includes((dcData as any).displayedType)) {
                                tempUsages.push(
                                    {
                                        filePath: relative(context.getProjectPath(), f),
                                        name: dcData.name,
                                        originKey: dcData.key,
                                        range: { startLine: i, endLine: i, startColumn: line.indexOf(dcData.name), endColumn: line.indexOf(dcData.name) },
                                        symbolType: UsageType.VariableDeclared
                                    }
                                );
                            }
                            else {
                                tempUsages.push(
                                    {
                                        filePath: relative(context.getProjectPath(), f),
                                        name: dcData.name,
                                        originKey: dcData.key,
                                        range: { startLine: i, endLine: i, startColumn: line.indexOf(dcData.name), endColumn: line.indexOf(dcData.name) },
                                        symbolType: UsageType.VariableUsed
                                    }
                                );
                            }
                            counter++;
                        }
                        
                    }

                }
                if(counter>=getDataClumpThreshold(dc.type)){
                    usages.push(...tempUsages)
                }
              


            }
            allUsages[dc.key] = usages;

        }
        return Promise.resolve(context.buildNewContext(new UsageFindingContext(allUsages)));
    }
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.ReferenceFinding]
    }
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
        createdContexts.add(UsageFindingContext.name)
    }

}