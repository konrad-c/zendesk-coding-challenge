/**
 * DataType enum used in reflection when parsing objects.
 * This is due to the fact that after transpilation, all entities are simply 'objects'.
 * Some additional metadata must be added in order to determine their type and safely cast.
 */
export enum DataType {
    User = "User",
    Organization = "Organization",
    Ticket = "Ticket"
}

export interface Entity {
    datatype: DataType;
}