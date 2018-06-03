import React from 'react';
import { Typography } from 'material-ui';

import Flex from '../flex/Flex';
import SelectField from './SelectField';

const CurrencySelector = ({
	baseCurrencyField,
	baseCurrencyItems,
	quoteCurrencyField,
	quoteCurrencyItems
}) => (
	<Flex alignItems="flex-end" flex="none" spaceHorizontal="1rem">
		<SelectField {...baseCurrencyField} flex={1} items={baseCurrencyItems} />

		<Typography variant="title">/</Typography>

		<SelectField {...quoteCurrencyField} flex={1} items={quoteCurrencyItems} />
	</Flex>
);

export default CurrencySelector;
