export default function validateFormValues(valueByName, formSchema) {
	return Object.keys(formSchema).reduce((validationByName, name) => {
		validationByName[name] = formSchema[name].validate(valueByName[name]);
		return validationByName;
	}, {});
}
