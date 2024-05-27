import { DataClumpsTypeContext } from "data-clumps-type-context";
import { getContextSerializationPath } from "../config/Configuration";
import { PipeLineStep, PipeLineStepType } from "../pipeline/PipeLineStep";
import { DataClumpDetectorContext, DataClumpRefactoringContext, NameFindingContext, UsageFindingContext } from "./DataContext";
import fs from "fs";

export function loadExistingContext(step: PipeLineStepType, context: DataClumpRefactoringContext): DataClumpRefactoringContext | null {
    switch (step) {
        case PipeLineStep.DataClumpDetection:
            {
                let path = getContextSerializationPath(PipeLineStep.DataClumpDetection.name, context)
                if (fs.existsSync(path)) {
                    let data = JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }))
                    if (Array.isArray(data)) {
                        return context.buildNewContext(DataClumpDetectorContext.fromArray(data as DataClumpsTypeContext[]))
                    }
                    else {
                        return new DataClumpDetectorContext(data as DataClumpsTypeContext)
                    }
                }
                return null
            }
        case PipeLineStep.NameFinding:
            {
                if (fs.existsSync(getContextSerializationPath(step.name, context))) {
                    let data = JSON.parse(fs.readFileSync(getContextSerializationPath(step.name, context)).toString())
                    let newContext = context.buildNewContext(new NameFindingContext()) as NameFindingContext
                    for (let key of Object.keys(data)) {
                        newContext.setNameKeyPair(data[key], key)

                    }
                    return newContext
                }
                return null;
            }
        case PipeLineStep.ReferenceFinding:
            {
                if (fs.existsSync(getContextSerializationPath(step.name, context))) {
                    let data = JSON.parse(fs.readFileSync(getContextSerializationPath(step.name, context)).toString())
                    return context.buildNewContext(new UsageFindingContext(data))
                }

                return null;
            }
    }
    return null;
}
