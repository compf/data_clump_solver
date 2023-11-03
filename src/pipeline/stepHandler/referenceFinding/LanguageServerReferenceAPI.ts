import { DataContextInterface } from "../../../context/DataContext";
import { PipeLineStep } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import { Readable, Writable } from "stream"
import { ResponseMessage } from "../../../util/languageServer/TypeDefinitions";
import { InitializeParams, ReferenceParams } from "ts-lsp-client";
import { resolve } from "path"
import { MyCapabilities } from "../../../util/languageServer/capabilities";
import { readFileSync } from "fs"
import { LanguageServerAPI, Methods } from "../../../util/languageServer/LanguageServerAPI";
import { SymbolType } from "../../../context/VariableOrMethodUsage";


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

    async handle(context: DataContextInterface, params: any) {
        await new Promise<void>(async handleResolver =>  {
            const socket = await this.api.init(context.CodeObtaining.path, (data) => {
                console.log(JSON.stringify(data))
               let info= this.counterDataClumpInfoMap.get(data.id)!
                if(info==undefined)return;
                this.balance--
                if(!context.UsageFinding.usages.has(info.variableKey)){
                    context.UsageFinding.usages.set(info.variableKey,[])
                }
                for(let  result of data.result!){
                    context.UsageFinding.usages.get(info.variableKey)!.push({name:info.variableName,symbolType:info.usageType, range:result.range,filePath:result.uri})
    
                }
                console.log("balance",this.balance)
                if(this.balance==0){
                    handleResolver()
                }
            });
            console.log("hallo")
            for (let dataClumpKey of Object.keys(context.DataClumpDetector.dataClumpDetectionResult?.data_clumps!)) {
                let dc = context.DataClumpDetector.dataClumpDetectionResult?.data_clumps[dataClumpKey]!
                let first = true;
                for (let variableKey of Object.keys(dc.data_clump_data)) {
                    let dcVariable = dc.data_clump_data[variableKey]
                    const variableUsageRequest: ReferenceParams = {
                        context: { includeDeclaration: true },
                        textDocument: {
                            uri: "file://" + resolve(context.CodeObtaining.path) + "/" + dc?.from_file_path
                        },
                        position: {
                            line: dc.data_clump_data[variableKey]!.position.startLine - 1,
                            character: dc.data_clump_data[variableKey]!.position.startColumn - 1
    
    
                        }
                    };
                    if (dc.from_method_name != null ) {
                        first = false;
                        let wholeFile = readFileSync(resolve(context.CodeObtaining.path) + "/" + dc?.from_file_path).toString().split("\n");
                        let methodPos = wholeFile[variableUsageRequest.position.line].indexOf(dc.from_method_name)
                        let methodDeclUsageRequest: ReferenceParams = {
                            context: { includeDeclaration: true },
                            textDocument: {
                                uri: "file://" + resolve(context.CodeObtaining.path) + "/" + dc?.from_file_path
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



    getExecutableSteps(): PipeLineStep[] {
        return [PipeLineStep.UsageFinding]
    }



}


function wait(sec: number) {
    var waitTill = new Date(new Date().getTime() + sec * 1000);
    while (waitTill > new Date()) { }
}