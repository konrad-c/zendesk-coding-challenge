#!/usr/bin/env node

import { resolve } from 'path';
import { Option } from '@usefultools/monads';

import { readFileAsJson } from './json-reader';
import { facetSearch } from './search';
import { DataType, getDataTypeFacets, Dataset, getEntityRelations, getCollectionByType } from './dataset';

// UI
import { Formatter, createJsonFormatter } from './display/formatter';
import { dataTypePrompt } from './display/dataset-prompt';
import { facetPrompt, searchValuePrompt } from './display/search-prompt';
import { listPrompt } from './display/list-prompt';


console.log("Welcome to this Zendesk Coding Challenge solution!");

const objectFormatter: Formatter = createJsonFormatter(2);
let dataset: Dataset;

/**
 * Load User, Organization, and Ticket data from files in the directory specified.
 * Expects files to be named 'users.json', 'organizations.json', and 'tickets.json' respectively.
 * @param dataDirectory Relative or absolute path to the directory containing these files. 
 */
async function loadData(dataDirectory: string): Promise<Dataset> {
    const userPath: string = resolve(dataDirectory, "users.json"),
        ticketsPath: string = resolve(dataDirectory, "tickets.json"),
        organizationsPath: string = resolve(dataDirectory, "organizations.json");

    return ({
        users: await readFileAsJson(userPath),
        organizations: await readFileAsJson(organizationsPath),
        tickets: await readFileAsJson(ticketsPath)
    });
}

async function exitPrompt() {
    console.log("So long!");
}

async function searchFlow() {
    const dataType: DataType = await dataTypePrompt();
    
    const availableFacets: string[] = getDataTypeFacets(dataType);
    const facet: string = await facetPrompt(availableFacets);
    const searchValue: string = await searchValuePrompt();

    const collection: object[] = getCollectionByType(dataset, dataType);
    const searchResult: Option<object> = facetSearch(collection, facet, searchValue);

    searchResult.match({
        some: result => {
            console.log(objectFormatter(result));
            inspectEntityPrompts(dataType, result);
        },
        none: () => console.log("No results found.")
    });
}

// function getRelatedEntityAction(relationName: string, relationAccessor: () => Option<object>, goBackAction: () => Promise<void>): () => Promise<void> {
//     const relatedEntity: Option<object> = relationAccessor();
//     return relatedEntity.match({
//         some: entity => () => inspectEntityPrompts(entity),
//         none: () => {
//             console.log(`Unable to retrieve ${relationName} of current entity.`);
//             return () => goBackAction();
//         }
//     })
// }

async function relatedEntityPrompts(datatype: DataType, entity: object) {
    const entityRelations: Record<string, () => Option<object>> = getEntityRelations(dataset, datatype, entity);
    const goBackAction = () => inspectEntityPrompts(datatype, entity);

    console.log(objectFormatter(Object.keys(entityRelations)));

    const choices = Object.entries(entityRelations)
        .map(([relationName, accessor]) => [
            relationName, 
            goBackAction // getRelatedEntityAction(entity, relationName, accessor)
        ])
        .map(([relationName, action]: [string, () => Promise<void>]) => ({ name: relationName, value: action }));

    choices.push({ name: "Go Back", value: goBackAction })
    const action: () => any = await listPrompt('Which related entity would you like to inspect?', choices);
    await action();
}

async function inspectEntityPrompts(datatype: DataType, entity: object) {
    const inspectActions = [
        { name: 'Related Entities', value: () => relatedEntityPrompts(datatype, entity) },
        { name: 'Search Again', value: () => searchFlow() },
        { name: 'Exit', value: () => exitPrompt() }
    ];
    const action: () => any = await listPrompt("What would you like to do now?", inspectActions);
    await action();
}

async function init() {
    dataset = await loadData('./data');
    await searchFlow();
}

init();