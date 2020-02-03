import { Boolean, Number, String, Collection, Date } from './field-type';
import { SearchModel } from './index';

export const OrganizationModel: SearchModel = [
    Number("_id"),
    String("url"),
    String("external_id"),
    String("name"),
    Collection("domain_names"),
    Date("created_at"),
    String("details"),
    Boolean("shared_tickets"),
    Collection("tags"),
]