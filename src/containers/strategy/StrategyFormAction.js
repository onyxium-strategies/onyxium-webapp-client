import React from 'react';
import { FormControl, FormHelperText, TextField, Typography } from 'material-ui';

import Flex from '../../components/flex/Flex';
import SelectField from '../../components/form/SelectField';

import filterOutValueFromItems from './utils/filterOutValueFromItems';

import ActionSummaryLabel from './ActionSummaryLabel';
import { currencies, orderTypes } from './data';

const StrategyFormActionFields = ({ action, onChange, validation }) => (
	<Flex flex="1" flexDirection="column" maxWidth="100%" padding="1rem" spaceVertical="1rem">
		<ActionSummaryLabel action={action} />

		<FormControl error={validation && !!validation.orderType} fullWidth>
			<SelectField
				items={orderTypes}
				label="Select order type"
				onChange={onChange('orderType')}
				value={action.orderType}
			/>

			{validation && validation.orderType && <FormHelperText>{validation.orderType}</FormHelperText>}
		</FormControl>

		<Flex alignItems="flex-end" flex="none" spaceHorizontal="1rem">
			<FormControl error={validation && !!validation.baseCurrency} fullWidth>
				<SelectField
					flex={1}
					items={filterOutValueFromItems(currencies, action.quoteCurrency)}
					label="BASE"
					onChange={onChange('baseCurrency')}
					value={action.baseCurrency}
				/>

				{validation && validation.baseCurrency && <FormHelperText>{validation.baseCurrency}</FormHelperText>}
			</FormControl>

			<Typography variant="title">/</Typography>

			<FormControl error={validation && !!validation.quoteCurrency} fullWidth>
				<SelectField
					flex={1}
					items={filterOutValueFromItems(currencies, action.baseCurrency)}
					label="QUOTE"
					onChange={onChange('quoteCurrency')}
					value={action.quoteCurrency}
				/>

				{validation && validation.quoteCurrency && <FormHelperText>{validation.quoteCurrency}</FormHelperText>}
			</FormControl>
		</Flex>

		<FormControl error={validation && !!validation.quantity} fullWidth>
			<TextField
				fullWidth
				label="Quantity"
				onChange={onChange('quantity')}
				type="number"
				value={action.quantity !== null ? action.quantity : ''}
			/>
			{validation && validation.quantity && <FormHelperText>{validation.quantity}</FormHelperText>}
		</FormControl>

		<FormControl error={validation && !!validation.value} fullWidth>
			<TextField
				fullWidth
				label="Value"
				onChange={onChange('value')}
				type="number"
				value={action.value !== null ? action.value : ''}
			/>

			{validation && validation.value && <FormHelperText>{validation.value}</FormHelperText>}
		</FormControl>
	</Flex>
);

const StrategyFormAction = ({ action, actionValidation, onChange }) => (
	<StrategyFormActionFields
		action={action}
		onChange={(name) => (event) => onChange(name, event)}
		validation={actionValidation}
	/>
);

export default StrategyFormAction;
