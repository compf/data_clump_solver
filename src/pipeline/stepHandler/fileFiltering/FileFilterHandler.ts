import { resolveFromConcreteName } from "../../../config/Configuration";
import { DataClumpRefactoringContext, FileFilteringContext } from "../../../context/DataContext";
import { getRelevantFilesRec } from "../../../util/Utils";
import { Metric } from "../../../util/filterUtils/Metric";
import { RankSampler } from "../../../util/filterUtils/Ranker";
import { SingleItemFilter } from "../../../util/filterUtils/SingleItemFilter";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import fs from "fs"
import path from "path"
export class FileFilterHandler extends AbstractStepHandler {
    private filter?: SingleItemFilter = undefined
    private metric?: Metric = undefined
    private rankSampler: RankSampler;
    private include?: string[] = undefined
    private exclude?: string[] = undefined
    private useGitIgnore=false
    async handle(step:PipeLineStepType,context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
        if ( this.metric!=undefined && !this.metric?.isCompatibleWithString()) {
            throw new Error("ranker is not compatible with string")
        }
        if(this.include || this.exclude){
            throw "include and exclude are not supported"
            let paths=[]
            getRelevantFilesRec(context.getProjectPath(), paths, new FileFilteringContext(this.include??[],this.exclude??[]))
            //throw "hallo "+paths.length
            return context.buildNewContext(new FileFilteringContext(this.include??[],this.exclude??[]))
        }
        else if(this.useGitIgnore && fs.existsSync(context.getProjectPath()+"/.gitignore")){
            throw "include and exclude are not supported"

            let gitIgnore=fs.readFileSync(context.getProjectPath()+"/.gitignore").toString()
            let lines=gitIgnore.split("\n")
            let includes: string[] = []
            let excludes: string[] = []
            for(let line of lines){
                if(line.startsWith("#")){
                    continue
                }
                if(line.trim()==""){
                    continue
                }
                if(line.startsWith("!")){
                    includes.push(line.substring(1))
                }
                else{
                    excludes.push(line)
                }
            }
            return context.buildNewContext(new FileFilteringContext(includes,excludes))
        }
        let originalPaths: string[] = []
        let filteredPaths: string[] = []
        let filterContext=new FileFilteringContext(this.include??[],this.exclude??[])
        getRelevantFilesRec(context.getProjectPath(), originalPaths, filterContext)
        if (this.filter) {
            for (let p of originalPaths) {
                if (await this.filter!!.shallRemain(p, context)) {
                    filteredPaths.push(p)
                }

            }
        }
        else {
            filteredPaths = originalPaths
        }
        if (this.metric) {
           
            filteredPaths = await this.rankSampler.rank(this.metric!!, filteredPaths, context) as string[]
        }
        let newContext = this.buildFilterContextFromPaths(filteredPaths, context)
        return context.buildNewContext(newContext)

    }
    private buildFilterContextFromPaths(filteredPaths: string[], context: DataClumpRefactoringContext): FileFilteringContext {
        let includes: string[] = []
        let excludes: string[] = []
        for (let myPath of filteredPaths) {
            includes.push("*"+path.relative(context.getProjectPath(), myPath))
        }
        let projectPath = context.getProjectPath()
        if (projectPath.endsWith("/")) {
            projectPath += "*"
        }
        else {
            projectPath += "/*"
        }
        //excludes.push(projectPath)
        return new FileFilteringContext(includes, excludes)
    }
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.FileFiltering]
    }
    constructor(args: { filterName?: string, metricName?: string, rankThreshold?: number, sign?: number,include?:string[],exclude?:string[],useGitIgnore?:boolean }) {
        super()
        this.rankSampler = new RankSampler({ rankThreshold: args.rankThreshold, rankSign: args.sign })
        if (args.metricName) {
            this.metric = resolveFromConcreteName(args.metricName)
        }

        if (args.filterName) {
            this.filter = resolveFromConcreteName(args.filterName)
        }
        if(args.include){
            this.include=args.include
        }
        if(args.exclude){
            this.exclude=args.exclude
        }
        if(args.useGitIgnore!=undefined){
            this.useGitIgnore=args.useGitIgnore
        }
    }
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
        createdContexts.add(FileFilteringContext.name)
    }

}