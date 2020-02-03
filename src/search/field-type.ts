export enum FieldType {
    Boolean,
    Number,
    String,
    Date,
    Collection,
    Choice
} 

export interface Facet {
    name: string;
    type: FieldType;
    /**
     * Allow facets to specify how they are searched given an object and a search query value
     */
    search: (facetValue: any, searchValue: any) => boolean;
}

const basicFacetEqualitySearch = (facetValue: any, value: any) => facetValue == value;

const BasicField = (type: FieldType) => (name: string): Facet => ({
    name,
    type,
    search: basicFacetEqualitySearch
});

export const Boolean = BasicField(FieldType.Boolean);
export const Date = BasicField(FieldType.Date);
export const Number = BasicField(FieldType.Number);
export const String = BasicField(FieldType.String);

export const Collection = (name: string) => ({
    name,
    type: FieldType.Collection,
    search: (facetValue: any[], value: any) => facetValue.includes(value)
});

export class Choice implements Facet {
    type = FieldType.Choice;
    search = basicFacetEqualitySearch;
    name: string;
    choices: any[];
    constructor(name: string, choices: any[]){
        this.name = name;
        this.choices = choices;
    }
}