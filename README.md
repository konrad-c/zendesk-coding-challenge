## Overview

Using the provided data (tickets.json and users.json and organization.json ) write a simple command line application to search the data and return the results in a human readable format.
Feel free to use libraries or roll your own code as you see fit.
Where the data exists, values from any related entities should be included in the results.
The user should be able to search on any field, full value matching is fine (e.g. “mar” won’t return “mary”).
The user should also be able to search for empty values, e.g. where description is empty.

## Evaluation Criteria 

1. Extensibility - separation of concerns.
2. Simplicity - aim for the simplest solution that gets the job done whilst remaining readable, extensible and testable.
3. Test Coverage - breaking changes should break your tests.
4. Performance - should gracefully handle a significant increase in amount of data
provided (e.g 10000+ users).
5. Robustness - should handle and report errors.

## Getting Started

This is a NodeJS & Typescript project.
Ensure that you have Node installed locally on your machine.
This project expects a minimum Node version of 10.15.

Steps to get up and running:
1. Install dependencies: `npm install`
2. Transpile Typescript to NodeJS: `npm run build`
3. Run unit tests: `npm test`
4. To transpile as you make changes, you can run `npm run watch`
5. To execute the CLI tool from the terminal: `npm run start`