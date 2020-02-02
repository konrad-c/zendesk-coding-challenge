import { Option, Some, None } from '@usefultools/monads';

export function search<TObject>(data: TObject[], comparer: (object: TObject) => boolean): Option<TObject> {
    const validObject: TObject | undefined = data.find(comparer);
    return validObject
        ? Some(validObject)
        : None;
}

export function facetSearch<TObject extends any>(
    collection: TObject[],
    facetName: string,
    facetValue: any
): Option<TObject> {
    const discoveredObject: TObject | undefined = collection
        .find(object => object[facetName] == facetValue);
    return discoveredObject
        ? Some(discoveredObject)
        : None;
}