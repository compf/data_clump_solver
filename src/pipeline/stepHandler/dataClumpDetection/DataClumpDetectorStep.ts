import { PipeLineStep } from "../../PipeLineStep";
import { DataContextInterface } from "../../../context/DataContext";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { Analyzer } from "../../../data-clumps-doctor/analyse/src/ignoreCoverage/Analyzer";
import {resolve} from "path"
import { DataClumpTypeContext, DataClumpsTypeContext } from "data-clumps-type-context";
import fs from "fs";
export class DataClumpDetectorStep extends AbstractStepHandler {
    async handle(context: DataContextInterface) {
        let project_path=context.CodeObtaining.path
        const temp_path=resolve("./temp")
        const output_path=resolve("./stuff/output.json")
        let analyser = new Analyzer(project_path, "src/data-clumps-doctor/analyse/src/ignoreCoverage/astGenerator/",
            output_path, project_path, "java", temp_path, null, null, "ArgoUML", 1.0, true, null)
            await analyser.analyse(null);

           
        let result=JSON.parse(fs.readFileSync(output_path,{encoding:"utf-8"}))
        context.DataClumpDetector.dataClumpDetectionResult=result as DataClumpsTypeContext;
        console.log("hello");
      
    }
    getExecutableSteps(): PipeLineStep[] {
        return [PipeLineStep.ASTGeneration, PipeLineStep.SimilarityDetector, PipeLineStep.DataClumpDetector]
    }

}




