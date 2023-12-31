import { DataClumpTypeContext } from "data-clumps-type-context";
import { DataClumpDetectorContext, DataClumpRefactoringContext, NameFindingContext } from "../../../context/DataContext";
import { PipeLineStep,PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";

export abstract class AbstractNameFindingStepHandler extends AbstractStepHandler {

   async  handle(context: DataClumpRefactoringContext, params: any):Promise<DataClumpRefactoringContext> {
       

            let cache=new Map<string,string>();
            let detectorContext=context.getByType(DataClumpDetectorContext)!!
            for (let dataClumpKey of detectorContext.getDataClumpKeys()) {

                let dataClump = detectorContext.getDataClumpDetectionResult()[dataClumpKey]!;
                let names: string[] = []
                console.log(dataClumpKey,"helloQ",dataClump)
                for (let k of Object.keys(dataClump.data_clump_data)) {
                    let name = dataClump.data_clump_data[k].name

                    names.push(name)

                }
                let commaSeparated = this.getQueryKey(names)
                let reply=""
                if (cache.has(commaSeparated)) {
                    reply=cache.get(commaSeparated)!!
                   
                }
                else{
                    reply = (await this.getSuggestedName(names))!!;
                    cache.set(commaSeparated,reply)
                }

              
               
                if(!(context instanceof NameFindingContext)){
                   context=context.buildNewContext(new NameFindingContext());
                }
                (context as NameFindingContext).setNameKeyPair(reply,dataClumpKey)

            }
            return context;

        

    }
    getQueryKey(identifiers: string[]):string {
        return identifiers.join(", ");
    }
    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.NameFinding]
     }
    abstract getSuggestedName(names:string[]):Promise<string|null>
     addCreatedContextNames(pipeLineStep: PipeLineStepType, createdContexts: Set<string>): void {
            createdContexts.add(NameFindingContext.name)
     }
     addAditionalContextRequirementNames(pipeLineStep: PipeLineStepType, requirements: Set<string>): void {
        requirements.add(DataClumpDetectorContext.name)
     }
    }