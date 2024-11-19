export interface ProgrammingLanguageService {
    getExtension(): string
}

export class javaService implements ProgrammingLanguageService {
    getExtension(): string {
        return ".java"
    }
}