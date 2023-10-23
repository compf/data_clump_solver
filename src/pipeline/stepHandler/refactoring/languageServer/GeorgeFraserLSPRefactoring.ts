import { Readable, Writable } from "stream";
import { LanguageServerProtocolRefatcoring } from "./LanguageServerProtocolRefactoring";
import { spawn } from "child_process"
import {resolve} from "path"
export class GeorgeFraserRefactoring extends LanguageServerProtocolRefatcoring {
    async init(path:string,callback:{(data:ResponseMessage):void}): Promise<{ reader: Readable; writer: Writable; }> {
        let cp = spawn("/bin/bash", ["./dist/java-language-server/dist/lang_server_linux.sh"], { stdio: "pipe" });
        
        cp.stderr.on("data",(d)=>{
            console.log ("ERROR",d.toString())
        })
        
        this.callInitialize(cp.stdin, path)
        let data = cp.stdout.on("data", (data: Buffer) => {
            let s = data.toString("utf-8")
            console.log("received", "\"" + s + "\"");
            s = s.replace(/\}C/g, "\}\r\n\r\nC")

            //console.log(s)

            let splitted = s.split("\r\n");
            //console.log(splitted);
            for (let line of splitted) {
                if (line.startsWith("Content-Length: ")) {
                }
                else if (line.startsWith("{")) {
                    let content = JSON.parse(line);
                    if (currState == State.NotInitialized && content.id == 1 && first) {
                        first = false;
                        currState = State.Initialized;
                        console.log("sending init")
                        this.callInitialized(cp.stdin)
                        cp.stdout.emit("initialized")

                    }
                    else{
                    console.log("super")

                        callback(content as ResponseMessage)
                    }
                   
                }
            }
        })

        return new Promise(resolve => {
            data.on("initialized", () => {
                console.log("windows")
                resolve({ reader: cp.stdout, writer: cp.stdin })
            })

        });
    }
}













































import { DefinitionParams, DidOpenTextDocumentParams, InitializeParams, ReferenceParams } from "ts-lsp-client"

import { readFileSync } from "fs";
const main1: DidOpenTextDocumentParams = {

    /**
     * The document that was opened.
     */
    textDocument: {
        uri: "Main1.java",
        languageId: "java",
        version: 1,
        text: `package main;
            public class Main1{
                public void test1(){
                    Point p=new Point();
                    p.x=5;
                }`

    }

}
const main2: DidOpenTextDocumentParams = {

    /**
     * The document that was opened.
     */
    textDocument: {
        uri: "Main2.java",
        languageId: "java",
        version: 1,
        text: "package main;public class Main2{public void test2(){Point p=new Point();p.x=70;}"

    }

}
console
const point: DidOpenTextDocumentParams = {

    /**
     * The document that was opened.
     */
    textDocument: {
        uri: "Point.java",
        languageId: "java",
        version: 1,
        text: "package main;public class Point{public int x;public int y;}"

    }

}

const reference: ReferenceParams = {
    context: {
        includeDeclaration: true
    },
    textDocument: {
        uri: "file:///root/lsp-client/main/Main2.java"
    },
    position: {
        line: 4,
        character: 11
    }

}
const gotoDef: DefinitionParams = {

    textDocument: {
        uri: "file:///root/lsp-client/main/Main2.java"
    },
    position: {
        line: 4,
        character: 11
    }
}


function parse_content_length(data: string): number {

    let splitted = data.split(": ");
    return parseInt(splitted[1]) - 2;


}
let first = true;
enum State { NotInitialized, Initialized }

let currState = State.NotInitialized;
let firstSend = true;







import { SymbolKind, WorkspaceEditClientCapabilities, CompletionItemKind, ResourceOperationKind, FailureHandlingKind, ClientCapabilities } from "ts-lsp-client"
import { ResponseMessage } from "./TypeDefinitions";























































