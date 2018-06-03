export default function mapFormFieldToValueByName(fields) {
	return Object.keys(fields).reduce((valueByName, name) => {
		valueByName[name] = fields[name].value;
		return valueByName;
	}, {});
}
