import { DataContextInterface } from "../../../context/DataContext";
import { PipeLineStep } from "../../PipeLineStep";
import { AbstractStepHandler } from "../AbstractStepHandler";
import {Readable,Writable} from "stream"
import { ResponseMessage } from "./TypeDefinitions";
import { InitializeParams, ReferenceParams } from "ts-lsp-client";
import {resolve} from "path"
import { MyCapabilities } from "./capabilities";
import {readFileSync} from "fs"
import { LanguageServerAPI, Methods } from "./LanguageServerAPI";

let globalCounter=2;
export  class LanguageServerUsageAPI extends AbstractStepHandler{
    api: LanguageServerAPI;
    constructor(api:LanguageServerAPI){
        super();
        this.api=api;
    }
   
    async handle(context: DataContextInterface, params: any) {
      const socket=await  this.api.init(context.CodeObtaining.path,(data)=>{
            console.log(JSON.stringify(data))
      });
      console.log("hallo")
      for(let dataClumpKey of Object.keys(context.DataClumpDetector.dataClumpDetectionResult?.data_clumps!)){
        let dc=context.DataClumpDetector.dataClumpDetectionResult?.data_clumps[dataClumpKey]!
        let first=true;
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
            if(first && dc.from_method_name!=null){
                first=false;
            let wholeFile=readFileSync(resolve(context.CodeObtaining.path)+"/"+dc?.from_file_path).toString().split("\n");
            let methodPos=wholeFile[usageRequest.position.line].indexOf(dc.from_method_name)
            let methodDeclUsageRequest:ReferenceParams={
                context:{includeDeclaration:true},
                textDocument:{
                    uri:"file://"+resolve(context.CodeObtaining.path)+"/"+dc?.from_file_path
                },
                position:{
                    line:dc.data_clump_data[variableKey]!.position.startLine-1,
                    character:methodPos
                   

                }
            };
            let toSend=this.api.create_request_message( globalCounter,Methods.References,methodDeclUsageRequest)
            console.log("TO_SEND (method)");
            console.log(toSend)
            socket.writer.write(toSend)
            
            globalCounter+=1
                
            }
            /*let wholeFile=readFileSync(resolve(context.CodeObtaining.path)+"/"+dc?.from_file_path).toString();

            (usageRequest.position as any).char=wholeFile.split("\n")[usageRequest.position.line][usageRequest.position.character]*/
            let toSend=this.api.create_request_message( globalCounter,Methods.References,usageRequest)
          console.log("TO_SEND");
            console.log(toSend)
           //wait(2)
            socket.writer.write(toSend)
            globalCounter+=1
            
        }
       

      }
    }

 
 
    getExecutableSteps(): PipeLineStep[] {
        return [PipeLineStep.UsageFinding]
    }

    
       
}


function wait(sec: number) {
    var waitTill = new Date(new Date().getTime() + sec * 1000);
    while (waitTill > new Date()) { }
}