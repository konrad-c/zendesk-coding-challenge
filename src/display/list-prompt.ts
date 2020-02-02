import { prompt, Answers, ListChoiceOptions } from "inquirer";

export async function listPrompt<TResult>(message: string, actions: ListChoiceOptions<TResult>[]): Promise<TResult> {
    const answerIdentifier: string = 'answer';
    const response: Answers = await prompt([{
        name: answerIdentifier,
        type: 'list',
        message: message,
        choices: actions
    }]);
    return response[answerIdentifier];
}