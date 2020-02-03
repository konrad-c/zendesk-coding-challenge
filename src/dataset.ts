import { DataType } from "./models/entity";
import { User } from "./models/user";
import { Organization } from "./models/organization";
import { Ticket } from "./models/ticket";
import { UserModel } from "./search/user-model";
import { OrganizationModel } from "./search/organization-model";
import { TicketModel } from "./search/ticket-model";
import { SearchModel } from "./search/index";

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