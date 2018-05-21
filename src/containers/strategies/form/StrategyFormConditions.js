import React from 'react';
import {
	Button,
	Divider,
	ExpansionPanel,
	ExpansionPanelActions,
	ExpansionPanelDetails,
	ExpansionPanelSummary,
	Icon,
	Typography
} from 'material-ui';

import { Flex } from '../../../components';

import ConditionSummaryLabel from './ConditionSummaryLabel';
import StrategyFormCondition from './StrategyFormCondition';

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
						<StrategyFormCondition
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
