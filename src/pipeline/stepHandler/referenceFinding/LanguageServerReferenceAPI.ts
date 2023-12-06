import { DataClumpDetectorContext, DataClumpRefactoringContext, UsageFindingContext } from "../../../context/DataContext";
import { PipeLineStep,PipeLineStepType } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { Readable, Writable } from "stream"
import { ResponseMessage } from "../../../util/languageServer/TypeDefinitions";
import { InitializeParams, ReferenceParams } from "ts-lsp-client";
import { resolve } from "path"
import { MyCapabilities } from "../../../util/languageServer/capabilities";
import { readFileSync } from "fs"
import { LanguageServerAPI, Methods } from "../../../util/languageServer/LanguageServerAPI";
import { SymbolType, VariableOrMethodUsage } from "../../../context/VariableOrMethodUsage";


export class LanguageServerReferenceAPI extends AbstractStepHandler {
    api: LanguageServerAPI;
    globalCounter = 3
    balance=0;
    visitedMethods: Set<string> = new Set();
    counterDataClumpInfoMap: Map<number, { variableKey: string, variableName: string, usageType: SymbolType }> = new Map();
    constructor(api: LanguageServerAPI) {
        super();
        this.api = api;
    }
    nextCounterValue(): number {
        return this.globalCounter++;
    }

    async handle(context: DataClumpRefactoringContext, params: any):Promise<DataClumpRefactoringContext> {
        let usages=new Map<string,VariableOrMethodUsage[]>();
        return await new Promise<DataClumpRefactoringContext>(async handleResolver =>  {
            const socket = await this.api.init(context.getProjectPath(), (data) => {
                console.log("begin")
                console.log(JSON.stringify(data))
               let info= this.counterDataClumpInfoMap.get(data.id)!
                if(info==undefined)return;
                this.balance--
                if(!usages.has(info.variableKey)){
                    usages.set(info.variableKey,[])
                }
                for(let  result of data.result!){
                   usages.get(info.variableKey)!.push({name:info.variableName,symbolType:info.usageType, range:result.range,filePath:result.uri})
    
                }
                console.log("balance",this.balance)
                if(this.balance==0){
                    handleResolver(context.buildNewContext(new UsageFindingContext(usages)))
                }
            });
            console.log("hallo")
            let detectorContext=context.getByType(DataClumpDetectorContext)!!
            for (let dataClumpKey of detectorContext.getDataClumpKeys()) {
                let dc = detectorContext.getDataClumpTypeContext(dataClumpKey)
                let first = true;
                for (let variableKey of Object.keys(dc.data_clump_data)) {
                    let dcVariable = dc.data_clump_data[variableKey]
                    console.log(variableKey,"VARIABLE",dcVariable)
                    const variableUsageRequest: ReferenceParams = {
                        context: { includeDeclaration: true },
                        textDocument: {
                            uri: "file://" + resolve(context.getProjectPath()) + "/" + dc?.from_file_path
                        },
                        position: {
                            line: dc.data_clump_data[variableKey]!.position.startLine - 1,
                            character: dc.data_clump_data[variableKey]!.position.startColumn - 1
    
    
                        }
                    };
                    if (dc.from_method_name != null ) {
                        first = false;
                        let wholeFile = readFileSync(resolve(context.getProjectPath()) + "/" + dc?.from_file_path).toString().split("\n");
                        let methodPos = wholeFile[variableUsageRequest.position.line].indexOf(dc.from_method_name)
                        let methodDeclUsageRequest: ReferenceParams = {
                            context: { includeDeclaration: true },
                            textDocument: {
                                uri: "file://" + resolve(context.getProjectPath()) + "/" + dc?.from_file_path
                            },
                            position: {
                                line: dc.data_clump_data[variableKey]!.position.startLine - 1,
                                character: methodPos
    
    
                            }
                            
                        };


                  
                        let counter = this.nextCounterValue();
                        this.counterDataClumpInfoMap.set(counter, { variableKey:dc.from_method_key!, variableName: dc.from_method_name, usageType: SymbolType.Method })
                        this.balance++;
                        let toSend = this.api.create_request_message(counter, Methods.References, methodDeclUsageRequest)
                       
                        this.visitedMethods.add(dc.from_method_key!)
                        
                        socket.writer.write(toSend)
    
                    }
                    /*let wholeFile=readFileSync(resolve(context.CodeObtaining.path)+"/"+dc?.from_file_path).toString();
        
                    (usageRequest.position as any).char=wholeFile.split("\n")[usageRequest.position.line][usageRequest.position.character]*/
                    let counter = this.nextCounterValue();
                    this.counterDataClumpInfoMap.set(counter, { variableKey, variableName: dcVariable.name, usageType: SymbolType.Variable })
    
                    let toSend = this.api.create_request_message(counter, Methods.References, variableUsageRequest)
                   
                    //wait(2)
                    this.balance++;
                    socket.writer.write(toSend)
    
                }
    
    
            }
        });
       
    }



    getExecutableSteps(): PipeLineStepType[] {
        return [PipeLineStep.ReferenceFinding]
    }



}


function wait(sec: number) {
    var waitTill = new Date(new Date().getTime() + sec * 1000);
    while (waitTill > new Date()) { }
}