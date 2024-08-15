import * as fs from 'fs';
export abstract class FileIO{
    public static instance:FileIO;
    readFileSync(path:string):string{
        path=this.resolvePath(path)
       return  fs.readFileSync (path,{encoding:"utf-8"})
    }
    writeFileSync(path:string,data:string):void{
        path=this.resolvePath(path)

        fs.writeFileSync(path,data)
    }

    existsSync(path:string):boolean{
        path=this.resolvePath(path)

        return fs.existsSync(path);
    }

    abstract resolvePath(path:string):string
}

export class StubPathIO extends FileIO{
    resolvePath(path: string): string {
        return "stuff/"+path;
    }
}