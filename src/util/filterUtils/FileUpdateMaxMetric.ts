import { FileUpdateMetric } from "./FileUpdateMetric";

export class FileUpdateMaxMetric extends FileUpdateMetric {
    evaluateTimestamps(timestamps: Date[]): number {
        return  Math.max(...timestamps.map((it)=>it.getTime()))
    }
}