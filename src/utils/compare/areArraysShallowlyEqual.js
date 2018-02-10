/**
 * Shallowly compare all items from two arrays. When an item from the other array isn't shallowly equal on the same index,
 * this utility will return false. Note that this will also return false for arrays that have the exact same content
 * but are reordered.
 *
 * @param arrayA Array to compare against arrayB
 * @param arrayB Array to compare against arrayA
 * @returns {boolean} Whether or not the arrays are shallowly equal
 */
export default function areArraysShallowlyEqual (arrayA, arrayB) {
	if (arrayA.length !== arrayB.length) {
		return false;
	}

	return arrayA.every((item, index) => item === arrayB[index]);
}
