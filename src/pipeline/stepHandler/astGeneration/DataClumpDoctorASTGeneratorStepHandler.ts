import { ASTBuildingContext, DataClumpRefactoringContext, FileFilteringContext } from "../../../context/DataContext";
import { ParserHelperJavaSourceCode } from "../../../data-clumps-doctor/analyse/src/ignoreCoverage/ParserHelperJavaSourceCode";
import { DetectorUtils } from "../../../data-clumps-doctor/analyse/src/ignoreCoverage/detector/DetectorUtils";
import { getRelevantFilesRec, wait, waitSync } from "../../../util/Utils";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { resolve } from "path"
import fs from "fs"
import AdmZip from "adm-zip";
export class DataClumpDoctorASTGeneratorStep extends AbstractStepHandler {
    constructor(args:{outPath?: string}) {
        super()
        this.outPath = args.outPath
    }
    outPath?: string
    async handle(step:PipeLineStepType,context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
        const ast_generator_path = resolve("src/data-clumps-doctor/analyse/src/ignoreCoverage/astGenerator/")
        
        let outPath=this.outPath??resolve(context.getProjectPath(),".data_clump_solver_data","astOut")
        const ruleset_jar_location = resolve(ast_generator_path, "pmd-bin-7.0.0-rc3/lib/pmd-java-custom-1.0.0-SNAPSHOT.jar")

        applyIncludeExclude(context,ruleset_jar_location)
        return this.analyzeSourceCodeFiles(context.getProjectPath(),outPath,context)
        

    }
    async analyzeSourceCodeFiles(src_out_path:string,ast_out_path:string, context:DataClumpRefactoringContext):Promise<ASTBuildingContext>{
        const ast_generator_path = resolve("src/data-clumps-doctor/analyse/src/ignoreCoverage/astGenerator/")
       // fs.mkdirSync(ast_out_path)

        await ParserHelperJavaSourceCode.parseSourceCodeToAst(ast_out_path, ast_out_path, ast_generator_path);
        let paths: string[] = []
        waitSync(100)
       
        getRelevantFilesRec(ast_out_path, paths, new FileFilteringContext(["*.json"], []))


        let newContext = context.buildNewContext(new ASTBuildingContext()) as ASTBuildingContext
        for (let path of paths) {
        
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
export function applyIncludeExclude(context: DataClumpRefactoringContext, jarPath: string) {
    let filtering_context = context.getByType(FileFilteringContext)
    if (filtering_context == null) {
        filtering_context = new FileFilteringContext([], [//".*/*MathStuff*.*"
    ]);
    }
    else if( filtering_context.customFilters && ( !filtering_context.excludeGlobs.includes(".*") || !filtering_context.excludeGlobs.includes("*"))){
        filtering_context.excludeGlobs.push(".*")
    }
    let xml = buildXml(filtering_context.includeGlobs, filtering_context.excludeGlobs)
    let zip = new AdmZip(jarPath)
    zip.updateFile("custom-java-ruleset.xml", Buffer.from(xml));
    zip.writeZip(jarPath);

}
export function buildXml(includeGlobs: string[], excludeGlobs: string[]): string {
    let content = "<?xml version='1.0' encoding='UTF-8'?> " +
        "<ruleset name='Custom Ruleset' "+
    "xmlns='http://pmd.sourceforge.net/ruleset/2.0.0' " +
        "xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' " +
        "xsi:schemaLocation='http://pmd.sourceforge.net/ruleset/2.0.0 https://pmd.sourceforge.io/ruleset_2_0_0.xsd' >" +
        "<description>" +
        "Custom Ruleset with PLSQL Rules" +
        "</description>";
        if(includeGlobs.length>0 && excludeGlobs.length==0){
            excludeGlobs=["*"]
        }
    for (let include of includeGlobs) {
        include=include.replaceAll("*",".*")
        include=include.replaceAll("..*",".*")
        
        content += `<include-pattern>${include}</include-pattern>`
    }
    for (let exclude of excludeGlobs) {
        exclude=exclude.replaceAll("*",".*")
        exclude=exclude.replaceAll("..*",".*")
        content += `<exclude-pattern>${exclude}</exclude-pattern>`
    }


    content += "<rule ref='net/sourceforge/pmd/examples/java/rules/MyRule.xml/MyRule' />" +
        "</ruleset>";
    return content;
}