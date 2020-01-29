import * as ora from 'ora';

export interface ProgressBarOptions {
    inProgressText: string,
    successText?: string,
    failureText?: string
}

export async function progressBar<T>(
    action: Promise<T>,
    options: ProgressBarOptions
): Promise<T> {
    const { inProgressText, successText, failureText } = options;
    const spinner = ora.promise(action, inProgressText).start();
    try {
        const actionResult: T = await action;
        spinner.succeed(successText);
        return actionResult;
    } catch (error) {
        spinner.fail(failureText);
        return Promise.reject(error);
    }
}