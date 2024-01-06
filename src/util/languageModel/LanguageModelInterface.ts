export type ChatMessage={messages:string[],messageType:"input"|"output"}
export const LanguageModelInterfaceCategory="LanguageModelInterface"
export abstract class LanguageModelInterface{
     abstract prepareMessage(message:string):ChatMessage;
     abstract sendMessages(clear:boolean):Promise<ChatMessage>
}