import React from 'react';
import { Typography } from 'material-ui';

import Flex from '../flex/Flex';
import NumberInput from './NumberInput';

const PercentageInput = ({ label, onChange, value }) => (
	<Flex alignItems="flex-end" spaceHorizontal="1rem">
		<NumberInput
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
