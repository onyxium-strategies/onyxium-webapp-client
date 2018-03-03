import React from 'react';
import { TextField, Typography } from 'material-ui';

import Flex from '../../components/flex/Flex';
import SelectField from '../../components/form/SelectField';

import filterOutValueFromItems from './utils/filterOutValueFromItems';

import ActionSummaryLabel from './ActionSummaryLabel';
import { currencies, orderTypes } from './data';

const StrategyFormActionFields = ({ action, onChange }) => (
	<Flex flexDirection="column" maxWidth="100%" spaceVertical="1rem">
		<ActionSummaryLabel action={action} />

		<SelectField
			items={orderTypes}
			label="Select order type"
			onChange={onChange('orderType')}
			value={action.orderType}
		/>

		<Flex alignItems="flex-end" flex="none" spaceHorizontal="1rem">
			<SelectField
				flex={1}
				items={filterOutValueFromItems(currencies, action.quoteCurrency)}
				label="BASE"
				onChange={onChange('baseCurrency')}
				value={action.baseCurrency}
			/>

			<Typography variant="title">/</Typography>

			<SelectField
				flex={1}
				items={filterOutValueFromItems(currencies, action.baseCurrency)}
				label="QUOTE"
				onChange={onChange('quoteCurrency')}
				value={action.quoteCurrency}
			/>
		</Flex>

		<TextField
			fullWidth
			label="Quantity"
			onChange={onChange('quantity')}
			type="number"
			value={action.quantity !== null ? action.quantity : ''}
		/>

		<TextField
			fullWidth
			label="Value"
			onChange={onChange('value')}
			type="number"
			value={action.value !== null ? action.value : ''}
		/>
	</Flex>
);

const StrategyFormAction = ({ action, onChange }) => (
	<StrategyFormActionFields action={action} onChange={(name) => (event) => onChange(name, event)} />
);

export default StrategyFormAction;
