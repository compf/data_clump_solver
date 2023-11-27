export abstract class LanguageModelInterface{
     abstract prepareMessage(message:string):LanguageModelInterface;
     abstract sendMessages(clear:boolean):Promise<string|null>
}