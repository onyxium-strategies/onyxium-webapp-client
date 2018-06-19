import React from 'react';
import { Typography } from '@material-ui/core';

import Flex from '../flex/Flex';
import SelectField from './SelectField';

const CurrencySelector = ({
	baseCurrencyField,
	baseCurrencyItems,
	disabled,
	quoteCurrencyField,
	quoteCurrencyItems
}) => (
	<Flex alignItems="flex-end" flex="none" spaceHorizontal="1rem" width="100%">
		<SelectField {...baseCurrencyField} disabled={disabled} items={baseCurrencyItems} />

		<Typography variant="title">/</Typography>

		<SelectField {...quoteCurrencyField} disabled={disabled} items={quoteCurrencyItems} />
	</Flex>
);

export default CurrencySelector;
