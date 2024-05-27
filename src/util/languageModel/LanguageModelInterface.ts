export type MessageType="input" | "output"|"system"
export type ChatMessage = { messages: string[], messageType: MessageType }
export const LanguageModelInterfaceCategory = "LanguageModelInterface"
export type TokenStats={
     prompt_tokens?: number,
     completion_tokens?: number,
     total_tokens?: number

}
export abstract class LanguageModelInterface {
     abstract prepareMessage(message: string,messageType?:MessageType): ChatMessage;
     abstract sendMessages(clear: boolean): Promise<ChatMessage>
     abstract clear(): void
     abstract getTokenStats():TokenStats
}