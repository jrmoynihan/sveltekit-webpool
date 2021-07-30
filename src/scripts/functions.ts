export const isOfType = <T>(
	varToBeChecked: any,
	propertyToCheckFor: keyof T
): varToBeChecked is T => (varToBeChecked as T)[propertyToCheckFor] !== undefined;

export function isItemInArray(item: any, array: any[]): boolean {
	// console.log(item);
	// console.log(array.some(element => element.id === item.id));
	return array.some((element) => element.id === item.id);
}
export function isIdAlreadyUsed(id: number, array: any[]): boolean {
	return array.some((element) => id === element.id);
}
export function getWindowSize(): number {
	return window.innerWidth;
}
export const matchPath = (testPath: string, currentPath: string): boolean => {
	try {
		let replaced = testPath;
		replaced = replaced + `\w*`;
		const regex = new RegExp(replaced);
		// console.log(`current: ${currentPath}`, regex.test(currentPath));
		return regex.test(currentPath);
	} catch (err) {
		console.error('An error occurred in functions:{matchPath}');
	}
};
export const hideModal = async (modalID: string): Promise<void> => {
	const modal: HTMLDialogElement = document.getElementById(`modal-${modalID}`) as HTMLDialogElement;
	let isDialogSupported = true;

	if (!window.HTMLDialogElement) {
		document.body.classList.add('no-dialog');
		isDialogSupported = false;
	}

	if (isDialogSupported) {
		modal.close();
	} else {
		modal.removeAttribute('open');
	}
};
