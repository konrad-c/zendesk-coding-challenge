import { readFile } from 'fs';
import { promisify } from 'util';

const readFilePromisified = promisify(readFile);

export async function readFileAsJson<TContent>(path: string): Promise<TContent> {
    const fileBuffer: Buffer = await readFilePromisified(path);
    const fileContents: string = fileBuffer.toString();
    return JSON.parse(fileContents);
}