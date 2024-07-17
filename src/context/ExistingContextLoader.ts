import { DataClumpsTypeContext } from "data-clumps-type-context";
import { PipeLineStep, PipeLineStepType } from "../pipeline/PipeLineStep";
import { ASTBuildingContext, DataClumpDetectorContext, DataClumpRefactoringContext, NameFindingContext, UsageFindingContext, getContextSerializationPath } from "./DataContext";
import fs from "fs";
import { resolve } from "path";
const  DEBUG=false;
export function loadExistingContext(step: PipeLineStepType, context: DataClumpRefactoringContext): DataClumpRefactoringContext | null {
    if(DEBUG)return null;
    switch (step) {
        case PipeLineStep.ASTGeneration:
            //throw "cool"
            {
                const ast_out_path = resolve(context.getProjectPath(),".data_clump_solver_data","astOut")
                if(!fs.existsSync(ast_out_path)){
                    return null;
                }
                let astContext=new ASTBuildingContext()
                let any=false;
                for(let p of fs.readdirSync(ast_out_path)){
                    any=true;
                    (astContext as ASTBuildingContext).load(resolve(ast_out_path,p))
                }
                if(any){
                    return astContext
                }
                else{
                    return null
                
                }
            }
   
        case PipeLineStep.DataClumpDetection:
        case PipeLineStep.DataClumpFiltering:
            {
                let tempContext=new DataClumpDetectorContext({data_clumps:{}} as any)
                const basePath = getContextSerializationPath(tempContext, context)
                let i=2;
                let filterExists=false;
                let basePathExists=fs.existsSync(basePath)
                if(basePathExists){
                    context=context.buildNewContext(new DataClumpDetectorContext(JSON.parse(fs.readFileSync(basePath, { encoding: "utf-8" }))))
                }
                let pathExist=true;
                let allData:DataClumpsTypeContext[]=[]
                while(pathExist){
                    let path=basePath.replace(".json","_"+i+".json")
                    if (fs.existsSync(path)) {
                        filterExists=true;
                        let data = JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }))
                       context=context.buildNewContext(new DataClumpDetectorContext(data))
                       
                    }
                    else{
                        pathExist=false
                    }
                    i++
                    pathExist=pathExist && fs.existsSync(basePath.replace(".json","_"+i+".json"))
                }
               
                if(step==PipeLineStep.DataClumpFiltering && filterExists){
                    return context
                }
                else if(step==PipeLineStep.DataClumpDetection && basePathExists){
                    return context;
                }
               else  return null;
            }
        case PipeLineStep.NameFinding:
            {
                let tempContext=new NameFindingContext()
                if (fs.existsSync(getContextSerializationPath(tempContext, context))) {
                    let data = JSON.parse(fs.readFileSync(getContextSerializationPath(tempContext, context)).toString())
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
                let tempContext=new UsageFindingContext({})
                if (fs.existsSync(getContextSerializationPath(tempContext, context))) {
                    let data = JSON.parse(fs.readFileSync(getContextSerializationPath(tempContext, context)).toString())
                    return context.buildNewContext(new UsageFindingContext(data))
                }

                return null;
            }
    }
    return null;
}
