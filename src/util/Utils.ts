import { Minimatch } from "minimatch";
import { FileFilteringContext } from "../context/DataContext";
import fs from "fs"
import path from "path";
export const MiniMatchConf = { dot: true, matchBase: true };
  /** 
* Recursively traverse through the directory and find all relavant files
* @param baseDir the current directory to enumerate the files there
* @param resultArray will be filled during the recursion to store all relevant files
*/
export function getRelevantFilesRec(baseDir: string, resultArray: string[],fileFilteringContext:FileFilteringContext|null): void {
    let entries = fs.readdirSync(baseDir, { withFileTypes: true });
    for (let entry of entries) {
        let fullname = path.join(baseDir, entry.name);
        if (entry.isDirectory()) {
            getRelevantFilesRec(fullname, resultArray,fileFilteringContext);
        } else {
            if (shallIgnore(fullname,fileFilteringContext)) {
                continue;
            }
            resultArray.push(fullname);
        }
    }
}
function  shallIgnore(filePath: string,fileFilteringContext:FileFilteringContext|null): boolean {
    if ( fileFilteringContext==null && !filePath.endsWith(".java")) {
        console.log("ignore",filePath)
        return true;
    }
    if (fileFilteringContext == null) {
        return false
    }

    let includeGlobs = fileFilteringContext.includeGlobs
    let excludeGlobs = fileFilteringContext.excludeGlobs
    let isIncluded = includeGlobs.length == 0
    let isExcluded = false
    for (let includeGlob of includeGlobs) {
        if (new Minimatch(includeGlob,MiniMatchConf).match(filePath,true)) {
            isIncluded = true
            break
        }
    }
    for (let excludeGlob of excludeGlobs) {
        if (new Minimatch(excludeGlob,MiniMatchConf).match(filePath)) {
            isExcluded = true
            break
        }
    }
    return isExcluded || !isIncluded
}