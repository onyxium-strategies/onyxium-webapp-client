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

const AbsoluteConditionFields = ({ isReadOnly, fields, validation }) => (
	<FormFields>
		<FormField {...validation.conditionType}>
			<SelectField {...fields.conditionType} disabled={isReadOnly} items={conditionTypes} />
		</FormField>

		<FormField {...validation.baseMetric}>
			<SelectField {...fields.baseMetric} disabled={isReadOnly} items={metrics} />
		</FormField>

		<FormField
			{...useFirstAvailableFormValidation(validation.baseCurrency, validation.quoteCurrency)}
		>
			<CurrencySelector
				baseCurrencyField={fields.baseCurrency}
				baseCurrencyItems={filterOutValueFromItems(currencies, fields.quoteCurrency.value)}
				disabled={isReadOnly}
				quoteCurrencyField={fields.quoteCurrency}
				quoteCurrencyItems={filterOutValueFromItems(currencies, fields.baseCurrency.value)}
			/>
		</FormField>

		<FormField {...validation.value}>
			<NumberInput {...fields.value} disabled={isReadOnly} />
		</FormField>
	</FormFields>
);

export default AbsoluteConditionFields;
