import React from 'react';
import {
	FormControl,
	FormControlLabel,
	FormLabel,
	FormHelperText,
	Radio,
	RadioGroup,
	Typography
} from 'material-ui';

import { Flex, NumberInput, SelectField } from '../../../components';

import { currencies, orderTypes } from '../data';

import filterOutValueFromItems from '../utils/filterOutValueFromItems';

import ActionSummaryLabel from './ActionSummaryLabel';

const StrategyFormActionFields = ({ action, onChange, validation }) => (
	<Flex flex="1" flexDirection="column" maxWidth="100%" padding="1rem" spaceVertical="1rem">
		<ActionSummaryLabel action={action} />

		<FormControl error={validation && !!validation.orderType} fullWidth>
			<FormLabel component="legend">Select order type</FormLabel>

			<RadioGroup
				value={action.orderType}
				onChange={event => onChange('orderType')(event.target.value)}
			>
				{orderTypes.map(orderType => (
					<FormControlLabel
						key={orderType.value}
						value={orderType.value}
						control={<Radio />}
						label={orderType.label}
					/>
				))}
			</RadioGroup>
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

				{validation &&
					validation.baseCurrency && (
						<FormHelperText>{validation.baseCurrency}</FormHelperText>
					)}
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

				{validation &&
					validation.quoteCurrency && (
						<FormHelperText>{validation.quoteCurrency}</FormHelperText>
					)}
			</FormControl>
		</Flex>

		<FormControl error={validation && !!validation.quantity} fullWidth>
			<NumberInput label="Quantity" onChange={onChange('quantity')} value={action.quantity} />

			{validation &&
				validation.quantity && <FormHelperText>{validation.quantity}</FormHelperText>}
		</FormControl>

		<FormControl error={validation && !!validation.value} fullWidth>
			<NumberInput label="Value" onChange={onChange('value')} value={action.value} />

			{validation && validation.value && <FormHelperText>{validation.value}</FormHelperText>}
		</FormControl>
	</Flex>
);

const StrategyFormAction = ({ action, actionValidation, onChange }) => (
	<StrategyFormActionFields
		action={action}
		onChange={name => event => onChange(name, event)}
		validation={actionValidation}
	/>
);

export default StrategyFormAction;
