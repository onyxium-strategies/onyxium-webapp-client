export default function isConditionValid (condition) {
	const { baseCurrency, conditionType, quoteCurrency, value } = condition;
	return baseCurrency !== null && conditionType !== null && quoteCurrency !== null && value !== null;
}
