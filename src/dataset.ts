import { User, UserFacets } from "./models/user";
import { Organization, OrganizationFacets } from "./models/organization";
import { Ticket, TicketFacets } from "./models/ticket";

/**
 * DataType enum used in reflection when parsing objects.
 * This is due to the fact that after transpilation, all entities are simply 'objects'.
 * Some additional metadata must be added in order to determine their type and safely cast.
 */
export enum DataType {
    User = "User",
    Organization = "Organization",
    Ticket = "Ticket"
}

export interface Dataset {
    users: User[];
    organizations: Organization[];
    tickets: Ticket[];
}

export function getFacetsByDataType(dataType: DataType): string[] {
    const dataTypeToFacetMapping: Record<DataType, string[]> = {
        [DataType.User]: UserFacets,
        [DataType.Organization]: OrganizationFacets,
        [DataType.Ticket]: TicketFacets
    };

    return dataTypeToFacetMapping[dataType];
}

export function getCollectionByType(dataset: Dataset, dataType: DataType) {
    return {
        [DataType.User]: dataset.users,
        [DataType.Organization]: dataset.organizations,
        [DataType.Ticket]: dataset.tickets
    }[dataType]
}