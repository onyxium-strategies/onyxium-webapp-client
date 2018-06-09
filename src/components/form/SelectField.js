import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

const SelectField = ({ items, label, onChange, value }) => (
	<FormControl fullWidth>
		<InputLabel>{label}</InputLabel>
		<Select
			autoWidth
			label={label}
			value={value === null ? '' : value}
			onChange={event => onChange(event.target.value)}
		>
			{items.map(item => (
				<MenuItem key={item.value} value={item.value}>
					{item.label}
				</MenuItem>
			))}
		</Select>
	</FormControl>
);

SelectField.defaultProps = {
	flex: 'none',
	label: '',
	value: null
};

SelectField.propTypes = {
	flex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	items: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		})
	).isRequired,
	label: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default SelectField;
