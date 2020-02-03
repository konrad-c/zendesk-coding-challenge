#!/usr/bin/env node

import { resolve } from 'path';
import { Option } from '@usefultools/monads';

import { readFileAsObjectCollection } from './json-reader';
import { facetSearch } from './search/index';
import { SearchModel } from './search';
import { Facet } from './search/field-type';
import { getSearchModelByDataType, Dataset, getCollectionByType } from './dataset';
import { User } from './models/user';
import { Organization } from './models/organization';
import { Ticket } from './models/ticket';
import { Entity, DataType } from './models/entity';
import { getEntityRelations } from './relations';

// UI
import { Formatter, createJsonFormatter } from './display/formatter';
import { dataTypePrompt } from './display/dataset-prompt';
import { facetPrompt, searchableFieldPrompt } from './display/search-prompt';
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
        users: await readFileAsObjectCollection(userPath, User),
        organizations: await readFileAsObjectCollection(organizationsPath, Organization),
        tickets: await readFileAsObjectCollection(ticketsPath, Ticket)
    });
}

async function exitPrompt() {
    console.log("So long!");
}

async function searchFlow() {
    const dataType: DataType = await dataTypePrompt();
    const searchModel: SearchModel = getSearchModelByDataType(dataType);
    const facet: Facet = await facetPrompt(searchModel);
    const searchValue: string | number = await searchableFieldPrompt(facet);

    const collection: Entity[] = getCollectionByType(dataset, dataType);
    const searchResult: Option<Entity> = facetSearch(collection, facet, searchValue);

    searchResult.match({
        some: result => inspectEntityPrompts(result),
        none: () => console.log("No results found.")
    });
}

async function relatedEntityPrompts(entity: Entity) {
    const entityRelations: Record<string, Option<Entity>> = getEntityRelations(dataset, entity);
    const goBackAction = () => inspectEntityPrompts(entity);

    const choices = Object.entries(entityRelations)
        .map(([relationName, relatedEntity]) => [
            relationName, 
            relatedEntity.match({
                some: entity => (() => inspectEntityPrompts(entity)),
                none: () => {
                    console.log(`Unable to retrieve ${relationName} of current entity.`);
                    return () => goBackAction();
                }
            })
        ])
        .map(([relationName, action]: [string, () => Promise<void>]) => ({ name: relationName, value: action }));

    choices.push({ name: "Go Back", value: goBackAction })
    const action: () => any = await listPrompt('Which related entity would you like to inspect?', choices);
    await action();
}

async function inspectEntityPrompts(entity: Entity) {
    // display entity:
    console.log(objectFormatter(entity));
    const inspectActions = [
        { name: 'Related Entities', value: () => relatedEntityPrompts(entity) },
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