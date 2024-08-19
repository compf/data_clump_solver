import { FileFilterHandler } from './FileFilterHandler';
import { resolveFromConcreteName } from "../../../config/Configuration";
import { DataClumpRefactoringContext, FileFilteringContext, GitRepositoryContext } from "../../../context/DataContext";
import { getRelevantFilesRec } from "../../../util/Utils";
import { Metric } from "../../../util/filterUtils/Metric";
import { RankSampler } from "../../../util/filterUtils/Ranker";
import { SingleItemFilter } from "../../../util/filterUtils/SingleItemFilter";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
export class RecentlyChangedFilesStephandler extends  FileFilterHandler{
   private upTo:number=50;
    async handle(step: PipeLineStepType, context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
        context=await super.handle(step, context, params);
        let gitContext=context.getByType(GitRepositoryContext) as GitRepositoryContext
        let filteringContext=context.getByType(FileFilteringContext)! as FileFilteringContext
        let result=await gitContext.getRecentlyChangedFiles(this.upTo,filteringContext)
        filteringContext.includeGlobs=result.map((value)=>".*"+value)
        filteringContext.customFilters=true
        return filteringContext
    }

}