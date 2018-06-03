export default function hasFormValidation(validationByName) {
	return Object.keys(validationByName).some(name => validationByName[name] !== null);
}
