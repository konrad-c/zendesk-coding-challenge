import { Option, Some, None } from '@usefultools/monads';
import { Facet } from './field-type';

export type SearchModel = Facet[]

export function getSearchableFacets(searchModel: SearchModel): string[] {
    return searchModel.map(field => field.name);
}

export function getSearchableFieldByName(searchModel: SearchModel, fieldName: string): Option<Facet> {
    return search(searchModel, field => field.name == fieldName);
}

export function search<TObject>(data: TObject[], comparer: (object: TObject) => boolean): Option<TObject> {
    const validObject: TObject | undefined = data.find(comparer);
    return validObject
        ? Some(validObject)
        : None;
}

export function first<TObject extends any>(
    collection: TObject[],
    facet: Facet,
    facetValue: any,
): Option<TObject> {
    const discoveredObject: TObject | undefined = collection
        .find(object => facet.search(object[facet.name], facetValue));
    return discoveredObject
        ? Some(discoveredObject)
        : None;
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
): Option<TObject> {
    const discoveredObject: TObject | undefined = collection
        .find(object => facet.search(object[facet.name], facetValue));
    return discoveredObject
        ? Some(discoveredObject)
        : None;
}