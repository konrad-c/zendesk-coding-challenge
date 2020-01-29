export interface Organization {
    _id: number,
    url: string,
    external_id: string,
    name: string,
    domain_names: string[],
    created_at: Date,
    details: string,
    shared_tickets: boolean,
    tags: string[]
}