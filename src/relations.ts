import { Option } from '@usefultools/monads';
import { Dataset } from "./dataset";
import { DataType, Entity } from "./models/entity";
import { User, getOrganization as getUserOrganization } from "./models/user";
import { Ticket, getSubmitter, getAssignee, getOrganization as getTicketOrganization } from "./models/ticket";
import { Organization, getUsers, getTickets } from './models/organization';

export function getUserRelations(dataset: Dataset, user: User) {
    return {
        Organization: getUserOrganization(dataset, user)
    };
}

export function getTicketRelations(dataset: Dataset, ticket: Ticket) {
    return {
        Submitter: getSubmitter(dataset, ticket),
        Assignee: getAssignee(dataset, ticket),
        Organization: getTicketOrganization(dataset, ticket)
    };
}

export function getOrganizationRelations(dataset: Dataset, organization: Organization) {
    return {
        Users: getUsers(dataset, organization),
        Tickets: getTickets(dataset, organization)
    };
}

export function getEntityRelations(dataset: Dataset, entity: Entity): Record<string, Option<Entity>> {
    switch (entity.datatype) {
        case DataType.User:
            return getUserRelations(dataset, entity as User);
        case DataType.Ticket:
            return getTicketRelations(dataset, entity as Ticket);
        // case DataType.Organization:
        //     return getOrganizationRelations(dataset, entity as Organization);
        default:
            return {};
    }
}