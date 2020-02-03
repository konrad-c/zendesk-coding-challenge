import { DataType, Entity } from "./entity";
import { Dataset } from "../dataset";
import { search } from '../search/index';

export class Ticket implements Entity {
    datatype: DataType = DataType.Ticket;
    _id: string;
    url: string;
    external_id: string;
    created_at: Date;
    type: "incident" | "problem" | "question" | "task";
    subject: string;
    description: string;
    priority: "low" | "normal" | "high" | "urgent";
    status: "closed" | "hold" | "open" | "solved" | "pending";
    submitter_id: number;
    assignee_id: number;
    organization_id: number;
    tags: string[];
    has_incidents: boolean;
    due_at: Date;
    via: "voice" | "chat" | "web";
}

export const getSubmitter = (dataset: Dataset, ticket: Ticket) => search(dataset.users, user => user._id == ticket.submitter_id);
export const getAssignee = (dataset: Dataset, ticket: Ticket) => search(dataset.users, user => user._id == ticket.assignee_id);
export const getOrganization = (dataset: Dataset, ticket: Ticket) => search(dataset.organizations, org => org._id == ticket.organization_id);