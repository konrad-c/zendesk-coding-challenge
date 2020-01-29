export interface Ticket {
    _id: string,
    url: string,
    external_id: string,
    created_at: Date,
    type: "incident" | "problem" | "question" | "task",
    subject: string,
    description: string,
    priority: "low" | "normal" | "high" | "urgent",
    status: "closed" | "hold" | "open" | "solved" | "pending",
    submitter_id: number,
    assignee_id: number,
    organization_id: number,
    tags: string[],
    has_incidents: boolean,
    due_at: Date,
    via: "voice" | "chat" | "web"
}