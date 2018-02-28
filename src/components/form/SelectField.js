import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import { MenuItem, TextField } from 'material-ui';

const determineStyles = ({ flex }) => css({ flex });

const SelectField = ({ flex, items, label, onChange, value }) => (
	<TextField
		classes={{ root: determineStyles({ flex }) }}
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

SelectField.defaultProps = {
	flex: 'none',
	label: '',
	value: null
};

SelectField.propTypes = {
	flex: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
	items: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			value: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ])
		})
	).isRequired,
	label: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ])
};

export default SelectField;
