import React from 'react';
import { FormControlLabel, Radio, RadioGroup, Typography } from '@material-ui/core';

import { CurrencySelector, Flex, FormField, FormFields, NumberInput } from '../../../../components';
import { useFirstAvailableFormValidation } from '../../../../utils';

import { currencies, orderTypes } from '../../../strategies/data';

import determineActionSummaryLabel from '../../utils/determineActionSummaryLabel';

import { baseCurrency, orderType, quantity, quoteCurrency, value } from './schemaProperties';

export const actionSchema = {
	baseCurrency,
	orderType,
	quantity,
	quoteCurrency,
	value
};

const ActionFields = ({ action, fields, isReadOnly, validation }) => {
	const summaryLabel = determineActionSummaryLabel(action);

	return (
		<Flex flex="1" flexDirection="column" padding="1rem" spaceVertical="1rem">
			{summaryLabel && <Typography color="textSecondary">{summaryLabel}</Typography>}

			<FormFields>
				<FormField {...validation.orderType}>
					<RadioGroup
						value={fields.orderType.value}
						onChange={event => fields.orderType.onChange(event.target.value)}
					>
						{orderTypes.map(orderType => (
							<FormControlLabel
								disabled={isReadOnly}
								key={orderType.value}
								value={orderType.value}
								control={<Radio />}
								label={orderType.label}
							/>
						))}
					</RadioGroup>
				</FormField>

				<FormField
					{...useFirstAvailableFormValidation(
						validation.baseCurrency,
						validation.quoteCurrency
					)}
				>
					<CurrencySelector
						baseCurrencyField={fields.baseCurrency}
						baseCurrencyItems={currencies}
						disabled={isReadOnly}
						quoteCurrencyField={fields.quoteCurrency}
						quoteCurrencyItems={currencies}
					/>
				</FormField>

				<FormField {...validation.quantity}>
					<NumberInput {...fields.quantity} disabled={isReadOnly} />
				</FormField>

				<FormField {...validation.value}>
					<NumberInput {...fields.value} disabled={isReadOnly} />
				</FormField>
			</FormFields>
		</Flex>
	);
};

export default ActionFields;
