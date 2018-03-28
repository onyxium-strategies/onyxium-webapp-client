import { conditionTypes, metrics, modifierByTimeframeUnit } from '../data';

const allowedConditionTypeValues = conditionTypes.map(conditionType => conditionType.value);
const allowedMetricValues = metrics.map(metric => metric.value);

export default function createConditionSpec (allowedCurrencyValues, conditionType = null) {
	const baseSpec = {
		baseCurrency: {
			type: 'oneOf',
			required: true,
			defaultValue: null,
			allowedValues: allowedCurrencyValues
		},
		baseMetric: {
			type: 'oneOf',
			required: true,
			defaultValue: null,
			allowedValues: allowedMetricValues
		},
		conditionType: {
			type: 'oneOf',
			required: true,
			defaultValue: null,
			allowedValues: allowedConditionTypeValues
		},
		quoteCurrency: {
			type: 'oneOf',
			required: true,
			defaultValue: null,
			allowedValues: allowedCurrencyValues
		},
		value: {
			type: 'number',
			required: true,
			defaultValue: null,
			min: 0,
			max: null
		}
	};

	switch (conditionType) {
		case 'absolute-increase':
		case 'absolute-decrease':
		case 'percentage-decrease':
		case 'percentage-decrease':
			return {
				...baseSpec,
				timeframeInMS: {
					type: 'number',
					required: true,
					defaultValue: modifierByTimeframeUnit['h'],
					min: 0,
					max: null
				}
			};

		default:
			return baseSpec;
	}
}
