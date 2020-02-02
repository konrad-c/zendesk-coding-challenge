import { prompt, Answers } from "inquirer";
import { listPrompt } from "./list-prompt";

export async function facetPrompt(facetList: string[]): Promise<string> {
    const facetChoices = facetList.map(facet => ({ name: facet, value: facet }));
    return listPrompt('Which facet would you like to search on?', facetChoices);
}

export async function searchValuePrompt(inputValidator?: (answer: string) => boolean): Promise<string> {
    const answerIdentifier: string = 'search-value';
    const response: Answers = await prompt([{
        name: answerIdentifier,
        type: 'input',
        message: 'Value to search for:',
        validate: inputValidator
    }]);
    return response[answerIdentifier]
}