#!/usr/bin/env node
import { filterByFacet } from './search/index';
import { SearchModel } from './search';
import { Facet } from './search/field-type';
import { getSearchModelByDataType, Dataset, getCollectionByType, loadData } from './dataset';
import { Entity, DataType } from './models/entity';
import { getEntityRelations } from './relations';

// UI
import { Formatter, createTableFormatter } from './display/formatter';
import { dataTypePrompt } from './display/dataset-prompt';
import { facetPrompt, searchableFieldPrompt } from './display/search-prompt';
import { listPrompt } from './display/list-prompt';

const objectFormatter: Formatter = createTableFormatter(); 
const print = (message: string) => console.log(message);
const printObject = (obj: object) => print(objectFormatter(obj));
let dataset: Dataset;

async function exitPrompt() {
    print("So long!");
}

const defaultActionOptions = [
    { name: 'Search Again', value: () => searchFlow() },
    { name: 'Exit', value: () => exitPrompt() }
];

async function noResultsFound() {
    const action: () => any = await listPrompt("What would you like to do now?", defaultActionOptions);
    await action();
}

async function searchFlow() {
    const dataType: DataType = await dataTypePrompt();
    const searchModel: SearchModel = getSearchModelByDataType(dataType);
    const facet: Facet = await facetPrompt(searchModel);
    const searchValue: string | number = await searchableFieldPrompt(facet);

    const collection: Entity[] = getCollectionByType(dataset, dataType);
    const searchResults: Entity[] = filterByFacet(collection, facet, searchValue);

    const numberOfResults: number = searchResults.length;
    print(`${numberOfResults} results found.`);
    numberOfResults > 0
        ? inspectSearchResults(searchResults)
        : noResultsFound();
}

async function inspectSearchResults(results: Entity[], bookmark: number = 0) {
    const currentResult: Entity = results[bookmark];
    printObject(currentResult);
    print(`Viewing result ${bookmark + 1} of ${results.length}.`);

    const actions = [];
    if(bookmark + 1 < results.length)   actions.push({ name: "Next", value: () => inspectSearchResults(results, bookmark + 1) });
    if(bookmark > 0)                    actions.push({ name: "Previous", value: () => inspectSearchResults(results, bookmark - 1) });
    actions.push({ name: 'Related Entities', value: () => relatedEntityPrompts(currentResult, () => inspectSearchResults(results, bookmark)) });
    actions.push(...defaultActionOptions);
    const action: () => any = await listPrompt("What would you like to do now?", actions);
    await action();
}

async function relatedEntityPrompts(entity: Entity, goBackAction: () => Promise<void>) {
    const entityRelations: Record<string, Entity[]> = getEntityRelations(dataset, entity);

    const choices = Object.entries(entityRelations)
        .map(([relationName, relatedEntities]) => ({ 
            name: relationName, 
            value: () => inspectSearchResults(relatedEntities) 
        }));

    choices.push({ name: "Go Back", value: goBackAction })
    const action: () => any = await listPrompt('Which related entity would you like to inspect?', choices);
    await action();
}

async function init() {
    print("Welcome to this Zendesk Coding Challenge solution!");
    try {
        dataset = await loadData();
        await searchFlow();
    } catch(err) {
        print("There was a problem reading the dataset.");
        print("By default this program expects to find data for users, organizations, and tickets at the following path:");
        print("Users: ./data/users.json");
        print("Tickets: ./data/tickets.json");
        print("Organization: ./data/organizations.json");

        process.exit(1);
    }
}

init();