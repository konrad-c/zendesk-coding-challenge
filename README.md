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