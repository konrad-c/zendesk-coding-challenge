import { Facet } from './field-type';

export type SearchModel = Facet[]

export function getSearchableFacets(searchModel: SearchModel): string[] {
    return searchModel.map(field => field.name);
}

export function getSearchableFieldByName(searchModel: SearchModel, fieldName: string): Facet | undefined {
    return searchModel.find(field => field.name == fieldName);
}

export function filterByFacet<TObject extends any>(
    collection: TObject[],
    facet: Facet,
    facetValue: any,
): TObject[] {
    return collection.filter(object => facet.search(object[facet.name], facetValue));
}

export function facetSearch<TObject extends any>(
    collection: TObject[],
    facet: Facet,
    facetValue: any,
): TObject | undefined {
    return collection.find(object => facet.search(object[facet.name], facetValue));
}