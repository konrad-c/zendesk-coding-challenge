import { search, facetSearch } from '../src/search/index';
import { Facet, Number } from '../src/search/field-type';

const testData: Record<string, any>[] = [
    {
        facet1: 0,
        facet2: 1
    },
    {
        facet1: 1,
        facet2: 1
    },
    {
        facet3: 0
    }
];

describe("Search", () => {
    describe("Facet search", () => {
        it("should return record if key/value pair exists", () => {
            const facet: Facet = Number("facet3");
            const searchResult = facetSearch(testData, facet, 0).unwrap();
            const expectedResult = { facet3: 0 };
            expect(searchResult).toEqual(expectedResult);
        });

        it("should return None if key/value pair not found", () => {
            const missingFacet: Facet = Number("not-found");
            const searchResult = facetSearch(testData, missingFacet, 0);
            expect(searchResult.is_none()).toBeTruthy();
        });

        it("should return first record if multiple records match key/value pair", () => {
            const facet: Facet = Number("facet2");
            const searchResult = facetSearch(testData, facet, 1).unwrap();
            const expectedResult = {
                facet1: 0,
                facet2: 1
            };
            expect(searchResult).toEqual(expectedResult);
        });
    });

    describe("Collection search", () => {
        it("should return Some(...) when object exists", () => {
            const result = search(testData, obj => obj.facet1 == 0).unwrap();
            const expectedResult = { facet1: 0, facet2: 1 };
            expect(result).toEqual(expectedResult);
        });

        it("should return None when object cannot be found", () => {
            const result = search(testData, obj => obj.notFound == 0);
            expect(result.is_none()).toBeTruthy();
        });
    })
});