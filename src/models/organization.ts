import { DataType, Entity } from "./entity";
import { Dataset } from "../dataset";
import { User } from "./user";
import { Ticket } from "./ticket";

export class Organization implements Entity {
    datatype: DataType = DataType.Organization;
    _id: number;
    url: string;
    external_id: string;
    name: string;
    domain_names: string[];
    created_at: Date;
    details: string;
    shared_tickets: boolean;
    tags: string[];
}

export const getUsers = (dataset: Dataset, organization: Organization): User[] => dataset.users.filter(user => user.organization_id == organization._id);
export const getTickets = (dataset: Dataset, organization: Organization): Ticket[] => dataset.tickets.filter(ticket => ticket.organization_id == organization._id);