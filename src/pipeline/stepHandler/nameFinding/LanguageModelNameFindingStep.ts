import { DataContextInterface } from "../../../context/DataContext";
import { LanguageModelInterface } from "../../../util/languageModel/LanguageModelInterface";
import { PipeLineStep } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";

export class LanguageModelNameFindingsStep extends AbstractStepHandler{
    languageModel:LanguageModelInterface
    getQuery(names:string[]):string{
        return names.join(",")
    }
    async handle(context: DataContextInterface, params: any) {
        let chachedQueries=new Map<string,string>();

        for(let dataClumpKey of Object.keys(context.DataClumpDetector.dataClumpDetectionResult!.data_clumps)){
            
            let dataClump=context.DataClumpDetector.dataClumpDetectionResult!.data_clumps[dataClumpKey]
            let names:string[]=[]
            for(let k of  Object.keys(dataClump.data_clump_data)){
                let name=dataClump.data_clump_data[k].name
            
                names.push(name)
    
            }
            let commaSeparated=this.getQuery(names)

            if(chachedQueries.has(commaSeparated)){
                continue;
            }
            
            let query="Can you suggest a class name for the fields "+commaSeparated+"? One word only!";
            let reply=await this.languageModel.sendMessage(query);
            chachedQueries.set(commaSeparated,reply)

            console.log(commaSeparated,reply)

        }
        
          
    }
    getExecutableSteps(): PipeLineStep[] {
       return [PipeLineStep.NameFinding]
    }
    constructor(languageModel:LanguageModelInterface){
        super()
        this.languageModel=languageModel;
    }
    
}