import { DataType, Entity } from "./entity";
import { Dataset } from "../dataset";
import { Organization } from "./organization";
import { Ticket } from "./ticket";

export class User implements Entity {
    datatype: DataType = DataType.User;
    _id: number;
    url: string;
    external_id: string;
    name: string;
    alias: string;
    created_at: Date;
    active: boolean;
    verified: boolean;
    shared: boolean;
    locale: string;
    timezone: string;
    last_login_at: Date;
    email: string;
    phone: string;
    signature: string;
    organization_id: number;
    tags: string[];
    suspended: boolean;
    role: "admin" | "agent" | "end-user";
}

export const getOrganization = (dataset: Dataset, user: User): Organization | undefined => dataset.organizations.find(org => org._id == user.organization_id);
export const getSubmittedTickets = (dataset: Dataset, user: User): Ticket[] => dataset.tickets.filter(ticket => ticket.submitter_id == user._id);
export const getAssignedTickets = (dataset: Dataset, user: User): Ticket[] => dataset.tickets.filter(ticket => ticket.assignee_id == user._id);