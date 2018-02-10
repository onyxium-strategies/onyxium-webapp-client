/**
 * Clears all text selection, browsers have different API's for this shit so test them all and run accordingly.
 */
export default function clearSelection () {
	if (window.getSelection) {
		if (window.getSelection().empty) {
			window.getSelection().empty();
		} else if (window.getSelection().removeAllRanges) {
			window.getSelection().removeAllRanges();
		}
	} else if (document.selection) {
		document.selection.empty();
	}
}
