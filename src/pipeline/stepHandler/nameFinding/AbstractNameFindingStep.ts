import { DataContextInterface } from "../../../context/DataContext";
import { PipeLineStep } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";

export abstract class AbstractNameFindingStepHandler extends AbstractStepHandler {

   async  handle(context: DataContextInterface, params: any) {
       

            let cache=new Set<string>();
            for (let dataClumpKey of Object.keys(context.DataClumpDetector.dataClumpDetectionResult!.data_clumps)) {

                let dataClump = context.DataClumpDetector.dataClumpDetectionResult!.data_clumps[dataClumpKey]
                let names: string[] = []
                for (let k of Object.keys(dataClump.data_clump_data)) {
                    let name = dataClump.data_clump_data[k].name

                    names.push(name)

                }
                let commaSeparated = this.getQueryKey(names)

                if (cache.has(commaSeparated)) {
                    continue;
                }

                let reply = await this.getSuggestedName(names);
                context.NameFinding.nameDataClumpKey.set( reply,dataClumpKey)
                context.NameFinding.dataClumpKeyName.set( dataClumpKey,reply)
                cache.add(commaSeparated)

            }

        

    }
    getQueryKey(identifiers: string[]):string {
        return identifiers.join(", ");
    }
    getExecutableSteps(): PipeLineStep[] {
        return [PipeLineStep.NameFinding]
     }
    abstract getSuggestedName(names:string[]):Promise<string>
}