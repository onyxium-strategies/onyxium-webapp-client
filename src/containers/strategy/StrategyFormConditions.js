import React from 'react';
import {
	Button,
	ExpansionPanel,
	ExpansionPanelActions,
	ExpansionPanelDetails,
	ExpansionPanelSummary,
	Icon,
	TextField,
	Typography
} from 'material-ui';

import Flex from '../../components/flex/Flex';
import SelectField from '../../components/form/SelectField';

import { conditionTypes, currencies, modifierByTimeframeUnit, timeframeUnits } from './data';

function filterOutValueFromItems (items, value) {
	if (!value) {
		return items;
	}

	return items.filter((item) => item.value !== value);
}

function isConditionValid (condition) {
	const { baseCurrency, conditionType, quoteCurrency, value } = condition;
	return baseCurrency !== null && conditionType !== null && quoteCurrency !== null && value !== null;
}

function renderConditionSummaryLabel (condition) {
	const { baseCurrency, conditionType, quoteCurrency, timeframeInMS, timeframeUnit, value } = condition;

	if (!isConditionValid(condition)) {
		return <Typography color="textSecondary">No condition configured yet</Typography>;
	}

	const timeframeInUnit = timeframeInMS / modifierByTimeframeUnit[timeframeUnit];
	const timeframeUnitLabel = timeframeUnits.find(unit => unit.value === timeframeUnit).label;

	switch (conditionType) {
		case 'absolute-increase':
			return (
				<Typography color="textSecondary">
					If {baseCurrency}/{quoteCurrency} absolutely increases with {value}
					within {timeframeInUnit} {timeframeUnitLabel}
				</Typography>
			);

		case 'absolute-decrease':
			return null;

		case 'percentage-increase':
			return null;

		case 'percentage-decrease':
			return null;
	}
}

const StrategyFormConditionFields = ({ condition, onChange }) => (
	<Flex flexDirection="column" maxWidth="100%" spaceVertical="1rem">
		<SelectField
			items={conditionTypes}
			label="Select condition type"
			onChange={onChange('conditionType')}
			value={condition.conditionType}
		/>

		<Flex alignItems="flex-end" flex="none" spaceHorizontal="1rem">
			<SelectField
				flex={1}
				items={filterOutValueFromItems(currencies, condition.quoteCurrency)}
				label="BASE"
				onChange={onChange('baseCurrency')}
				value={condition.baseCurrency}
			/>

			<Typography variant="title">/</Typography>

			<SelectField
				flex={1}
				items={filterOutValueFromItems(currencies, condition.baseCurrency)}
				label="QUOTE"
				onChange={onChange('quoteCurrency')}
				value={condition.quoteCurrency}
			/>
		</Flex>

		<Flex flex="none" spaceHorizontal="1rem">
			<Flex flex="1">
				<TextField
					fullWidth
					label="Timeframe"
					onChange={onChange('timeframeInMS')}
					type="number"
					value={condition.timeframeInMS / modifierByTimeframeUnit[condition.timeframeUnit]}
				/>
			</Flex>

			<Flex flex="none">
				<SelectField
					items={timeframeUnits}
					label="Unit"
					onChange={onChange('timeframeUnit')}
					value={condition.timeframeUnit}
				/>
			</Flex>
		</Flex>

		<TextField
			fullWidth
			label="Value"
			onChange={onChange('value')}
			type="number"
			value={condition.value !== null ? condition.value : ''}
		/>
	</Flex>
);

const StrategyFormConditions = ({ conditions, onChange, onConditionAdd, onConditionRemove }) => (
	<Flex flex="1" flexDirection="column">
		<Flex flex="1" flexDirection="column" spaceVertical="1rem">
			{conditions.map((condition, index) => (
				<ExpansionPanel key={index}>
					<ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
						<Flex flexDirection="column">
							<Typography>Condition {index+1}</Typography>
							{renderConditionSummaryLabel(condition)}
						</Flex>
					</ExpansionPanelSummary>

					<ExpansionPanelDetails>
						<StrategyFormConditionFields
							condition={condition}
							onChange={(name) => (event) => onChange(index, name, event)}
						/>
					</ExpansionPanelDetails>

					<ExpansionPanelActions>
						<Button
							color="primary"
							onClick={() => onConditionRemove(index)}
							size="small"
						>
							Remove condition
						</Button>
					</ExpansionPanelActions>
				</ExpansionPanel>
			))}
		</Flex>

		<Flex flex="none">
			<Button aria-label="add" color="primary" onClick={onConditionAdd} variant="fab">
				<Icon>add_icon</Icon>
			</Button>
		</Flex>
	</Flex>
);

export default StrategyFormConditions;
