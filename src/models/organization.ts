import { Entity } from "./entity";

import { DataType } from "../dataset";

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

export const OrganizationFacets: string[] = [
    "_id",
    "url",
    "external_id",
    "name",
    "domain_names",
    "created_at",
    "details",
    "shared_tickets",
    "tags",
]