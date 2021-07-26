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
	let replaced = testPath;
	replaced = replaced + `\w*`;
	const regex = new RegExp(replaced);
	// console.log(`current: ${currentPath}`, regex.test(currentPath));
	return regex.test(currentPath);
};
