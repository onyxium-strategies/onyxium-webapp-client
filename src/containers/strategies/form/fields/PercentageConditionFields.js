import React from 'react';

import {
	CurrencySelector,
	Flex,
	FormField,
	FormFields,
	NumberInput,
	PercentageInput,
	SelectField
} from '../../../../components';
import { useFirstAvailableFormValidation } from '../../../../utils';

import {
	conditionTypes,
	currencies,
	metrics,
	timeframeUnits,
	modifierByTimeframeUnit
} from '../../../strategies/data';

import {
	baseCurrency,
	baseMetric,
	conditionType,
	quoteCurrency,
	timeframeInMS,
	timeframeUnit,
	value
} from './schemaProperties';

export const percentageConditionSchema = {
	baseCurrency,
	baseMetric,
	conditionType,
	quoteCurrency,
	timeframeInMS,
	timeframeUnit,
	value
};

const PercentageConditionFields = ({ fields, validation }) => {
	const timeframeModifierValue = modifierByTimeframeUnit[fields.timeframeUnit.value];

	return (
		<FormFields>
			<FormField {...validation.conditionType}>
				<SelectField {...fields.conditionType} items={conditionTypes} />
			</FormField>

			<FormField {...validation.timeframeInMS}>
				<Flex spaceHorizontal="1rem">
					<Flex flex="1">
						<NumberInput
							label={fields.timeframeInMS.label}
							onChange={value => {
								fields.timeframeInMS.onChange(value * timeframeModifierValue);
							}}
							value={
								fields.timeframeInMS.value !== null
									? fields.timeframeInMS.value / timeframeModifierValue
									: null
							}
						/>
					</Flex>

					<Flex flex="none">
						<SelectField {...fields.timeframeUnit} items={timeframeUnits} />
					</Flex>
				</Flex>
			</FormField>

			<FormField {...validation.baseMetric}>
				<SelectField {...fields.baseMetric} items={metrics} />
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
					quoteCurrencyField={fields.quoteCurrency}
					quoteCurrencyItems={currencies}
				/>
			</FormField>

			<FormField {...validation.value}>
				<PercentageInput {...fields.value} />
			</FormField>
		</FormFields>
	);
};

export default PercentageConditionFields;
