export default function filterOutValueFromItems(items, value) {
	if (!value) {
		return items;
	}

	return items.filter(item => item.value !== value);
}
