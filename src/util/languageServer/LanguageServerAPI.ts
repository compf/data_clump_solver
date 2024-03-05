import { InitializeParams } from "ts-lsp-client";
import { ResponseMessage } from "./TypeDefinitions";
import { Readable, Writable } from "stream";
import {resolve} from "path"
import { MyCapabilities } from "./capabilities";
import { spawn ,ChildProcess} from "child_process"
export enum Methods {
    Initialize = "initialize",
    Initialized = "initialized",
    DidOpen = "textDocument/didOpen",
    References = "textDocument/references",
    Definition = "textDocument/definition",
    Implementation="textDocument/implementation"
}
export abstract class LanguageServerAPI {
    protected childProcess: ChildProcess|null=null;
    abstract init(path:string,callback:{(data:ResponseMessage):void}): Promise<{ reader: Readable; writer: Writable; }>
    callInitialized(socket: Writable) {
        let msg = this.create_request_message(2, Methods.Initialized, {})
        socket.write(msg)
    }
    create_request_message(id: string | number, method: Methods, params: any): string {
        let content = JSON.stringify({ jsonrpc: "2.0", id, method, params })
        let header = "Content-Length: " + content.length + "\r\n\r\n";
        console.log("sending",  content)
        return header + content;
    }
    close(){
        console.log("closing")
        if(this.childProcess!=null){
            this.childProcess.kill()
            console.log("killed")
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
}
