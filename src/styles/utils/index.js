export const createStyle = ({ prop, cssProperty, valueGetter }) => props => {
	const value = valueGetter ? valueGetter(props[prop]) : props[prop];

	if (value === undefined || value === null) {
		return null;
	}

	return typeof cssProperty === 'function' ? cssProperty(value) : { [cssProperty]: value };
};
