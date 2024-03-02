import * as fs from 'fs';
import { GitHubService } from './util/vcs/GitHubService';
import { spawnSync } from 'child_process';
import { waitSync } from './util/Utils';
import { resolve } from 'path';
import { ValidationStepHandler } from './pipeline/stepHandler/validation/ValidationStepHandler';
import { MavenBuildValidationStepHandler } from './pipeline/stepHandler/validation/MavenBuildValidationStepHandler';
import { GradleBuildValidationStepHandler } from './pipeline/stepHandler/validation/GradleBuildValidationStepHandler';
import { CodeObtainingContext, DataClumpDetectorContext } from './context/DataContext';
import { DataClumpsTypeContext } from 'data-clumps-type-context/ignoreCoverage/DataClumpsTypeContext';
import { DataClumpDetectorStep } from './pipeline/stepHandler/dataClumpDetection/DataClumpDetectorStep';
let projects = JSON.parse(fs.readFileSync("github_projects_structured.json", "utf-8"));
type DataClumpReportStats = {
    amount_data_clumps: number | null;
    amount_files_with_data_clumps: number | null;
    amount_classes_or_interfaces_with_data_clumps: number | null;
    amount_methods_with_data_clumps: number | null;
    fields_to_fields_data_clump: number | null;
    parameters_to_fields_data_clump: number | null;
    parameters_to_parameters_data_clump: number | null;
    additional: any;
}
type ResultType = {
    [project: string]: {
        pullRequestUpdateTime: string,
        lines: { java: number, sum: number, percentage: number },
        buildSystem: string,
        compilingResult: boolean
        dataClumps: DataClumpReportStats
    }

}
async function main() {
    if (fs.existsSync("cloned_projects")) {
        fs.rmSync("cloned_projects", { recursive: true })
    }
    let result: ResultType = fs.existsSync("github_projects_results.json") ? JSON.parse(fs.readFileSync("github_projects_results.json", { encoding: "utf-8" })) : {}
    for (let projectData of projects) {
        let project = projectData.url
        try {

            if ("ignore" in projectData && projectData.ignore) {
                continue
            }
            if (project in result) {
                continue
            }
            let splitted = project.split("/")
            let projectName = splitted[splitted.length - 1]

            console.log("Cloning: ", project);
            fs.mkdirSync("cloned_projects",)
            let github = new GitHubService();
            github.clone(project);
            waitSync(1000);
            let pullRequestUpdateTime = await github.getMostRecentPullRequestTime(project);
            let lines = countLines();
            let buildSystem = getBuildSystem();
            let compileResult = await doesCompile(buildSystem);
            let detector = new DataClumpDetectorStep({});
            let dataClumps = await detector.handle(obtainingContext, null) as DataClumpDetectorContext
            dataClumps.allDataClumpDetectionResult.report_summary
            result[project] = {
                "pullRequestUpdateTime": pullRequestUpdateTime.toISOString(), "lines": lines, "buildSystem": buildSystem,
                "compilingResult": compileResult.success,
                "dataClumps": dataClumps.allDataClumpDetectionResult.report_summary
            };
            console.log(result[project]);
            fs.rmSync("cloned_projects", { recursive: true });
            waitSync(1000);
            if (!compileResult.success) {
                fs.writeFileSync("github_errors/" + projectName, compileResult.messages!.stderr + "\n" + compileResult.messages!.stdout)
            }
        }
        catch (e) {
            result[project] = "error" as any
            fs.rmSync("cloned_projects", { recursive: true });

            console.error(e);
        }
        fs.writeFileSync("github_projects_results.json", JSON.stringify(result, null, 2));

    }


}
function getBuildSystem(): string {
    if (fs.existsSync("cloned_projects/pom.xml")) {
        return "maven";
    }
    if (fs.existsSync("cloned_projects/build.gradle")) {
        return "gradle";
    }
    if (fs.existsSync("cloned_projects/build.gradle.kts")) {
        return "gradle";
    }
    return "unknown";
}
const args = ["-Dhttp.proxyHost=www-proxy.rz.uni-osnabrueck.de",
    "-Dhttp.proxyPort=80",
    "-Dhttps.proxyHost=www-proxy.rz.uni-osnabrueck.de",
    "-Dhttps.proxyPort=80"]
const useArgs = false
let obtainingContext = new CodeObtainingContext(resolve("cloned_projects"))
async function doesCompile(buildSystem: string): Promise<{ success: boolean; messages: { stdout: string, stderr: string } | null; }> {
    let checker: ValidationStepHandler | null = null;
    if (buildSystem == "maven") {
        checker = new MavenBuildValidationStepHandler();

    }
    else {
        checker = new GradleBuildValidationStepHandler();

    }
    return checker!.validate(obtainingContext);
}
function countLines() {
    let cp = spawnSync("cloc", ["cloned_projects", "--json", "--out", "cloc_results.json"])
    console.log(cp.stdout.toString())

    waitSync(1000);
    console.log("cloc finished");
    let results = JSON.parse(fs.readFileSync("cloc_results.json", "utf-8"));
    return { "java": results["Java"], "sum": results["SUM"], "percentage": 100 * results["Java"]["code"] / results["SUM"]["code"] };
}
main();