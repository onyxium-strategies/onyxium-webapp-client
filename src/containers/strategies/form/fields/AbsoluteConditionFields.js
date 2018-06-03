import React from 'react';

import {
	CurrencySelector,
	FormField,
	FormFields,
	NumberInput,
	SelectField
} from '../../../../components';
import { useFirstAvailableFormValidation } from '../../../../utils';

import { conditionTypes, currencies, metrics } from '../../../strategies/data';

import filterOutValueFromItems from '../../utils/filterOutValueFromItems';

import { baseCurrency, baseMetric, conditionType, quoteCurrency, value } from './schemaProperties';

export const absoluteConditionSchema = {
	baseCurrency,
	baseMetric,
	conditionType,
	quoteCurrency,
	value
};

const AbsoluteConditionFields = ({ fields, validation }) => (
	<FormFields>
		<FormField {...validation.conditionType}>
			<SelectField {...fields.conditionType} items={conditionTypes} />
		</FormField>

		<FormField {...validation.baseMetric}>
			<SelectField {...fields.baseMetric} items={metrics} />
		</FormField>

		<FormField
			{...useFirstAvailableFormValidation(validation.baseCurrency, validation.quoteCurrency)}
		>
			<CurrencySelector
				baseCurrencyField={fields.baseCurrency}
				baseCurrencyItems={filterOutValueFromItems(currencies, fields.quoteCurrency.value)}
				quoteCurrencyField={fields.quoteCurrency}
				quoteCurrencyItems={filterOutValueFromItems(currencies, fields.baseCurrency.value)}
			/>
		</FormField>

		<FormField {...validation.value}>
			<NumberInput {...fields.value} />
		</FormField>
	</FormFields>
);

export default AbsoluteConditionFields;
