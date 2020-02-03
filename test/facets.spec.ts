import { Facet, Boolean, Number, String, Collection, Choice } from '../src/search/field-type';

describe("Facets", () => {
    describe("Field-defined search", () => {
        it("Boolean facet search should check for basic equality", () => {
            const booleanFacet: Facet = Boolean("facet");
            const truthy: boolean = booleanFacet.search("true", "true");
            const falsy: boolean = booleanFacet.search("true", "false");
            expect(truthy).toBeTruthy();
            expect(falsy).toBeFalsy();
        });

        it("Number facet search should check for basic equality", () => {
            const numberFacet: Facet = Number("facet");
            const truthy: boolean = numberFacet.search(0, 0);
            const falsy: boolean = numberFacet.search(0, 1);
            expect(truthy).toBeTruthy();
            expect(falsy).toBeFalsy();
        });

        it("String facet search should check for basic equality", () => {
            const stringFacet: Facet = String("facet");
            const truthy: boolean = stringFacet.search("value", "value");
            const falsy: boolean = stringFacet.search("value", "other");
            expect(truthy).toBeTruthy();
            expect(falsy).toBeFalsy();
        });

        it("Choice facet search should check for basic equality", () => {
            const choiceFacet: Facet = new Choice("facet", ["first", "second"]);
            const truthy: boolean = choiceFacet.search("first", "first");
            const falsy: boolean = choiceFacet.search("first", "second");
            expect(truthy).toBeTruthy();
            expect(falsy).toBeFalsy();
        });

        it("Collection facet search should check if facet contains search value", () => {
            const collectionFacet: Facet = Collection("facet");
            const truthy: boolean = collectionFacet.search(["value"], "value");
            const falsy: boolean = collectionFacet.search(["value"], "other");
            expect(truthy).toBeTruthy();
            expect(falsy).toBeFalsy();
        });
    });
})