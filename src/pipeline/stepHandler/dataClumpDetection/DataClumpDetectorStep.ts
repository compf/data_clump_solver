import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { ASTBuildingContext, CodeObtainingContext, DataClumpDetectorContext, DataClumpRefactoringContext, FileFilteringContext, getContextSerializationPath } from "../../../context/DataContext";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { Analyzer } from "../../../data-clumps-doctor/analyse/src/ignoreCoverage/Analyzer";
import { resolve } from "path"
import { DataClumpTypeContext, DataClumpsTypeContext } from "data-clumps-type-context";
import fs from "fs";
import AdmZip from "adm-zip";
import { AST } from "minimatch";
import { applyIncludeExclude } from "../astGeneration/DataClumpDoctorASTGeratorStep";
export class DataClumpDetectorStep extends AbstractStepHandler {
    private detectorArgs: any;
    async handle(step: PipeLineStepType, context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
        let project_path = context.getProjectPath();
        console.log("Project path", project_path)
        const ast_out_path = resolve(context.getProjectPath(),".data_clump_solver_data","astOut")
        const ast_generator_path = "src/data-clumps-doctor/analyse/src/ignoreCoverage/astGenerator/"
        const ruleset_jar_location = resolve(ast_generator_path, "pmd-bin-7.0.0-rc3/lib/pmd-java-custom-1.0.0-SNAPSHOT.jar")
        let output_path = resolve("./stuff")
        if (!fs.existsSync(output_path)) {
            fs.mkdirSync(output_path)
        }
        output_path = resolve(output_path, "output.json")
        console.log(project_path)
        let analyser = new Analyzer(project_path, ast_generator_path,
            output_path, project_path, "java", ast_out_path, null, null, null, 1.0, true, this.detectorArgs)
        let astContext = context.getByType(ASTBuildingContext);
        let newContext = context
        if (astContext != null) {
            analyser.analyzeAST(null, null, null, null)
        }
        else {
            applyIncludeExclude(context, ruleset_jar_location);
            await analyser.analyse(null);
            let newContext = context.buildNewContext(new ASTBuildingContext())
            for (let p of fs.readdirSync(ast_out_path)) {
                (newContext as ASTBuildingContext).load(resolve(ast_out_path, p))
            }
        }



        let result = JSON.parse(fs.readFileSync(output_path, { encoding: "utf-8" }))

        newContext = newContext.buildNewContext(new DataClumpDetectorContext(result as DataClumpsTypeContext));
        fs.copyFileSync(output_path, getContextSerializationPath(newContext, newContext)!)
        return newContext

    }



    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.ASTGeneration, PipeLineStep.SimilarityDetection, PipeLineStep.DataClumpDetection]
    }
    constructor(args: any) {
        super();
        this.detectorArgs = args;
        console.log("got args", args)
    }
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
        createdContexts.add(DataClumpDetectorContext.name)
        createdContexts.add(ASTBuildingContext.name)
    }

}




