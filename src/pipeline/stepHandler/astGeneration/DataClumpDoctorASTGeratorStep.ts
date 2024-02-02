import { ASTBuildingContext, DataClumpRefactoringContext, FileFilteringContext } from "../../../context/DataContext";
import { ParserHelperJavaSourceCode } from "../../../data-clumps-doctor/analyse/src/ignoreCoverage/ParserHelperJavaSourceCode";
import { DetectorUtils } from "../../../data-clumps-doctor/analyse/src/ignoreCoverage/detector/DetectorUtils";
import { getRelevantFilesRec, wait } from "../../../util/Utils";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { resolve } from "path"
import fs from "fs"
export class DataClumpDoctorASTGeneratorStep extends AbstractStepHandler{
    constructor(outPath:string){
        super()
        this.outPath=outPath
    }
    outPath:string
    async handle(context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
        const ast_generator_path = "src/data-clumps-doctor/analyse/src/ignoreCoverage/astGenerator/"
        const ast_out_path =resolve(this.outPath)
       await ParserHelperJavaSourceCode.parseSourceCodeToAst(resolve(context.getProjectPath()),ast_out_path,ast_generator_path)
       let paths:string[]=[] 
       await wait(500)
       getRelevantFilesRec(ast_out_path,paths,new FileFilteringContext(["*.json"],[]))
       console.log(paths)
       let newContext=context.buildNewContext(new ASTBuildingContext()) as ASTBuildingContext
       for(let path of paths){
           newContext.load(path)
       }
       return newContext

    }
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.ASTGeneration]
    }
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
       createdContexts.add(ASTBuildingContext.name)
    }
    
}