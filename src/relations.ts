import { Option } from '@usefultools/monads';
import { Dataset, DataType } from "./dataset";
import { User } from "./models/user";
import { Entity } from "./models/entity";
import { Ticket } from "./models/ticket";

export function getUserRelations(dataset: Dataset, user: User) {
    return {
        Organization: user.getOrganization(dataset)
    };
}

export function getTicketRelations(dataset: Dataset, ticket: Ticket) {
    return {
        Submitter: ticket.getSubmitter(dataset),
        Assignee: ticket.getAssignee(dataset),
        Organization: ticket.getOrganization(dataset)
    };
}

export function getEntityRelations(dataset: Dataset, entity: Entity): Record<string, Option<Entity>> {
    switch (entity.datatype) {
        case DataType.User:
            return getUserRelations(dataset, entity as User);
        case DataType.Ticket:
            return getTicketRelations(dataset, entity as Ticket);
        default:
            return {};
    }
}