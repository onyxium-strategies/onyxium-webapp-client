import React from 'react';
import {
	Button,
	Divider,
	ExpansionPanel,
	ExpansionPanelActions,
	ExpansionPanelDetails,
	ExpansionPanelSummary,
	FormControl,
	FormHelperText,
	Icon,
	Typography
} from 'material-ui';

import { Flex, NumberInput, SelectField } from '../../components';

import filterOutValueFromItems from './utils/filterOutValueFromItems';

import ConditionSummaryLabel from './ConditionSummaryLabel';
import {
	conditionTypes,
	currencies,
	metrics,
	modifierByTimeframeUnit,
	timeframeUnits
} from './data';

const StrategyFormConditionFields = ({ condition, onChange, validation }) => (
	<Flex flexDirection="column" maxWidth="100%" spaceVertical="1rem">
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

		<Flex alignItems="flex-end" flex="none" spaceHorizontal="1rem">
			<FormControl error={validation && !!validation.baseCurrency} fullWidth>
				<SelectField
					flex={1}
					items={filterOutValueFromItems(currencies, condition.quoteCurrency)}
					label="BASE"
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
					label="QUOTE"
					onChange={onChange('quoteCurrency')}
					value={condition.quoteCurrency}
				/>

				{validation &&
					validation.quoteCurrency && (
						<FormHelperText>{validation.quoteCurrency}</FormHelperText>
					)}
			</FormControl>
		</Flex>

		<FormControl error={validation && !!validation.baseMetric} fullWidth>
			<SelectField
				flex={1}
				items={metrics}
				label="METRIC"
				onChange={onChange('baseMetric')}
				value={condition.baseMetric}
			/>

			{validation &&
				validation.baseMetric && <FormHelperText>{validation.baseMetric}</FormHelperText>}
		</FormControl>

		<FormControl error={validation && !!validation.value} fullWidth>
			<NumberInput label="Value" onChange={onChange('value')} value={condition.value} />

			{validation && validation.value && <FormHelperText>{validation.value}</FormHelperText>}
		</FormControl>

		<Flex flex="none" spaceHorizontal="1rem">
			<Flex flex="1">
				<FormControl error={validation && !!validation.timeframeInMS} fullWidth>
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
							<FormHelperText>{validation.timeframeInMS}</FormHelperText>
						)}
				</FormControl>
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
	</Flex>
);

const StrategyFormConditions = ({
	conditions,
	conditionsValidation,
	onChange,
	onConditionAdd,
	onConditionRemove
}) => (
	<Flex flex="1" flexDirection="column">
		<Flex flex="none" flexDirection="column">
			<Flex padding="1rem">
				<Button color="secondary" onClick={onConditionAdd} variant="raised" fullWidth>
					<Icon>add_icon</Icon>
					Add condition
				</Button>
			</Flex>

			<Divider />
		</Flex>

		<Flex flex="1" flexDirection="column" overflowY="auto" padding="1rem" spaceVertical="1rem">
			{conditions.map((condition, index) => (
				<ExpansionPanel key={index}>
					<ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
						<Flex flexDirection="column">
							<Typography>Condition {index + 1}</Typography>
							<ConditionSummaryLabel condition={condition} />
						</Flex>
					</ExpansionPanelSummary>

					<ExpansionPanelDetails>
						<StrategyFormConditionFields
							condition={condition}
							validation={conditionsValidation[index]}
							onChange={name => value => onChange(index, name, value)}
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
	</Flex>
);

export default StrategyFormConditions;
