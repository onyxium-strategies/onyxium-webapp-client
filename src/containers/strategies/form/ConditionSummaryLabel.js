import React from 'react';
import { Typography } from 'material-ui';

import { modifierByTimeframeUnit, timeframeUnits } from '../data';
import isConditionValid from '../utils/isConditionValid';

function getTimeframeData(timeframeInMS, timeframeUnit) {
	const timeframeInUnit = timeframeInMS / modifierByTimeframeUnit[timeframeUnit];
	const timeframeUnitLabel = timeframeUnits
		.find(unit => unit.value === timeframeUnit)
		.label.toLowerCase();

	return { timeframeInUnit, timeframeUnitLabel };
}

function determineConditionSummaryContent(condition) {
	const {
		baseCurrency,
		conditionType,
		quoteCurrency,
		timeframeInMS,
		timeframeUnit,
		value
	} = condition;

	switch (conditionType) {
		case 'absolute-above': {
			return `If ${baseCurrency}/${quoteCurrency} value is above ${value}`;
		}

		case 'absolute-below': {
			return `If ${baseCurrency}/${quoteCurrency} value is below ${value}`;
		}

		case 'absolute-increase': {
			const td = getTimeframeData(timeframeInMS, timeframeUnit);
			return (
				`If ${baseCurrency}/${quoteCurrency} value increases with ` +
				`${value} within ${td.timeframeInUnit} ${td.timeframeUnitLabel}`
			);
		}

		case 'absolute-decrease': {
			const td = getTimeframeData(timeframeInMS, timeframeUnit);
			return (
				`If ${baseCurrency}/${quoteCurrency} value decreases with ` +
				`${value} within ${td.timeframeInUnit} ${td.timeframeUnitLabel}`
			);
		}

		case 'percentage-increase': {
			const td = getTimeframeData(timeframeInMS, timeframeUnit);
			return (
				`If ${baseCurrency}/${quoteCurrency} value increases with ` +
				`${value}% within ${td.timeframeInUnit} ${td.timeframeUnitLabel}`
			);
		}

		case 'percentage-decrease': {
			const td = getTimeframeData(timeframeInMS, timeframeUnit);
			return (
				`If ${baseCurrency}/${quoteCurrency} value decreases with ` +
				`${value}% within ${td.timeframeInUnit} ${td.timeframeUnitLabel}`
			);
		}

		default: {
			return null;
		}
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
