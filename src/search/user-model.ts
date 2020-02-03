import { Boolean, Number, String, Collection, Date, Choice } from './field-type';
import { SearchModel } from './index';

export const UserModel: SearchModel = [
    Number("_id"),
    String("url"),
    String("external_id"),
    String("name"),
    String("alias"),
    Date("created_at"),
    Boolean("active"),
    Boolean("verified"),
    Boolean("shared"),
    String("locale"),
    String("timezone"),
    Date("last_login_at"),
    String("email"),
    String("phone"),
    String("signature"),
    Number("organization_id"),
    Collection("tags"),
    Boolean("suspended"),
    new Choice("role", ["admin", "agent", "end-user"])
]