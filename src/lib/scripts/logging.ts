import { type all_icons, defaultConsoleLogStyle } from "$classes/constants";
import { type myToastOptions, defaultToast } from "$scripts/toasts";

export type myErrorType = {
	error: Error;
	msg?: string;
	icon?: all_icons | null;
	function_name?: string;
	location?: string;
	additional_params?: any;
};
export type myLogType = {
	msg: string;
	icon?: all_icons;
	function_name?: string;
	location?: string;
	additional_params?: any;
};
export type LogAndToastType = myToastOptions & myLogType;
export type ErrorAndToastType = myToastOptions & myErrorType;

export const myError = (input: myErrorType): void => {
	const { error, msg, icon, function_name, location, additional_params } = input;
	console.error(
		`${icon ? `%c${icon} ` : '%c'}Error in ${location ? `${location} ->` : ''} ${function_name ?? ''}! \n ${msg ?? ''}`, defaultConsoleLogStyle, error ?? '', additional_params ?? '');
};
export const myLog = (input: myLogType): void => {
	const { msg, icon, function_name, location, additional_params } = input;
	console.log(
		`${icon ? `%c${icon} ` : '%c'}${location ? `${location} ->` : ''} ${function_name ?? ''} \n ${msg ?? ''}`,
		defaultConsoleLogStyle,
		additional_params ?? ''
	);
};


export const LogAndToast = (options: LogAndToastType ): void => {
	myLog({...options});
	defaultToast({...options});
}
export const ErrorAndToast = (options: ErrorAndToastType ): void => {
	myError({...options});
	defaultToast({...options});
}