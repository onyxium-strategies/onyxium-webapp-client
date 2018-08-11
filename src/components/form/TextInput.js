import React from 'react';
import { TextField } from '@material-ui/core';

const TextInput = ({ label, onChange, placeholder, type, value }) => (
	<TextField
		fullWidth
		label={label}
		onChange={event => onChange(event.target.value)}
		placeholder={placeholder}
		type={type}
		value={value ? value : ''}
	/>
);

TextInput.defaultProps = {
	type: 'text'
};

export default TextInput;
