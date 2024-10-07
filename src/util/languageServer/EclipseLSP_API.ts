import { Readable, Writable } from "stream";
import { spawn } from "child_process"
import {resolve} from "path"
import { LanguageServerAPI, LSP_State } from "./LanguageServerAPI";
import { ResponseMessage } from "./TypeDefinitions";
import { tryParseJSON } from "../Utils";
export class EclipseLSP_API extends LanguageServerAPI {
    async init(path:string,callback:{(data:ResponseMessage):void}): Promise<{ reader: Readable; writer: Writable; }> {
        let cp = spawn("/bin/bash", ["dist/eclipse.jdt.ls/run.sh"], { stdio: "pipe" });
        this.childProcess=cp;
        cp.stderr.on("data",(d)=>{
            console.log ("ERROR",d.toString())
        })
        
        super.callInitialize(cp.stdin, path);
        let buffer=""
        let data = cp.stdout.on("data", (data: Buffer) => {
            let s = data.toString("utf-8")
            s = s.replace(/\}C/g, "\}\r\n\r\nC")
            s=buffer+s;
            //console.log(s)

            let splitted = s.split("\r\n");
            for (let line of splitted) {
                if (line.startsWith("Content-Length: ")) {
                }
                else if (line.startsWith("{")) {
                    let content = tryParseJSON(line)
                    if(content==null){
                        buffer=line;
                        return;
                    }
                    else{
                        buffer="";
                    }
                    if (this.currState == LSP_State.NotInitialized && content.id == 1 && this.first) {
                        this.first = false;
                        this.currState = LSP_State.Initialized;
                        console.log("sending init")
                        super.callInitialized(cp.stdin)
                        cp.stdout.emit("initialized")

                    }
                    else{
                        callback(content as ResponseMessage)
                    }
                   
                }
            }
        })

        return new Promise(resolve => {
            data.on("initialized", () => {
                resolve({ reader: cp.stdout, writer: cp.stdin })
            })

        });
    }
}


