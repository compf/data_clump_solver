import fs from "fs"
import net from "net"
import ollama, { ChatResponse, Message } from "ollama"
const PORT = 1997
const HOST = "127.0.0.1"
import { Agent } from "undici";

globalThis[Symbol.for("undici.globalDispatcher.1")] = new Agent({
    headersTimeout: 1000 * 60 * 60 * 24,
});
import http from "https"
import { ChatMessage, LanguageModelInterface, MessageType } from "./LanguageModelInterface";
import ChildProcessWithoutNullStreams = require("child_process");
import { OutputChecker } from "./OutputChecker"
import { resolveFromConcreteName } from "../../config/Configuration"
import { coerceBoolean } from "openai/core.mjs"
export class OllamaInterface extends LanguageModelInterface {
    private static staticClient: net.Socket | null = null;
    private shallClear = false;
    private newMessages: string[] = []
    private temperature = 0.1
    private model = "phind-codellama"
    constructor(args: { model: string, temperature: number, outputCheckers: string[] } | undefined) {
        super();



        let temperature: number
        if (args) {
            this.temperature = args.temperature
            this.model = args.model;


        }
        else {
            temperature = 0.9
        }


    }

    clear(): void {
        this.messages = []
    }
    private messages: Message[] = []
    private lastUsage = {
        prompt_tokens: 0,
        completion_tokens: 0,
        total_tokens: 0
    }
    extractJSON(response: string): string {
        let from = response.indexOf("{")
        let to = response.lastIndexOf("}") + 1
        let onlyJson = response.slice(from, to)
        console.log("ONLY Json", onlyJson);
        return onlyJson;
    }
    async sendMessages(clear: boolean): Promise<ChatMessage> {

        if (this.messages.length == 0) return { messages: [], messageType: "output" }


        let valid = true;
        let response: ChatResponse = {} as any

        console.log("SENDING", this.messages)
        response = await ollama.chat({
            model: this.model,
            options: {
                temperature: this.temperature
            },
            messages: this.messages,
            /*format:"json"*/stream: false
        })
        console.log(response)
        this.messages.push({ content: response.message.content, role: "assistant" })
        fs.writeFileSync("stuff/phindra_output.txt", response.message.content)

        if (clear) {
            this.clear();
        }

        return Promise.resolve({
            messageType: "output",
            messages: [response.message.content]
        })





    }











    getTokenStats(): { prompt_tokens: number; completion_tokens: number; total_tokens: number; } {
        return this.lastUsage

    }
    prepareMessage(message: string, messageType?: MessageType): ChatMessage {
        let chatMsg = { messages: [message], messageType: messageType ?? "input" }
        let role = "user";
        if (messageType == "system") {
            role = "assistant"
        }
        this.messages.push({ content: message, role })
        return chatMsg;

    }

}