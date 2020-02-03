import { prompt, Answers } from "inquirer";
import { listPrompt } from "./list-prompt";
import { Facet, Choice, FieldType } from '../search/field-type';
import { SearchModel } from "../search";

export async function facetPrompt(searchModel: SearchModel): Promise<Facet> {
    const facetChoices = searchModel.map(facet => ({ name: facet.name, value: facet }));
    return listPrompt('Which facet would you like to search on?', facetChoices);
}

export async function searchChoicePrompt(choices: string[]): Promise<string> {
    const questionChoices = choices.map(choice => ({ name: choice, value: choice }));
    return listPrompt('Value to search for:', questionChoices);
}

async function searchStringPrompt(inputValidator?: (answer: string) => boolean): Promise<string> {
    const answerIdentifier: string = 'search-value';
    const response: Answers = await prompt([{
        name: answerIdentifier,
        type: 'input',
        message: 'Value to search for:',
        validate: inputValidator
    }]);
    return response[answerIdentifier];
}

async function searchBooleanPrompt(): Promise<string> {
    const booleanChoices = [
        { name: "true", value: "true"},
        { name: "false", value: "false"},
    ]
    return listPrompt("Value to search for:", booleanChoices);
}

async function searchNumberPrompt(): Promise<number> {
    const answerIdentifier: string = 'search-value';
    const response: Answers = await prompt([{
        name: answerIdentifier,
        type: 'number',
        message: 'Value to search for:'
    }]);
    return response[answerIdentifier];
}

export async function searchableFieldPrompt(field: Facet): Promise<number | string> {
    switch(field.type){
        case FieldType.Choice:
            const choiceField: Choice = field as Choice;
            return searchChoicePrompt(choiceField.choices);
        case FieldType.Number:
            return searchNumberPrompt();
        case FieldType.Boolean:
            return searchBooleanPrompt();
        default:
            return searchStringPrompt();
    }
}