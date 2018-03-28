import validateCondition from './validateCondition';

export default function validateConditions (conditions, allowedCurrencyValues) {
	return conditions.map(condition => validateCondition(condition, allowedCurrencyValues));
}
