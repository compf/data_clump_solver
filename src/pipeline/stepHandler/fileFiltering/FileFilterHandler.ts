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
    private include: string[] = []
    private exclude: string[] = []
    private useGitIgnore=true
    async handle(step:PipeLineStepType,context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
        this.exclude.push(".*/.data_clump_solver_data/.*")
        this.exclude.push("-*.git/.*")
        this.include.push(".*\\.java")
        if ( this.metric!=undefined && !this.metric?.isCompatibleWithString()) {
            throw new Error("ranker is not compatible with string")
        }
      if(this.useGitIgnore && fs.existsSync(context.getProjectPath()+"/.gitignore")){

            let gitIgnore=fs.readFileSync(context.getProjectPath()+"/.gitignore").toString()
            let lines=gitIgnore.split("\n")
            for(let line of lines){
                if(line.startsWith("#")){
                    continue
                }
                if(line.trim()==""){
                    continue
                }
                if(line.startsWith("!")){
                    this.include.push(line.substring(1))
                }
                else{
                    this.exclude.push(".*"+line+".*")
                }
            }
        }
        let originalPaths: string[] = []


        let filterContext=new FileFilteringContext(this.include,this.exclude)
        getRelevantFilesRec(context.getProjectPath(), originalPaths, filterContext)
        if (this.filter) {
            getRelevantFilesRec(context.getProjectPath(), originalPaths, filterContext)

            for (let p of originalPaths) {
                if (await this.filter!!.shallRemain(p, context)) {
                    this.include.push(p)
                }
                else{
                    this.exclude.push(p)
                }

            }
            filterContext=new FileFilteringContext(this.include,this.exclude)
            getRelevantFilesRec(context.getProjectPath(), originalPaths, filterContext)
        }
        else{
            this.include.push(...originalPaths)
        }
        filterContext=new FileFilteringContext(this.include,this.exclude)
        originalPaths=[]
        getRelevantFilesRec(context.getProjectPath(), originalPaths, filterContext)
        
        if (this.metric) {
           
           let tmpInclude=new Set( await this.rankSampler.rank(this.metric!!,originalPaths, context) as string[])
           let tmpExclude=this.include.filter((it)=>!tmpInclude.has(it))
           this.include=Array.from(tmpInclude)
            this.exclude.push(...tmpExclude)
        }
        return   context.buildNewContext(new FileFilteringContext(this.include, this.exclude))

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