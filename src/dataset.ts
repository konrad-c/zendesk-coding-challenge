import { Option } from '@usefultools/monads';
import { User, UserFacets } from "./models/user";
import { Organization, OrganizationFacets } from "./models/organization";
import { Ticket, TicketFacets } from "./models/ticket";
import { search } from './search';

export enum DataType {
    User = "User",
    Organization = "Organization",
    Ticket = "Ticket"
}

export function getDataTypeFacets(dataType: DataType): string[] {
    const dataTypeToFacetMapping: Record<DataType, string[]> = {
        [DataType.User]: UserFacets,
        [DataType.Organization]: OrganizationFacets,
        [DataType.Ticket]: TicketFacets
    };

    return dataTypeToFacetMapping[dataType];
}

export interface Dataset {
    users: User[];
    organizations: Organization[];
    tickets: Ticket[];
}

export function getCollectionByType(dataset: Dataset, dataType: DataType) {
    return {
        [DataType.User]: dataset.users,
        [DataType.Organization]: dataset.organizations,
        [DataType.Ticket]: dataset.tickets
    }[dataType]
}

export function getUserRelations(dataset: Dataset, user: User): Record<string, () => Option<object>> {
    return {
        Organization: () => search(dataset.organizations, org => org._id == user.organization_id)
    };
}

export function getTicketRelations(dataset: Dataset, ticket: Ticket): Record<string, () => Option<object>> {
    return {
        Submitter: () => search(dataset.users, user => user._id == ticket.submitter_id),
        Assignee: () => search(dataset.users, user => user._id == ticket.assignee_id),
        Organization: () => search(dataset.organizations, org => org._id == ticket.organization_id)
    };
}

export function getEntityRelations(dataset: Dataset, datatype: DataType, entity: object): Record<string, () => Option<object>> {
    switch(datatype){
        case DataType.User:
            return getUserRelations(dataset, entity as User);
        case DataType.Ticket:
            return getTicketRelations(dataset, entity as Ticket);
        default:
            return {};
    }
}