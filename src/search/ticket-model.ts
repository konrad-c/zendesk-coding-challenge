import { Boolean, Number, String, Collection, Date, Choice } from './field-type';
import { SearchModel } from './index';

export const TicketModel: SearchModel = [
    String("_id"),
    String("url"),
    String("external_id"),
    Date("created_at"),
    String("subject"),
    String("description"),
    Number("submitter_id"),
    Number("assignee_id"),
    Number("organization_id"),
    Collection("tags"),
    Boolean("has_incidents"),
    Date("due_at"),
    new Choice("type", ["incident", "problem", "question", "task"]),
    new Choice("priority", ["low", "normal", "high", "urgent"]),
    new Choice("status", ["closed", "hold", "open", "solved", "pending"]),
    new Choice("via", ["voice", "chat", "web"]),
]