export type Formatter = (object: Object) => string;

export function createJsonFormatter(indentation: number): Formatter {
    return (object: Object) => JSON.stringify(object, null, indentation);
}