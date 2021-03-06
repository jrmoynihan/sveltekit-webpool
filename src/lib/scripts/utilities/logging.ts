import { all_icons, defaultConsoleLogStyle } from '$classes/constants';
import { type myToastOptions, defaultToast, errorToast } from '$scripts/toasts';

export interface myLogType {
	msg: string;
	icon?: string | null;
	additional_params?: any;
	traceLocation?: boolean;
	use_warning?: boolean;
}
export interface myErrorType {
	error: Error;
	msg?: string;
	icon?: string | null;
	additional_params?: any;
}

// Creates a union of the two types for combined usage
export type LogAndToastType = myToastOptions & myLogType;
export type ErrorAndToastType = myToastOptions & myErrorType;

export const myError = (input: myErrorType): void => {
	const { error, msg, icon = all_icons.policeCarLight, additional_params } = input;
	let str = icon ? `%c${icon} ` : '%c';
	str += `\n ${msg}\ `;
	let args = [str, defaultConsoleLogStyle, error];
	if (additional_params) args = args.concat(additional_params);
	console.error(...args);
};
export const myLog = (input: myLogType): void => {
	const { msg, icon, traceLocation, additional_params, use_warning } = input;
	let str = icon ? `%c${icon} ` : '%c';
	str += `\n ${msg}\ `;
	let args = [str, defaultConsoleLogStyle];

	if (additional_params) args = args.concat(additional_params);

	if (traceLocation) {
		console.trace(...args);
	} else if (additional_params) {
		console.group(...args);
		console.groupEnd();
	} else if (use_warning) {
		console.warn(...args);
	} else {
		console.log(...args);
	}
};
export const myWarning = (input: myLogType): void => {
	input.use_warning = true;
	myLog(input);
};

export const LogAndToast = (options: LogAndToastType): number => {
	myLog({ ...options });
	const toastId = defaultToast({ ...options });
	return toastId;
};
export const ErrorAndToast = (options: ErrorAndToastType): number => {
	myError({ ...options });
	const toastId = errorToast({ ...options });
	return toastId;
};
