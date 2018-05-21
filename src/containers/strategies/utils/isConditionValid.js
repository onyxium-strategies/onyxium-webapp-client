import { defaultCondition } from '../data';

export default function isConditionValid(condition) {
	return Object.keys(defaultCondition).every(
		conditionProperty => condition[conditionProperty] !== null
	);
}
