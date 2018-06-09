import React from 'react';
import { Typography } from '@material-ui/core';

import Flex from '../flex/Flex';
import SelectField from './SelectField';

const CurrencySelector = ({
	baseCurrencyField,
	baseCurrencyItems,
	quoteCurrencyField,
	quoteCurrencyItems
}) => (
	<Flex alignItems="flex-end" flex="none" spaceHorizontal="1rem" width="100%">
		<SelectField {...baseCurrencyField} items={baseCurrencyItems} />

		<Typography variant="title">/</Typography>

		<SelectField {...quoteCurrencyField} items={quoteCurrencyItems} />
	</Flex>
);

export default CurrencySelector;
