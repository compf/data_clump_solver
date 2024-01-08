export type ChatMessage = { messages: string[], messageType: "input" | "output" }
export const LanguageModelInterfaceCategory = "LanguageModelInterface"
export abstract class LanguageModelInterface {
     abstract prepareMessage(message: string): ChatMessage;
     abstract sendMessages(clear: boolean): Promise<ChatMessage>
     abstract clear(): void
     abstract getTokenStats(): {
          prompt_tokens: number,
          completion_tokens: number,
          total_tokens: number
     };
}