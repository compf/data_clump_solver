export abstract class LanguageModelInterface{
     abstract sendMessage(message:string):Promise<string>;
}