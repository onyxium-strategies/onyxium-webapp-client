import React from 'react';
import { TextField } from '@material-ui/core';

const NumberInput = ({ disabled, label, onChange, value }) => (
	<TextField
		disabled={disabled}
		fullWidth
		label={label}
		onChange={event => onChange(parseFloat(event.target.value))}
		type="number"
		value={value || value === 0 ? value : ''}
	/>
);

export default NumberInput;
