#!/usr/bin/env node

import { resolve } from 'path';

import { readFileAsJson } from './json-reader';
import { User } from './models/user';
import { Organization } from './models/organization';
import { Ticket } from './models/ticket';

// UI
import { progressBar } from './display/progress';
import { Formatter, createJsonFormatter } from './display/object-formatter';

console.log("Welcome to this Zendesk Coding Challenge solution!");

async function loadData(dataDirectory: string): Promise<{
    users: User[],
    organizations: Organization[],
    tickets: Ticket[]
}> {
    const userPath: string = resolve(dataDirectory, "users.json"),
        ticketsPath: string = resolve(dataDirectory, "tickets.json"),
        organizationsPath: string = resolve(dataDirectory, "organizations.json");

    return ({
        users: await readFileAsJson(userPath),
        organizations: await readFileAsJson(organizationsPath),
        tickets: await readFileAsJson(ticketsPath)
    });
}

(async function init() {
    const jsonFormatter: Formatter = createJsonFormatter(2);

    const { users, organizations, tickets } = await progressBar(
        loadData('./data'), {
            inProgressText: "Reading data from files...",
            successText: "Files read into memory.",
            failureText: "Error occurred while reading files."
        });

    console.log(jsonFormatter(users[0]));
})()