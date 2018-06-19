import React from 'react';
import { Typography } from '@material-ui/core';

import Flex from '../flex/Flex';
import NumberInput from './NumberInput';

const PercentageInput = ({ disabled, label, onChange, value }) => (
	<Flex alignItems="flex-end" spaceHorizontal="1rem">
		<NumberInput
			disabled={disabled}
			label={label}
			onChange={value => {
				onChange(value || value === 0 ? value / 100 : null);
			}}
			value={value ? value * 100 : null}
		/>

		<Typography variant="title">%</Typography>
	</Flex>
);

export default PercentageInput;
