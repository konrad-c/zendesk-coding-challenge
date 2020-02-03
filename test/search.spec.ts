import { facetSearch } from '../src/search/index';
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
            const searchResult = facetSearch(testData, facet, 2);
            const expectedResult = { facet1: 2, facet2: [], facet3: true, facet4: "" };
            expect(searchResult).toEqual(expectedResult);
        });

        it("should return None if search result not found", () => {
            const facet: Facet = Number("facet1");
            const searchResult = facetSearch(testData, facet, -1);
            expect(searchResult).toBeUndefined();
        });

        it("should return first record if multiple records match key/value pair", () => {
            const facet: Facet = Number("facet1");
            const searchResult = facetSearch(testData, facet, 1);
            const expectedResult = { facet1: 1, facet2: [], facet3: false, facet4: "" };
            expect(searchResult).toEqual(expectedResult);
        });

        it("should return boolean facets that exist", () => {
            const facet: Facet = Boolean("facet3");
            const searchResult = facetSearch(testData, facet, true);
            const expectedResult = { facet1: 2, facet2: [], facet3: true, facet4: "" };
            expect(searchResult).toEqual(expectedResult);
        });

        it("should return string facets that exist", () => {
            const facet: Facet = String("facet4");
            const searchResult = facetSearch(testData, facet, "string");
            const expectedResult = { facet1: 3, facet2: [], facet3: false, facet4: "string" };
            expect(searchResult).toEqual(expectedResult);
        });

        it("should return collection facets that contain search value", () => {
            const facet: Facet = Collection("facet2");
            const searchResult = facetSearch(testData, facet, "first");
            const expectedResult = { facet1: 0, facet2: ["first"], facet3: false, facet4: "" };
            expect(searchResult).toEqual(expectedResult);
        });

        it("should return None when collection facet does not contain search value", () => {
            const facet: Facet = Collection("facet2");
            const searchResult = facetSearch(testData, facet, "not-found");
            expect(searchResult).toBeUndefined();
        });
    });
});