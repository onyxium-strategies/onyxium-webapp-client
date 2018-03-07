import React from 'react';
import {
	Button,
	Divider,
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

import filterOutValueFromItems from './utils/filterOutValueFromItems';

import ConditionSummaryLabel from './ConditionSummaryLabel';
import { conditionTypes, currencies, modifierByTimeframeUnit, timeframeUnits } from './data';

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
							<Typography>Condition {index+1}</Typography>
							<ConditionSummaryLabel condition={condition} />
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
	</Flex>
);

export default StrategyFormConditions;
