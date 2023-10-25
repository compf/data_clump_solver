import { InitializeParams } from "ts-lsp-client";
import { ResponseMessage } from "./TypeDefinitions";
import { Readable, Writable } from "stream";
import {resolve} from "path"
import { MyCapabilities } from "./capabilities";

export enum Methods {
    Initialize = "initialize",
    Initialized = "initialized",
    DidOpen = "textDocument/didOpen",
    References = "textDocument/references",
    Definition = "textDocument/definition"
}
export abstract class LanguageServerAPI {
    abstract init(path:string,callback:{(data:ResponseMessage):void}): Promise<{ reader: Readable; writer: Writable; }>
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
