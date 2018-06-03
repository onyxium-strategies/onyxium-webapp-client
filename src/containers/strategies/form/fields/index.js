import { mapFormFieldToValueByName } from '../../../../utils';

import { modifierByTimeframeUnit, timeframeUnits } from '../../data';

import ActionFields, { actionSchema } from './ActionFields';
import AbsoluteConditionFields, { absoluteConditionSchema } from './AbsoluteConditionFields';
import EmptyConditionFields, { emptyConditionSchema } from './EmptyConditionFields';
import PercentageConditionFields, { percentageConditionSchema } from './PercentageConditionFields';

export const actionSpec = {
	fieldsComponent: ActionFields,
	schema: actionSchema
};

const absoluteConditionSpec = {
	fieldsComponent: AbsoluteConditionFields,
	schema: absoluteConditionSchema
};

const percentageConditionSpec = {
	fieldsComponent: PercentageConditionFields,
	schema: percentageConditionSchema
};

function getTimeframeData(timeframeInMS, timeframeUnit) {
	if (!timeframeInMS || !timeframeUnit) {
		return null;
	}

	const timeframeInUnit = timeframeInMS / modifierByTimeframeUnit[timeframeUnit];
	const timeframeUnitLabel = timeframeUnits
		.find(unit => unit.value === timeframeUnit)
		.label.toLowerCase();

	return { timeframeInUnit, timeframeUnitLabel };
}

export const conditionSpecByConditionType = {
	null: {
		fieldsComponent: EmptyConditionFields,
		getSummaryLabel: () => null,
		schema: emptyConditionSchema
	},
	'greater-than-or-equal-to': {
		...absoluteConditionSpec,
		getSummaryLabel: field => {
			const { baseCurrency, quoteCurrency, value } = mapFormFieldToValueByName(field);

			if (!baseCurrency || !quoteCurrency || !value) {
				return null;
			}

			return `If ${baseCurrency}/${quoteCurrency} value is greater than ${value}`;
		}
	},
	'less-than-or-equal-to': {
		...absoluteConditionSpec,
		getSummaryLabel: field => {
			const { baseCurrency, quoteCurrency, value } = mapFormFieldToValueByName(field);

			if (!baseCurrency || !quoteCurrency || !value) {
				return null;
			}

			return `If ${baseCurrency}/${quoteCurrency} value is less than ${value}`;
		}
	},
	'percentage-increase': {
		...percentageConditionSpec,
		getSummaryLabel: field => {
			const {
				baseCurrency,
				quoteCurrency,
				timeframeInMS,
				timeframeUnit,
				value
			} = mapFormFieldToValueByName(field);

			if (!timeframeInMS || !timeframeUnit || !baseCurrency || !quoteCurrency || !value) {
				return null;
			}

			const td = getTimeframeData(timeframeInMS, timeframeUnit);

			return (
				`If ${baseCurrency}/${quoteCurrency} value increases with ` +
				`${value * 100}% within ${td.timeframeInUnit} ${td.timeframeUnitLabel}`
			);
		}
	},
	'percentage-decrease': {
		...percentageConditionSpec,
		getSummaryLabel: field => {
			const {
				baseCurrency,
				quoteCurrency,
				timeframeInMS,
				timeframeUnit,
				value
			} = mapFormFieldToValueByName(field);

			if (!timeframeInMS || !timeframeUnit || !baseCurrency || !quoteCurrency || !value) {
				return null;
			}

			const td = getTimeframeData(timeframeInMS, timeframeUnit);

			return (
				`If ${baseCurrency}/${quoteCurrency} value decreases with ` +
				`${value * 100}% within ${td.timeframeInUnit} ${td.timeframeUnitLabel}`
			);
		}
	}
};
