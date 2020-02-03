import Table from 'cli-table';

export type Formatter = (object: Object) => string;

export function createJsonFormatter(indentation: number): Formatter {
    return (object: Object) => JSON.stringify(object, null, indentation);
}

export function createTableFormatter(): Formatter {
    return (object: object) => {
        const table = new Table();
        table.push([ "Field", "Value"]);
        table.push(...Object.entries(object));
        return table.toString();
    }
}