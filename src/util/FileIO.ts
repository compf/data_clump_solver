import * as fs from 'fs';
export abstract class FileIO{
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