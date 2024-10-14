import {dirname, resolve} from "path";
import fs from "fs";
import { DataClumpRefactoringContext } from "../../context/DataContext";
const permutator = (inputArr: any[]) => {
    let result: any[] = [];

    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m)
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next))
            }
        }
    }

    permute(inputArr)

    return result;
}
let results: { [path: string]: any } = {}
function saveResults() {
    for (let p of Object.keys(results)) {
        fs.mkdirSync(dirname(p), { recursive: true })
        fs.writeFileSync(p, JSON.stringify(results[p], undefined, 2))
    }


}

function createResults(prefix: string, path: string, keyNames: string[], keys: { [key: string]: string }, val: any) {
    let outPath = resolve("evalDataResults", prefix, path, keys[keyNames[0]], keys[keyNames[1]]) + ".json"

    let obj = {}
    if (outPath in results) {
        obj = results[outPath]
    }
    obj[keys[keyNames[2]]] = val;
    results[outPath] = obj;
}
export type MetricMapper = { [key: string]: { (instances: any):number[] } };
export type FilterMapper = { [key: string]: { (d: any): boolean } };
export function concatenateResults(prefix: string, data: any[], filters:FilterMapper, metrics: MetricMapper) {
    let folderNames = ["Function", "Metric", "Filter"]
    let keyNames = ["functionKey", "metricKey", "filterKey"]

    let folderPermutations = permutator(folderNames)
    let keyPermutations = permutator(keyNames)

    let zipped: { [key: string]: string[] } = {}
    for (let i = 0; i < folderPermutations.length; i++) {
        zipped[folderPermutations[i].join("")] = keyPermutations[i]
    }

    for (let functionKey of Object.keys(statFunctions)) {
        let f = statFunctions[functionKey]

        for (let metricKey of Object.keys(metrics)) {



            for (let filterKey of Object.keys(filters)) {
                let keys = {
                    functionKey: functionKey,
                    metricKey: metricKey,
                    filterKey: filterKey
                }
                let filter = filters[filterKey]
                let relevantInstances = data.filter((it) => filter(it))
                if (relevantInstances.length == 0) {
                    continue
                }
                let mapped = metrics[metricKey](relevantInstances)
                let res = f(mapped)
                console.log(metricKey, filterKey, res)

                if (true) {
                    for (let folderKey of Object.keys(zipped)) {
                        createResults(prefix, folderKey, zipped[folderKey], keys, res)
                    }

                }

            }
        }
    }
    saveResults()

}

export function mean(array: any[]) {
    if (array.length == 0) {
        return 0;
    }
    if (typeof (array[0]) == "number") {
        array = array.filter((it) => !isNaN(it))
        if (array.length == 0) {
            return 0;
        }
        return array.reduce((a, b) => a + b) / array.length
    }
    else if (typeof (array[0]) == "object") {
        console.log(array)
        let result = {}
        for (let key of Object.keys(array[0])) {
            result[key] = mean(array.map((it) => it[key]))
        }
        return result;
    }
}

export function median(array: any[]) {
    array.sort((a, b) => a - b)
    let mid = Math.floor(array.length / 2)
    if (array.length % 2 == 0) {
        return (array[mid - 1] + array[mid]) / 2
    }
    else {
        return array[mid]
    }
}

export function variance(array: any[]) {
    array = array.filter((it) => !isNaN(it as number))
    let m = mean(array) as number
    let sum = 0;
    for (let a of array) {
        sum += (a - m) ** 2
    }
    if (isNaN(sum)) {
        console.log(array)
        console.log(m)
        throw "invalid"
    }
    return sum / array.length
}
function groupedCount(array: any[]) {
    let result = {}
    for (let a of array) {
        if (!(a in result)) {
            result[a] = 0
        }
        result[a]++
    }
    return result
}
export const statFunctions = {
    "mean": mean,
    "count": (a) => a.length,
    "groupedCount": groupedCount,
    raw:(a)=>a
}
