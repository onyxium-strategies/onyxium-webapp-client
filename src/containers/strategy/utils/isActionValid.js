import defaultAction from './defaultAction';

export default function isActionValid (action) {
	return Object.keys(defaultAction).every((actionProperty) => action[actionProperty] !== null);
}
