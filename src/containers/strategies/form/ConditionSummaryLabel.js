import React from 'react';
import { Typography } from 'material-ui';

import { modifierByTimeframeUnit, timeframeUnits } from '../data';
import isConditionValid from '../utils/isConditionValid';

function determineConditionSummaryContent(condition) {
	const {
		baseCurrency,
		conditionType,
		quoteCurrency,
		timeframeInMS,
		timeframeUnit,
		value
	} = condition;

	const timeframeInUnit = timeframeInMS / modifierByTimeframeUnit[timeframeUnit];
	const timeframeUnitLabel = timeframeUnits
		.find(unit => unit.value === timeframeUnit)
		.label.toLowerCase();

	switch (conditionType) {
		case 'absolute-increase':
			return (
				`If ${baseCurrency}/${quoteCurrency} value increases with ` +
				`${value} within ${timeframeInUnit} ${timeframeUnitLabel}`
			);

		case 'absolute-decrease':
			return (
				`If ${baseCurrency}/${quoteCurrency} value decreases with ` +
				`${value} within ${timeframeInUnit} ${timeframeUnitLabel}`
			);

		case 'percentage-increase':
			return (
				`If ${baseCurrency}/${quoteCurrency} value increases with ` +
				`${value}% within ${timeframeInUnit} ${timeframeUnitLabel}`
			);

		case 'percentage-decrease':
			return (
				`If ${baseCurrency}/${quoteCurrency} value decreases with ` +
				`${value}% within ${timeframeInUnit} ${timeframeUnitLabel}`
			);

		default:
			return null;
	}
}

const ConditionSummaryLabel = ({ condition }) => {
	if (!isConditionValid(condition)) {
		return <Typography color="textSecondary">No condition configured yet</Typography>;
	}

	return (
		<Typography color="textSecondary">{determineConditionSummaryContent(condition)}</Typography>
	);
};

export default ConditionSummaryLabel;
