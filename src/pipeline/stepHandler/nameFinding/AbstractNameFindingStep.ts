import { DataClumpTypeContext } from "data-clumps-type-context";
import { DataClumpDetectorContext, DataClumpRefactoringContext, NameFindingContext } from "../../../context/DataContext";
import { PipeLineStep,PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { getContextSerializationPath } from "../../../config/Configuration";
import fs from "fs"
export abstract class AbstractNameFindingStepHandler extends AbstractStepHandler {
    useExistingNames: boolean=true;
    deserializeExistingContext(context: DataClumpRefactoringContext, step: PipeLineStepType): DataClumpRefactoringContext | null {
        if(step==PipeLineStep.ReferenceFinding && this.useExistingNames){
            if(fs.existsSync(getContextSerializationPath(step.name,context))){
                let data=JSON.parse(fs.readFileSync(getContextSerializationPath(step.name,context)).toString())
                let newContext= context.buildNewContext(new NameFindingContext()) as NameFindingContext
                for(let key of Object.keys(data)){
                    newContext.setNameKeyPair(data[key],key)
                    
                }
            }
        }
        return null;
    }
   async  handle(step:PipeLineStepType,context: DataClumpRefactoringContext, params: any):Promise<DataClumpRefactoringContext> {
       

            let cache=new Map<string,string>();
            let detectorContext=context.getByType(DataClumpDetectorContext)!!
            for (let dataClumpKey of detectorContext.getDataClumpKeys()) {

                let dataClump = detectorContext.getDataClumpDetectionResult().data_clumps[dataClumpKey]!;
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
    constructor(args:any){
        super();
        if( args!=undefined && args.useExistingNames!=undefined){
            this.useExistingNames=args.useExistingNames
        }
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