import { search, facetSearch } from '../src/search/index';
import { Facet, Boolean, Number, String, Collection } from '../src/search/field-type';

const testData: Record<string, any>[] = [
    { facet1: 0, facet2: ["first"], facet3: false,  facet4: "" },
    { facet1: 1, facet2: [],        facet3: false,  facet4: "" },
    { facet1: 1, facet2: ["second"],facet3: false,  facet4: "" },
    { facet1: 2, facet2: [],        facet3: true,   facet4: "" },
    { facet1: 3, facet2: [],        facet3: false,  facet4: "string" }
];

describe("Search", () => {
    describe("Facet search", () => {
        it("should return record if key/value pair exists", () => {
            const facet: Facet = Number("facet1");
            const searchResult = facetSearch(testData, facet, 2).unwrap();
            const expectedResult = { facet1: 2, facet2: [], facet3: true, facet4: "" };
            expect(searchResult).toEqual(expectedResult);
        });

        it("should return None if search result not found", () => {
            const facet: Facet = Number("facet1");
            const searchResult = facetSearch(testData, facet, -1);
            expect(searchResult.is_none()).toBeTruthy();
        });

        it("should return first record if multiple records match key/value pair", () => {
            const facet: Facet = Number("facet1");
            const searchResult = facetSearch(testData, facet, 1).unwrap();
            const expectedResult = { facet1: 1, facet2: [], facet3: false, facet4: "" };
            expect(searchResult).toEqual(expectedResult);
        });

        it("should return boolean facets that exist", () => {
            const facet: Facet = Boolean("facet3");
            const searchResult = facetSearch(testData, facet, true).unwrap();
            const expectedResult = { facet1: 2, facet2: [], facet3: true, facet4: "" };
            expect(searchResult).toEqual(expectedResult);
        });

        it("should return string facets that exist", () => {
            const facet: Facet = String("facet4");
            const searchResult = facetSearch(testData, facet, "string").unwrap();
            const expectedResult = { facet1: 3, facet2: [], facet3: false, facet4: "string" };
            expect(searchResult).toEqual(expectedResult);
        });

        it("should return collection facets that contain search value", () => {
            const facet: Facet = Collection("facet2");
            const searchResult = facetSearch(testData, facet, "first").unwrap();
            const expectedResult = { facet1: 0, facet2: ["first"], facet3: false, facet4: "" };
            expect(searchResult).toEqual(expectedResult);
        });

        it("should return None when collection facet does not contain search value", () => {
            const facet: Facet = Collection("facet2");
            const searchResult = facetSearch(testData, facet, "not-found");
            expect(searchResult.is_none()).toBeTruthy();
        });
    });

    describe("Collection search", () => {
        it("should return Some(...) when object exists", () => {
            const result = search(testData, obj => obj.facet1 == 1).unwrap();
            const expectedResult = { facet1: 1, facet2: [], facet3: false, facet4: "" };
            expect(result).toEqual(expectedResult);
        });

        it("should return None when object cannot be found", () => {
            const result = search(testData, obj => obj.notFound == 0);
            expect(result.is_none()).toBeTruthy();
        });
    })
});