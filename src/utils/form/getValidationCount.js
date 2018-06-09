export default function getValidationCount(validation) {
	if (!validation) {
		return 0;
	}

	return Object.keys(validation).filter(name => validation[name] !== null).length;
}
