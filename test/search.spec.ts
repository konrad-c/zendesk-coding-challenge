import { facetSearch } from '../src/search';

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
            const searchResult = facetSearch(testData, "facet3", 0).unwrap();
            const expectedResult = { facet3: 0 };
            expect(searchResult).toEqual(expectedResult);
        });

        it("should return None if key/value pair not found", () => {
            const searchResult = facetSearch(testData, "not-found", 0);
            expect(searchResult.is_none()).toBeTruthy();
        });

        it("should return first record if multipel records match key/value pair", () => {
            const searchResult = facetSearch(testData, "facet2", 1).unwrap();
            const expectedResult = {
                facet1: 0,
                facet2: 1
            };
            expect(searchResult).toEqual(expectedResult);
        });
    });
});