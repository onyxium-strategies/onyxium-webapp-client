import React, { Component } from 'react';
import { Button, Divider, Tab, Tabs } from 'material-ui';

import { Flex } from '../../../components';

import { currencies, modifierByTimeframeUnit } from '../data';

import areArraysShallowlyEqual from '../../../utils/compare/areArraysShallowlyEqual';
import traverseAndGetNode from '../../../utils/tree-operations/traverseAndGetNode';

import defaultAction from '../utils/defaultAction';
import defaultCondition from '../utils/defaultCondition';
import validateAction from '../utils/validateAction';
import validateConditions from '../utils/validateConditions';

import StrategyFormAction from './StrategyFormAction';
import StrategyFormConditions from './StrategyFormConditions';

const allowedCurrencyValues = currencies.map(currency => currency.value);

function determineUpdatedValue(name, value, condition) {
	switch (name) {
		case 'timeframeInMS':
			return value * modifierByTimeframeUnit[condition.timeframeUnit];

		default:
			return value;
	}
}

function determineActionsAndConditions({ strategy, selectedCardPath }) {
	const selectedNode = traverseAndGetNode(strategy, selectedCardPath);

	return {
		action: selectedNode && selectedNode.action ? selectedNode.action : defaultAction,
		conditions:
			selectedNode && selectedNode.conditions ? selectedNode.conditions : [defaultCondition]
	};
}

class StrategyForm extends Component {
	state = {
		actionValidation: null,
		activeTabIndex: 0,
		conditionsValidation: [],
		...determineActionsAndConditions(this.props)
	};

	componentWillReceiveProps(nextProps) {
		if (!areArraysShallowlyEqual(this.props.selectedCardPath, nextProps.selectedCardPath)) {
			this.setState(determineActionsAndConditions(nextProps));
		}
	}

	handleTabChange = (_event, activeTabIndex) => this.setState({ activeTabIndex });

	handleConditionsFormChange = (conditionIndex, name, value) => {
		const { conditions } = this.state;
		const updatedValue = determineUpdatedValue(name, value, conditions[conditionIndex]);
		const updatedConditions = [
			...conditions.slice(0, conditionIndex),
			{
				...conditions[conditionIndex],
				[name]: updatedValue
			},
			...conditions.slice(conditionIndex + 1)
		];

		this.setState({ conditions: updatedConditions });
	};

	handleConditionAdd = () => {
		this.setState({ conditions: [...this.state.conditions, defaultCondition] });
	};

	handleConditionRemove = conditionIndex => {
		this.setState({
			conditions: [
				...this.state.conditions.slice(0, conditionIndex),
				...this.state.conditions.slice(conditionIndex + 1)
			]
		});
	};

	handleActionsFormChange = (name, value) => {
		this.setState({ action: { ...this.state.action, [name]: value } });
	};

	handleCancelButtonClick = () => {
		// TODO: show confirm message if form is dirty
		this.props.onCancel();
	};

	handleApplyButtonClick = () => {
		const conditionsValidation = validateConditions(
			this.state.conditions,
			allowedCurrencyValues
		);
		const actionValidation = validateAction(this.state.action, allowedCurrencyValues);

		if (
			conditionsValidation.some(validation => validation !== null) ||
			actionValidation !== null
		) {
			this.setState({ conditionsValidation, actionValidation });
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
							onClick={this.handleApplyButtonClick}
							variant="raised"
						>
							Apply
						</Button>
					</Flex>
				</Flex>
			</Flex>
		);
	}
}

export default StrategyForm;
