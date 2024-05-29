import { DataClumpsTypeContext } from "data-clumps-type-context";
import { getContextSerializationPath } from "../config/Configuration";
import { PipeLineStep, PipeLineStepType } from "../pipeline/PipeLineStep";
import { DataClumpDetectorContext, DataClumpRefactoringContext, NameFindingContext, UsageFindingContext } from "./DataContext";
import fs from "fs";

export function loadExistingContext(step: PipeLineStepType, context: DataClumpRefactoringContext): DataClumpRefactoringContext | null {
    switch (step) {
        case PipeLineStep.DataClumpDetection:
        case PipeLineStep.DataClumpFiltering:
            {
                const basePath = getContextSerializationPath(PipeLineStep.DataClumpDetection.name, context)
                let i=0;
                let pathExist=fs.existsSync(basePath)
                let allData:DataClumpsTypeContext[]=[]
                while(pathExist){
                    let path=basePath.replace(".json","_"+i+".json")
                    if (fs.existsSync(path)) {
                        let data = JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }))
                        allData.push(data)
                       
                    }
                    else{
                        pathExist=false
                    }
                    i++
                    pathExist=pathExist && fs.existsSync(basePath.replace(".json","_"+i+".json"))
                }
                if(allData.length>0){
                    if(step==PipeLineStep.DataClumpFiltering && allData.length<2){
                        return null
                    }
                    return DataClumpDetectorContext.fromArray(allData)
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
