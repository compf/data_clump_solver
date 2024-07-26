import { DataClumpDetectorContext, DataClumpRefactoringContext, UsageFindingContext } from "../../../context/DataContext";
import { UsageType, VariableOrMethodUsage } from "../../../context/VariableOrMethodUsage";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import fs from "fs";
import {resolve} from "path"
export class TextBasedReferenceFinder extends AbstractStepHandler{

    handle(step: PipeLineStepType, context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
        let dcContext=context.getByType(DataClumpDetectorContext)!;
        let allUsages:{ [key: string]: VariableOrMethodUsage[] }={}
        for(let dc of Object.values(dcContext.getDataClumpDetectionResult().data_clumps)){
            let usages:VariableOrMethodUsage[]=[]
            let lines=fs.readFileSync(resolve(context.getProjectPath(),dc.from_file_path),{encoding:"utf-8"}).split("\n")
           

            for(let i=0;i<lines.length;i++){
                let line=lines[i]
                
                if(line.includes(";")){
                  
                }
                for(let dcData of Object.values(dc.data_clump_data) ){
                    if(line.includes(dcData.name)){
                        if(line.includes((dcData as any).displayedType)){
                            usages.push(
                                {
                                    filePath:dc.from_file_path,
                                    name:dcData.name,
                                    originKey:dcData.key,
                                    range:{startLine:i,endLine:i,startColumn:line.indexOf(dcData.name),endColumn:line.indexOf(dcData.name)},
                                    symbolType:UsageType.VariableDeclared
                                }
                            );
                        }
                        else{
                            usages.push(
                                {
                                    filePath:dc.from_file_path,
                                    name:dcData.name,
                                    originKey:dcData.key,
                                    range:{startLine:i,endLine:i,startColumn:line.indexOf(dcData.name),endColumn:line.indexOf(dcData.name)},
                                    symbolType:UsageType.VariableUsed
                                }
                            );
                        }
                    }

                }
                allUsages[dc.key]=usages;

               
            }
           
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