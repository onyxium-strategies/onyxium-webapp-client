import defaultCondition from './defaultCondition';

export default function isConditionValid (condition) {
	return Object.keys(defaultCondition).every((conditionProperty) => condition[conditionProperty] !== null);
}
