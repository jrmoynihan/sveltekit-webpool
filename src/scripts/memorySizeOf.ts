export function memorySizeOf(obj: Object): string {
	return formatByteSize(sizeOf(obj));
}
export function sizeOf(obj: Object): number {
	let bytes = 0;
	if (obj !== null && obj !== undefined) {
		switch (typeof obj) {
			case 'number':
				bytes += 8;
				break;
			case 'string':
				bytes += obj.length * 2;
				break;
			case 'boolean':
				bytes += 4;
				break;
			case 'object':
				var objClass = Object.prototype.toString.call(obj).slice(8, -1);
				if (objClass === 'Object' || objClass === 'Array') {
					for (const key in obj) {
						if (!obj.hasOwnProperty(key)) continue;
						bytes += sizeOf(obj[key]);
					}
				} else bytes += obj.toString().length * 2;
				break;
		}
	}
	return bytes;
}
export function formatByteSize(bytes: number): string {
	if (bytes < 1024) return bytes + ' bytes';
	else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + ' KiB';
	else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + ' MiB';
	else return (bytes / 1073741824).toFixed(3) + ' GiB';
}
/**
 * Pass to an Array.reduce() method to sum the size of an array of objects
 * @param previousValue - the accumulated total to pass into the next function call
 * @param currentObject - the current object to determine the size of
 * @returns - the combined size of all objects in the array
 */
export const aggregateObjectSizes = (previousValue: number, currentObject: Object): number => {
	const currentObjectSize = sizeOf(currentObject);
	return previousValue + currentObjectSize;
};
