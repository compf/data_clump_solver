import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { DataClumpDetectorContext, DataClumpRefactoringContext, FileFilteringContext } from "../../../context/DataContext";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { Analyzer } from "../../../data-clumps-doctor/analyse/src/ignoreCoverage/Analyzer";
import { resolve } from "path"
import { DataClumpTypeContext, DataClumpsTypeContext } from "data-clumps-type-context";
import fs from "fs";
import AdmZip from "adm-zip";
export class DataClumpDetectorStep extends AbstractStepHandler {
    async handle(context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
        let project_path = context.getProjectPath();
        const temp_path = resolve("./temp")
        const ast_generator_path = "src/data-clumps-doctor/analyse/src/ignoreCoverage/astGenerator/"
        const ruleset_jar_location = resolve(ast_generator_path, "pmd-bin-7.0.0-rc3/lib/pmd-java-custom-1.0.0-SNAPSHOT.jar")
        let output_path = resolve("./stuff")
        if (!fs.existsSync(output_path)) {
            fs.mkdirSync(output_path)
        }
        output_path = resolve(output_path, "output.json")
        console.log(project_path)
        this.applyIncludeExclude(context, ruleset_jar_location);
        let analyser = new Analyzer(project_path, ast_generator_path,
            output_path, project_path, "java", temp_path, null, null, "ArgoUML", 1.0, true, null)
        await analyser.analyse(null);


        let result = JSON.parse(fs.readFileSync(output_path, { encoding: "utf-8" }))

        return context.buildNewContext(new DataClumpDetectorContext(result as DataClumpsTypeContext));

    }
    applyIncludeExclude(context: DataClumpRefactoringContext, jarPath: string) {
        let filtering_context = context.getByType(FileFilteringContext)
        if (filtering_context == null) {
            filtering_context = new FileFilteringContext([], [//".*/*MathStuff*.*"
        ]);
        }
        let xml = this.buildXml(filtering_context.includeGlobs, filtering_context.excludeGlobs)
        let zip = new AdmZip(jarPath)
        zip.updateFile("custom-java-ruleset.xml", Buffer.from(xml));
        zip.writeZip(jarPath);

    }
    buildXml(includeGlobs: string[], excludeGlobs: string[]): string {
        let content = "<?xml version='1.0' encoding='UTF-8'?> " +
            "<ruleset name='Custom Ruleset' "+
        "xmlns='http://pmd.sourceforge.net/ruleset/2.0.0' " +
            "xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' " +
            "xsi:schemaLocation='http://pmd.sourceforge.net/ruleset/2.0.0 https://pmd.sourceforge.io/ruleset_2_0_0.xsd' >" +
            "<description>" +
            "Custom Ruleset with PLSQL Rules" +
            "</description>";
        for (let include of includeGlobs) {
            if (include.startsWith("*")) {
                include = "." + include
            }
            content += `<include-pattern>${include}</include-pattern>`
        }
        for (let exclude of excludeGlobs) {
            if (exclude.startsWith("*")) {
                exclude = "." + exclude
            }
            content += `<exclude-pattern>${exclude}</exclude-pattern>`
        }


        content += "<rule ref='net/sourceforge/pmd/examples/java/rules/MyRule.xml/MyRule' />" +
            "</ruleset>";
        return content;
    }
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.ASTGeneration, PipeLineStep.SimilarityDetection, PipeLineStep.DataClumpDetection]
    }

}




