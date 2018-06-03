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

import { Flex, Form } from '../../../components';

import { conditionSpecByConditionType } from './fields';

const StrategyFormConditionForm = ({
	condition,
	conditionsValidation,
	index,
	isOnlyCondition,
	onChange,
	onConditionRemove
}) => {
	const formSpec = conditionSpecByConditionType[condition.conditionType];
	const validationByName = conditionsValidation[index];

	return (
		<Form
			schema={formSpec.schema}
			onChange={({ valueByName, validationByName }) =>
				onChange(index, valueByName, validationByName)
			}
			valueByName={condition}
			validationByName={validationByName}
		>
			{({ fields, validation }) => {
				const summaryLabel = formSpec.getSummaryLabel(fields);

				return (
					<ExpansionPanel>
						<ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
							<Flex flexDirection="column">
								<Typography>Condition {index + 1}</Typography>

								<Typography color="textSecondary">
									{summaryLabel ? summaryLabel : 'No condition configured yet'}
								</Typography>
							</Flex>
						</ExpansionPanelSummary>

						<ExpansionPanelDetails>
							{formSpec.fieldsComponent({ fields, validation })}
						</ExpansionPanelDetails>

						<ExpansionPanelActions>
							<Button
								color="primary"
								disabled={isOnlyCondition}
								onClick={() => onConditionRemove(index)}
								size="small"
							>
								Remove condition
							</Button>
						</ExpansionPanelActions>
					</ExpansionPanel>
				);
			}}
		</Form>
	);
};

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
				<StrategyFormConditionForm
					key={index}
					index={index}
					isOnlyCondition={conditions.length === 1}
					condition={condition}
					conditionsValidation={conditionsValidation}
					onChange={onChange}
					onConditionRemove={onConditionRemove}
				/>
			))}
		</Flex>
	</Flex>
);

export default StrategyFormConditions;
