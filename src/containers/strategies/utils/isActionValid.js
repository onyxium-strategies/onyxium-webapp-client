import { defaultAction } from '../data';

export default function isActionValid(action) {
	return Object.keys(defaultAction).every(actionProperty => action[actionProperty] !== null);
}
