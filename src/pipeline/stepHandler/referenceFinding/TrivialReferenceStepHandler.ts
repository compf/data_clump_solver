import { DataClumpDetectorContext, DataClumpRefactoringContext, UsageFindingContext } from "../../../context/DataContext";
import { UsageType, VariableOrMethodUsage } from "../../../context/VariableOrMethodUsage";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";

export class TrivialReferenceStepHandler extends AbstractStepHandler{
    handle(step: PipeLineStepType, context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
        let dcContext=context.getByType(DataClumpDetectorContext)!;
        let allUsages:{ [key: string]: VariableOrMethodUsage[] }={}
        for(let dc of Object.values(dcContext.getDataClumpDetectionResult().data_clumps)){
            let usages:VariableOrMethodUsage[]=[]
            for(let dcData of Object.values(dc.data_clump_data)){
                usages.push(
                    {
                        filePath:dc.from_file_path,
                        name:dcData.name,
                        originKey:dcData.key,
                        range:dcData.position,
                        symbolType:UsageType.VariableDeclared
                    }
                );
                usages.push(
                    {
                        filePath:dc.to_file_path,
                        name:dcData.to_variable.name,
                        originKey:dcData.to_variable.key,
                        range:dcData.to_variable.position,
                        symbolType:UsageType.VariableUsed
                    }
                );
            }
            allUsages[dc.key]=usages;
        }
        console.log(allUsages)
        return Promise.resolve(context.buildNewContext(new UsageFindingContext(allUsages)));
    }
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.ReferenceFinding]
    }
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
       createdContexts.add(UsageFindingContext.name)
    }

}