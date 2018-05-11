import React from 'react';
import { TextField } from 'material-ui';

const TextInput = ({ label, onChange, placeholder, value }) => (
	<TextField
		fullWidth
		label={label}
		onChange={event => onChange(event.target.value)}
		placeholder={placeholder}
		type="text"
		value={value ? value : ''}
	/>
);

export default TextInput;
