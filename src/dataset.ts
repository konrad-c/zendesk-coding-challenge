import { DataType } from "./models/entity";
import { User } from "./models/user";
import { Organization } from "./models/organization";
import { Ticket } from "./models/ticket";
import { UserModel } from "./search/user-model";
import { OrganizationModel } from "./search/organization-model";
import { TicketModel } from "./search/ticket-model";
import { SearchModel } from "./search/index";
import { resolve } from "path";
import { readFileAsObjectCollection } from "./json-reader";

/**
 * Load User, Organization, and Ticket data from files in the directory specified.
 * Expects files to be named 'users.json', 'organizations.json', and 'tickets.json' respectively.
 * @param dataDirectory Relative or absolute path to the directory containing these files. 
 */
export async function loadData(
    userPath: string = "./data/users.json",
    ticketsPath: string = "./data/tickets.json",
    organizationsPath: string = "./data/organizations.json"
): Promise<Dataset> {
    const resolvedUserPath: string = resolve(userPath),
        resolvedTicketsPath: string = resolve(ticketsPath),
        resolvedOrganizationsPath: string = resolve(organizationsPath);

    return ({
        users: await readFileAsObjectCollection(resolvedUserPath, User),
        organizations: await readFileAsObjectCollection(resolvedOrganizationsPath, Organization),
        tickets: await readFileAsObjectCollection(resolvedTicketsPath, Ticket)
    });
}

export interface Dataset {
    users: User[];
    organizations: Organization[];
    tickets: Ticket[];
}

export function getSearchModelByDataType(dataType: DataType): SearchModel {
    const dataTypeToSearchModelMapping: Record<DataType, SearchModel> = {
        [DataType.User]: UserModel,
        [DataType.Organization]: OrganizationModel,
        [DataType.Ticket]: TicketModel
    };

    return dataTypeToSearchModelMapping[dataType];
}

export function getCollectionByType(dataset: Dataset, dataType: DataType) {
    return {
        [DataType.User]: dataset.users,
        [DataType.Organization]: dataset.organizations,
        [DataType.Ticket]: dataset.tickets
    }[dataType]
}