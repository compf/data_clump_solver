import { DataClumpTypeContext } from "data-clumps-type-context";
import { createDataClumpsTypeContext, DataClumpDetectorContext, DataClumpRefactoringContext } from "../context/DataContext";
import { FilterOrMetric, SingleItemFilter } from "../util/filterUtils/SingleItemFilter";
import { Arrayified, init, Instance ,InstanceBasedFileIO} from "./base_eval";
import { DetectEval } from "./eval_detect";
import { FileIO } from "../util/FileIO";
import simpleGit from "simple-git";
import { Metric } from "../util/filterUtils/Metric";
import { makeUnique } from "../util/Utils";

export class EvalDetectSyn extends DetectEval{
    createInstanceCombination(): Arrayified<Instance> {
        let result=super.createInstanceCombination();
        result.instanceType[0]="detectSyn"
        result.instructionType=["definitionBased"]
        
        return result;
    }
    getNumberIterations(): number {
        return 200
    }
    getCriteria(): FilterOrMetric[] {
        return [
            //new SizeThreeDataClumpFilter()
            //,
            new ChangeMetric()
             ]
    }
    getNumDataClumpsPerBlock(): number {
        return 5
    }
    async initProject(url: string): Promise<DataClumpRefactoringContext | null> {
        let ctx=await super.initProject(url)
        let g=simpleGit(ctx?.getProjectPath());
        await g.checkout("contextSyn")
        return ctx

    }
    filterFiles(context: DataClumpDetectorContext): DataClumpDetectorContext {
        let result=context.buildNewContext(new DataClumpDetectorContext(createDataClumpsTypeContext({}))) as DataClumpDetectorContext
        let paths=changes.changes.map((it)=>it.path)
        for(let dc of context.getDataClumps()){
            if(paths.includes(dc.from_file_path) || paths.includes(dc.to_file_path)){
                result.getDataClumpDetectionResult().data_clumps[dc.key]=dc
            }
        }
        result.update()
        return result
    }
    
 

}
class SizeThreeDataClumpFilter implements SingleItemFilter{

    isCompatibleWithDataClump(): boolean {
        return true
    }
    
    isCompatibleWithString(): boolean {
        return false
    }
    async shallRemain(data: string | DataClumpTypeContext, context: DataClumpRefactoringContext): Promise<boolean> {
        if(!this.initialized){
            this.init(context)
        }
        let dc=data as DataClumpTypeContext;
        return this.relevantPaths.has(dc.from_file_path) && this.relevantPaths.has(dc.to_file_path) && Object.keys(dc.data_clump_data).length==3
    }
     relevantPaths=new Set<string>()
     initialized=false;
    init(context:DataClumpRefactoringContext){

       let ctx=context.getByType(DataClumpDetectorContext)!
        for(let dc of ctx.getDataClumps()){
            if(Object.keys(dc.data_clump_data).length==3){
                this.relevantPaths.add(dc.from_file_path)
                this.relevantPaths.add(dc.to_file_path) 
            }
            else{
                this.relevantPaths.delete(dc.from_file_path)
                this.relevantPaths.delete(dc.to_file_path)
            }
        }
        this.initialized=true;
    }
}

class ChangeMetric implements Metric{
   async  shallRemain(data: string | DataClumpTypeContext, context: DataClumpRefactoringContext): Promise<boolean> {
        return  (await this.evaluate(data,context))>0;
    }
    async evaluate(data: string | DataClumpTypeContext, context: DataClumpRefactoringContext): Promise<number> {
        let dt=data as DataClumpTypeContext

        let paths=changes.changes.map((it)=>it.path)
        if(paths.includes(dt.from_file_path) || paths.includes(dt.to_file_path)){
            let relevantChanges=changes.changes.filter((it)=>it.path==dt.from_file_path || it.path==dt.to_file_path)
            let lineNrs=Object.values(dt.data_clump_data).map((it)=>it.position.startLine)
            lineNrs.push(...Object.values(dt.data_clump_data).map((it)=>it.to_variable.position.startLine))
            lineNrs=makeUnique(lineNrs)
            if(relevantChanges.some((it)=>lineNrs.includes(it.line))){
                return 1000;
            }
        }
        return 0;
    }
    
   isCompatibleWithDataClump(): boolean {
       return true;
   }
   isCompatibleWithString(): boolean {
       return false;
   }
}


async function main() {
    FileIO.instance=new InstanceBasedFileIO()
    let refactorEval = new EvalDetectSyn();
   await  refactorEval.analyzeProject(init());
}

if (require.main === module) {
    main();
}



const changes=
{
    "changes":[
        {
            "path":"remoting/src/main/java/org/apache/rocketmq/remoting/RemotingServer.java",
            "line":30,
            "oldName":"processor",
            "newName":"procesor",
            "type":"typo"
        },
        {
            "path":"remoting/src/main/java/org/apache/rocketmq/remoting/RemotingServer.java",
            "line":45,
            "oldName":"request",
            "newName":"requst",
            "type":"typo"
        },
        {
            "path":"remoting/src/main/java/org/apache/rocketmq/remoting/protocol/body/BrokerStatsItem.java",
            "line":21,
            "oldName":"sum",
            "newName":"total",
            "type":"synonym"
        },
        {
            "path":"broker/src/main/java/org/apache/rocketmq/broker/metrics/ConsumerLagCalculator.java",
            "line":79,
            "oldName":"topic",
            "newName":"subject",
            "type":"synonym"
        },
        {
            "path":"remoting/src/main/java/org/apache/rocketmq/remoting/RemotingClient.java",
            "line":46,
            "oldType":"long",
            "newType":"int",
            "type":"type"

        }
    ]
}