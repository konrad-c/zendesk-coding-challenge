import { Dataset } from "./dataset";
import { DataType, Entity } from "./models/entity";
import { User, getOrganization as getUserOrganization } from "./models/user";
import { Ticket, getSubmitter, getAssignee, getOrganization as getTicketOrganization } from "./models/ticket";
import { Organization, getUsers, getTickets } from './models/organization';

export function getUserRelations(dataset: Dataset, user: User) {
    const organization: Organization | undefined = getUserOrganization(dataset, user);
    return {
        Organization: organization ? [organization] : []
    };
}

export function getTicketRelations(dataset: Dataset, ticket: Ticket) {
    const submitter: User | undefined = getSubmitter(dataset, ticket);
    const assignee: User | undefined = getAssignee(dataset, ticket);
    const organization: Organization | undefined = getTicketOrganization(dataset, ticket);
    return {
        Submitter: submitter ? [submitter] : [],
        Assignee: assignee ? [assignee] : [],
        Organization: organization ? [organization] : []
    };
}

export function getOrganizationRelations(dataset: Dataset, organization: Organization) {
    return {
        Users: getUsers(dataset, organization),
        Tickets: getTickets(dataset, organization)
    };
}

export function getEntityRelations(dataset: Dataset, entity: Entity): Record<string, Entity[]> {
    switch (entity.datatype) {
        case DataType.User:
            return getUserRelations(dataset, entity as User);
        case DataType.Ticket:
            return getTicketRelations(dataset, entity as Ticket);
        case DataType.Organization:
            return getOrganizationRelations(dataset, entity as Organization);
        default:
            return {};
    }
}