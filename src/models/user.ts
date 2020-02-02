export class User {
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

export const UserFacets: string[] = [
    "_id",
    "url",
    "external_id",
    "name",
    "alias",
    "created_at",
    "active",
    "verified",
    "shared",
    "locale",
    "timezone",
    "last_login_at",
    "email",
    "phone",
    "signature",
    "organization_id",
    "tags",
    "suspended",
    "role",
]