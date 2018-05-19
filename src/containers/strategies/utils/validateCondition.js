import { conditionTypes, conditionTypesWithTimeframe, metrics } from '../data';

const allowedConditionTypeValues = conditionTypes.map(conditionType => conditionType.value);
const allowedMetricValues = metrics.map(metric => metric.value);

export default function validateCondition(condition, allowedCurrencyValues) {
	const validationByFieldName = {};

	if (!condition.baseCurrency) {
		validationByFieldName['baseCurrency'] = 'Base currency is required';
	} else if (!allowedCurrencyValues.includes(condition.baseCurrency)) {
		validationByFieldName['baseCurrency'] = 'Base currency should be one of the allowed values';
	}

	if (!condition.baseMetric) {
		validationByFieldName['baseMetric'] = 'Metric is required';
	} else if (!allowedMetricValues.includes(condition.baseMetric)) {
		validationByFieldName['baseMetric'] = 'Metric should be one of the allowed values';
	}

	if (!condition.conditionType) {
		validationByFieldName['conditionType'] = 'Condition type is required';
	} else if (!allowedConditionTypeValues.includes(condition.conditionType)) {
		validationByFieldName['conditionType'] =
			'Condition type should be one of the allowed values';
	}

	if (!condition.quoteCurrency) {
		validationByFieldName['quoteCurrency'] = 'Quote currency is required';
	} else if (!allowedCurrencyValues.includes(condition.quoteCurrency)) {
		validationByFieldName['quoteCurrency'] =
			'Quote currency should be one of the allowed values';
	}

	if (!condition.value && condition.value !== 0) {
		validationByFieldName['value'] = 'Value is required';
	} else if (condition.value <= 0) {
		validationByFieldName['value'] = 'Value should be greater than 0';
	}

	// Conditional timeframe field for these specific condition types.
	if (conditionTypesWithTimeframe.includes(condition.conditionType)) {
		if (!condition.timeframeInMS && condition.value !== 0) {
			validationByFieldName['timeframeInMS'] = 'Timeframe is required';
		} else if (condition.timeframeInMS <= 0) {
			validationByFieldName['timeframeInMS'] = 'Value should be greater than 0';
		}
	}

	return Object.keys(validationByFieldName).length > 0 ? validationByFieldName : null;
}
