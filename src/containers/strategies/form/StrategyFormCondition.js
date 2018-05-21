import React, { Component } from 'react';
import { FormControl, FormHelperText, Typography } from 'material-ui';

import { Flex, NumberInput, SelectField } from '../../../components';

import {
	conditionTypes,
	conditionTypesWithTimeframe,
	currencies,
	metrics,
	modifierByTimeframeUnit,
	timeframeUnits
} from '../data';
import filterOutValueFromItems from '../utils/filterOutValueFromItems';

function determinePragmaticTimeframeUnit(timeframeInMS) {
	if (timeframeInMS === undefined) {
		return 'h';
	}

	if (timeframeInMS < modifierByTimeframeUnit['h']) {
		return 'm';
	}

	if (timeframeInMS < modifierByTimeframeUnit['d']) {
		return 'h';
	}

	return 'd';
}

class StrategyFormConditionFields extends Component {
	state = {
		// timeframeUnit is treated as local state, since this doesn't come from the backend in this
		// point in time. Determine a pragmatic timeframeUnit based on the set timeframeInMS.
		timeframeUnit: determinePragmaticTimeframeUnit(this.props.condition.timeframeInMS)
	};

	handleTimeframeUnitChange = timeframeUnit => {
		this.setState({ timeframeUnit });
	};

	render() {
		const { condition, onChange, validation } = this.props;

		return (
			<Flex flex="1" flexDirection="column" maxWidth="100%" spaceVertical="1rem">
				<FormControl error={validation && !!validation.baseMetric} fullWidth>
					<SelectField
						flex={1}
						items={metrics}
						label="Metric"
						onChange={onChange('baseMetric')}
						value={condition.baseMetric}
					/>

					{validation &&
						validation.baseMetric && (
							<FormHelperText>{validation.baseMetric}</FormHelperText>
						)}
				</FormControl>

				<FormControl error={validation && !!validation.conditionType} fullWidth>
					<SelectField
						items={conditionTypes}
						label="Select condition type"
						onChange={onChange('conditionType')}
						value={condition.conditionType}
					/>

					{validation &&
						validation.conditionType && (
							<FormHelperText>{validation.conditionType}</FormHelperText>
						)}
				</FormControl>

				{condition.conditionType &&
					conditionTypesWithTimeframe.includes(condition.conditionType) && (
						<Flex flex="none" spaceHorizontal="1rem">
							<Flex flex="1">
								<FormControl
									error={validation && !!validation.timeframeInMS}
									fullWidth
								>
									<NumberInput
										label="Timeframe"
										onChange={onChange('timeframeInMS')}
										value={
											condition.timeframeInMS /
											modifierByTimeframeUnit[condition.timeframeUnit]
										}
									/>

									{validation &&
										validation.timeframeInMS && (
											<FormHelperText>
												{validation.timeframeInMS}
											</FormHelperText>
										)}
								</FormControl>
							</Flex>

							<Flex flex="none">
								<SelectField
									items={timeframeUnits}
									label="Unit"
									onChange={this.handleTimeframeUnitChange}
									value={this.state.timeframeUnit}
								/>
							</Flex>
						</Flex>
					)}

				<Flex alignItems="flex-end" flex="none" spaceHorizontal="1rem">
					<FormControl error={validation && !!validation.baseCurrency} fullWidth>
						<SelectField
							flex={1}
							items={filterOutValueFromItems(currencies, condition.quoteCurrency)}
							label="Base"
							onChange={onChange('baseCurrency')}
							value={condition.baseCurrency}
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
							items={filterOutValueFromItems(currencies, condition.baseCurrency)}
							label="Quote"
							onChange={onChange('quoteCurrency')}
							value={condition.quoteCurrency}
						/>

						{validation &&
							validation.quoteCurrency && (
								<FormHelperText>{validation.quoteCurrency}</FormHelperText>
							)}
					</FormControl>
				</Flex>

				<FormControl error={validation && !!validation.value} fullWidth>
					<NumberInput
						label="Value"
						onChange={onChange('value')}
						value={condition.value}
					/>

					{validation &&
						validation.value && <FormHelperText>{validation.value}</FormHelperText>}
				</FormControl>
			</Flex>
		);
	}
}

export default StrategyFormConditionFields;
