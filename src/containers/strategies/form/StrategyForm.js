import React, { Component } from 'react';
import { Button, Divider, Tab, Tabs } from '@material-ui/core';

import { Flex } from '../../../components';
import { hasFormValidation, traverseAndGetNode, validateFormValues } from '../../../utils';

import StrategyFormAction from './StrategyFormAction';
import StrategyFormConditions from './StrategyFormConditions';
import { actionSpec, conditionSpecByConditionType } from './fields';

const defaultCondition = { conditionType: null };

function determineInitialState({ strategy, selectedCardPath }) {
	const selectedNode = traverseAndGetNode(strategy, selectedCardPath);

	if (!selectedNode) {
		return {
			action: {},
			actionValidation: {},
			conditions: [defaultCondition],
			conditionsValidation: [null]
		};
	}

	// Currently the implementation of this form assumes that the action and condition
	// set initially are valid, return the initial state without validation.
	// In the future when we decide to live update everything everywhere we will need to resee this.
	return {
		action: selectedNode.action,
		actionValidation: {},
		conditions: selectedNode.conditions,
		conditionsValidation: selectedNode.conditions.map(() => null)
	};
}

class StrategyForm extends Component {
	state = {
		...determineInitialState(this.props),
		activeTabIndex: 0
	};

	handleTabChange = (_event, activeTabIndex) => this.setState({ activeTabIndex });

	handleConditionsFormChange = (conditionIndex, valueByName, validationByName) => {
		this.setState(({ conditions, conditionsValidation }) => ({
			conditions: [
				...conditions.slice(0, conditionIndex),
				{ ...valueByName },
				...conditions.slice(conditionIndex + 1)
			],
			conditionsValidation: [
				...conditionsValidation.slice(0, conditionIndex),
				{ ...validationByName },
				...conditionsValidation.slice(conditionIndex + 1)
			]
		}));
	};

	handleConditionAdd = () => {
		this.setState(({ conditions, conditionsValidation }) => ({
			conditions: [...conditions, defaultCondition],
			conditionsValidation: [...conditionsValidation, null]
		}));
	};

	handleConditionRemove = conditionIndex => {
		this.setState({
			conditions: [
				...this.state.conditions.slice(0, conditionIndex),
				...this.state.conditions.slice(conditionIndex + 1)
			],
			conditionsValidation: [
				...this.state.conditions.slice(0, conditionIndex),
				...this.state.conditions.slice(conditionIndex + 1)
			]
		});
	};

	handleActionsFormChange = ({ valueByName, validationByName }) => {
		this.setState({
			action: valueByName,
			actionValidation: validationByName
		});
	};

	handleCancelButtonClick = () => {
		// TODO: show confirm message if form is dirty
		this.props.onCancel();
	};

	handleSubmitButtonClick = () => {
		const actionValidation = validateFormValues(this.state.action, actionSpec.schema);
		const conditionsValidation = this.state.conditions.map(condition =>
			validateFormValues(
				condition,
				conditionSpecByConditionType[condition.conditionType].schema
			)
		);

		if (
			hasFormValidation(actionValidation) ||
			conditionsValidation.some(validationByName => hasFormValidation(validationByName))
		) {
			this.setState({ actionValidation, conditionsValidation });
			return;
		}

		this.props.onSubmit(this.state.conditions, this.state.action);
	};

	render() {
		return (
			<Flex flex="1" flexDirection="column">
				<Tabs
					value={this.state.activeTabIndex}
					onChange={this.handleTabChange}
					fullWidth
					indicatorColor="primary"
					textColor="primary"
				>
					<Tab label="Conditions" />
					<Tab label="Actions" />
				</Tabs>

				{this.state.activeTabIndex === 0 && (
					<StrategyFormConditions
						conditions={this.state.conditions}
						conditionsValidation={this.state.conditionsValidation}
						onChange={this.handleConditionsFormChange}
						onConditionAdd={this.handleConditionAdd}
						onConditionRemove={this.handleConditionRemove}
					/>
				)}

				{this.state.activeTabIndex === 1 && (
					<StrategyFormAction
						action={this.state.action}
						actionValidation={this.state.actionValidation}
						onChange={this.handleActionsFormChange}
					/>
				)}

				<Flex flex="none" flexDirection="column">
					<Divider />

					<Flex justifyContent="space-between" padding="1rem">
						<Button onClick={this.handleCancelButtonClick} variant="raised">
							Cancel
						</Button>

						<Button
							color="primary"
							onClick={this.handleSubmitButtonClick}
							variant="raised"
						>
							Submit
						</Button>
					</Flex>
				</Flex>
			</Flex>
		);
	}
}

export default StrategyForm;
