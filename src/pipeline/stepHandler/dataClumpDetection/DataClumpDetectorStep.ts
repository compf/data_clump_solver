import { PipeLineStep } from "../../PipeLineStep";
import { DataClumpDetectorContext, DataClumpRefactoringContext } from "../../../context/DataContext";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { Analyzer } from "../../../data-clumps-doctor/analyse/src/ignoreCoverage/Analyzer";
import {resolve} from "path"
import { DataClumpTypeContext, DataClumpsTypeContext } from "data-clumps-type-context";
import fs from "fs";
export class DataClumpDetectorStep extends AbstractStepHandler {
    async handle(context: DataClumpRefactoringContext, params:any):Promise<DataClumpRefactoringContext> {
        let project_path=context.getProjectPath();
        const temp_path=resolve("./temp")
        const output_path=resolve("./stuff/output.json")
        let analyser = new Analyzer(project_path, "src/data-clumps-doctor/analyse/src/ignoreCoverage/astGenerator/",
            output_path, project_path, "java", temp_path, null, null, "ArgoUML", 1.0, true, null)
            await analyser.analyse(null);

           
        let result=JSON.parse(fs.readFileSync(output_path,{encoding:"utf-8"}))
        
        return context.buildNewContext(new DataClumpDetectorContext(result as DataClumpsTypeContext));
      
    }
    getExecutableSteps(): PipeLineStep[] {
        return [PipeLineStep.ASTGeneration, PipeLineStep.SimilarityDetection, PipeLineStep.DataClumpDetection]
    }

}




