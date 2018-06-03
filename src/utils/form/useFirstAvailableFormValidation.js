export default function useFirstAvailableFormValidation(...validations) {
	return validations.find(validation => !!validation.validationMessage) || {};
}
