import { DataType, Entity } from "./entity";
import { Dataset } from "../dataset";
import { search } from '../search/index';

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

export const getOrganization = (dataset: Dataset, user: User) => search(dataset.organizations, org => org._id == user.organization_id);