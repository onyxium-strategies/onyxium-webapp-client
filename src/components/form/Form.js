import { Component } from 'react';

function determineValue(fieldSchema, value) {
	if (value !== undefined) {
		return value;
	}

	if (fieldSchema.defaultValue !== undefined) {
		return fieldSchema.defaultValue;
	}

	return null;
}

class Form extends Component {
	componentWillReceiveProps(nextProps) {
		// Strip out values/validation from old schema.
		if (nextProps.schema !== this.props.schema) {
			const updatedValues = Object.keys(this.props.schema).reduce(
				(strippedValues, schemaPropertyName) => {
					if (!nextProps.schema[schemaPropertyName]) {
						delete strippedValues.valueByName[schemaPropertyName];
						delete strippedValues.validationByName[schemaPropertyName];
					}

					return strippedValues;
				},
				{
					valueByName: { ...nextProps.valueByName },
					validationByName: { ...nextProps.validationByName }
				}
			);

			this.props.onChange(updatedValues);
		}
	}

	handleChange = fieldName => value => {
		const { valueByName, validationByName } = this.props;

		const fieldSchema = this.props.schema[fieldName];

		this.props.onChange({
			valueByName: { ...valueByName, [fieldName]: value },
			validationByName: { ...validationByName, [fieldName]: fieldSchema.validate(value) }
		});
	};

	render() {
		const { valueByName, validationByName } = this.props;

		return this.props.children(
			Object.keys(this.props.schema).reduce(
				(fieldData, fieldName) => {
					const fieldSchema = this.props.schema[fieldName];
					const value = valueByName[fieldName];

					fieldData.fields[fieldName] = {
						label: fieldSchema.label,
						onChange: this.handleChange(fieldName),
						value: determineValue(fieldSchema, value)
					};

					const validation = validationByName ? validationByName[fieldName] : null;

					fieldData.validation[fieldName] = {
						validationMessage: validation || null
					};

					return fieldData;
				},
				{ fields: {}, validation: {} }
			)
		);
	}
}

export default Form;
