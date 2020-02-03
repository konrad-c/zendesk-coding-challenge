import { readFile } from 'fs';
import { promisify } from 'util';
import { deserializeArray } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';

const readFilePromisified = promisify(readFile);

export async function readFileAsObjectCollection<TContent>(path: string, classType: ClassType<TContent>): Promise<TContent[]> {
    const fileBuffer: Buffer = await readFilePromisified(path);
    const fileContents: string = fileBuffer.toString();
    return deserializeArray(classType, fileContents);
}