import { DataContextInterface } from "../../../../context/DataContext";
import { PipeLineStep } from "../../../PipeLineStep";
import { AbstractStepHandler } from "../../AbstractStepHandler";
import {Readable,Writable} from "stream"
import { ResponseMessage } from "./TypeDefinitions";
import { InitializeParams, ReferenceParams } from "ts-lsp-client";
import {resolve} from "path"
import { MyCapabilities } from "./capabilities";
import {readFileSync} from "fs"
enum Methods {
    Initialize = "initialize",
    Initialized = "initialized",
    DidOpen = "textDocument/didOpen",
    References = "textDocument/references",
    Definition = "textDocument/definition"
}
let globalCounter=2;
export  abstract class LanguageServerProtocolRefatcoring extends AbstractStepHandler{
   
    async handle(context: DataContextInterface, params: any) {
      const socket=await  this.init(context.CodeObtaining.path,(data)=>{
            console.log(JSON.stringify(data))
      });
      console.log("hallo")
      for(let dataClumpKey of Object.keys(context.DataClumpDetector.dataClumpDetectionResult?.data_clumps!)){
        let dc=context.DataClumpDetector.dataClumpDetectionResult?.data_clumps[dataClumpKey]!
        for(let variableKey of Object.keys(dc.data_clump_data)){
            let usageRequest:ReferenceParams={
                context:{includeDeclaration:true},
                textDocument:{
                    uri:"file://"+resolve(context.CodeObtaining.path)+"/"+dc?.from_file_path
                },
                position:{
                    line:dc.data_clump_data[variableKey]!.position.startLine-1,
                    character:dc.data_clump_data[variableKey]!.position.startColumn-1
                   

                }
            };
            /*let wholeFile=readFileSync(resolve(context.CodeObtaining.path)+"/"+dc?.from_file_path).toString();

            (usageRequest.position as any).char=wholeFile.split("\n")[usageRequest.position.line][usageRequest.position.character]*/
            let toSend=this.create_request_message( globalCounter,Methods.References,usageRequest)
          console.log("TO_SEND");
            console.log(toSend)
           //wait(2)
            socket.writer.write(toSend)
            globalCounter+=1
            
        }
       

      }
    }
     callInitialize(socket: Writable, path:string) {
        const initParam: InitializeParams = {
            processId: process.pid,
            //workspaceFolders: [{ name: "Pokemon_Sirius", uri: "PokemonSirius" }],
            "rootUri": "file://"+resolve(path)+"/",
            capabilities: MyCapabilities,
            trace: "verbose"
        }
    
        let msg = this.create_request_message(1, Methods.Initialize, initParam)
        //console.log(msg)
        socket.write(msg)
    }
     callInitialized(socket: Writable) {
        let msg = this.create_request_message(2, Methods.Initialized, {})
        socket.write(msg)
    }
    create_request_message(id: string | number, method: Methods, params: any): string {
        let content = JSON.stringify({ jsonrpc: "2.0", id, method, params })
        let header = "Content-Length: " + content.length + "\r\n\r\n";
        //console.log("sending", header + content)
        return header + content;
    }
    getExecutableSteps(): PipeLineStep[] {
        return [PipeLineStep.Refactoring]
    }

    abstract init(path:string,callback:{(data: ResponseMessage):void}):Promise<{reader:Readable,writer:Writable}>;
}
function wait(sec: number) {
    var waitTill = new Date(new Date().getTime() + sec * 1000);
    while (waitTill > new Date()) { }
}