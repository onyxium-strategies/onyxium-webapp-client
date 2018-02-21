import React from 'react';
import { MenuItem, TextField } from 'material-ui';

const SelectField = ({ items, label, onChange, value }) => (
	<TextField
		select
		label={label}
		value={value === null ? '' : value}
		onChange={onChange}
	>
		{items.map((item) => (
			<MenuItem key={item.value} value={item.value}>
				{item.label}
			</MenuItem>
		))}
	</TextField>
);

export default SelectField;
