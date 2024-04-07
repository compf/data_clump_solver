import { DataClumpDetectorContext, DataClumpRefactoringContext, FileFilteringContext, UsageFindingContext } from "../../../context/DataContext";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";

export class OnlyDataClumpRelevantFilesStepHandler extends AbstractStepHandler {
    handle(step: PipeLineStepType, context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
        let detectionContext = context.getByType(DataClumpDetectorContext) as DataClumpDetectorContext
        let usageFindingContext=context.getByType(UsageFindingContext) as UsageFindingContext
        let relevantFiles = new Set<string>()
        for (let dc of Object.values(detectionContext.getDataClumpDetectionResult().data_clumps)) {
            relevantFiles.add(dc.from_file_path)
            relevantFiles.add(dc.to_file_path)
            for(let usage of usageFindingContext.getUsages().get(dc.key)!){
                relevantFiles.add(usage.filePath)
            }
        }
        let includes: string[] =Array.from(relevantFiles)
        return Promise.resolve( context.buildNewContext(new FileFilteringContext(includes, [])))
    }
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
        createdContexts.add(FileFilteringContext.name)
    }
    addAditionalContextRequirementNames(pipeLineStep: PipeLineStepType, requirements: Set<string>): void {
        requirements.add(DataClumpDetectorContext.name)
        requirements.add(UsageFindingContext.name)
    }
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.SecondFileFiltering]
    }
}