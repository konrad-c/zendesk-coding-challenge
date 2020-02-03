import { DataType } from "../models/entity";
import { listPrompt } from "./list-prompt";

export async function dataTypePrompt(): Promise<DataType> {
    const datasetList = [
        { name: 'Users', value: DataType.User },
        { name: 'Organizations', value: DataType.Organization },
        { name: 'Tickets', value: DataType.Ticket }
    ];
    return listPrompt('Which dataset would you like to search?', datasetList);
}