import { DataClumpRefactoringContext, NameFindingContext, RefactoredContext, UsageFindingContext } from "../../../context/DataContext";
import { PipeLineStep, PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import fs from "fs"
import {parse,BaseJavaCstVisitorWithDefaults, MethodHeaderCtx} from "java-parser"
class MyVisitor extends BaseJavaCstVisitorWithDefaults{
 methodHeader(ctx: MethodHeaderCtx, param?: any) {
     console.log(ctx.methodDeclarator)
 }
}
export class ManualRefactorStep extends AbstractStepHandler{
    handle(context: DataClumpRefactoringContext, params: any): Promise<DataClumpRefactoringContext> {
        let usageContext= context.getByType<UsageFindingContext>(UsageFindingContext)
        let fileContentMap=new Map<string,string>();
        let usages={}
        for(let key of usageContext!!.usages!!.keys()){
            usages[key]=[]
            for(let usg of usageContext!!.usages.get(key)!!){
                usages[key].push(usg)
                usg["suggestedName"]=context.getByType(NameFindingContext)?.getNameByDataClumpKey(key)!!
                console.log(usg["suggestedName"])
            }
        }
        console.log(usages)
        fs.writeFileSync("stuff/usages.json",JSON.stringify(usages))
        return Promise.resolve(context)
    }
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.Refactoring]
    }
    addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
        createdContexts.add(RefactoredContext.name)
    }
    addAditionalContextRequirementNames(pipeLineStep: PipeLineStepType, requirements: Set<string>): void {
        requirements.add(UsageFindingContext.name)
    }

}


