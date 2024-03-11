import { resolveFromName } from "../../../config/Configuration";
import { DataClumpRefactoringContext, FileFilteringContext } from "../../../context/DataContext";
import { getRelevantFilesRec } from "../../../util/Utils";
import { RankSampler, Ranker } from "../../../util/filterUtils/Ranker";
import { SingleItemFilter } from "../../../util/filterUtils/SingleItemFilter";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";

export class FileFilterHandler extends AbstractStepHandler {
    private filter?: SingleItemFilter = undefined
    private ranker?: Ranker = undefined
    private rankSampler: RankSampler;
    async handle(step:PipeLineStepType,context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
        if (!this.ranker?.isCompatibleWithString()) {
            throw new Error("ranker is not compatible with string")
        }
        let originalPaths: string[] = []
        let filteredPaths: string[] = []
        getRelevantFilesRec(context.getProjectPath(), originalPaths, null)
        if (this.filter) {
            for (let p of originalPaths) {
                if (await this.filter.shallRemain(p, context)) {
                    filteredPaths.push(p)
                }

            }
        }
        else {
            filteredPaths = originalPaths
        }
        if (this.ranker) {
            if(!this.ranker.isCompatibleWithString()){
                throw new Error("ranker is not compatible with string")
            }
            filteredPaths = await this.rankSampler.rank(this.ranker, filteredPaths, context) as string[]
        }
        let newContext = this.buildFilterContextFromPaths(filteredPaths, context)
        return context.buildNewContext(newContext)

    }
    private buildFilterContextFromPaths(filteredPaths: string[], context: DataClumpRefactoringContext): FileFilteringContext {
        let includes: string[] = []
        let excludes: string[] = []
        for (let path of filteredPaths) {
            includes.push(path)
        }
        let projectPath = context.getProjectPath()
        if (projectPath.endsWith("/")) {
            projectPath += "*"
        }
        else {
            projectPath += "/*"
        }
        excludes.push(projectPath)
        return new FileFilteringContext(includes, excludes)
    }
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.FileFiltering]
    }
    constructor(args: { filterName?: string, rankerName?: string, rankThreshold?: number, sign?: number }) {
        super()
        this.rankSampler = new RankSampler({ rankThreshold: args.rankThreshold, rankSign: args.sign })
        if (args.rankerName) {
            this.ranker = resolveFromName(args.rankerName)
        }

        if (args.filterName) {
            this.filter = resolveFromName(args.filterName)
        }
    }
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
        createdContexts.add(FileFilteringContext.name)
    }

}