import React, { Component } from 'react';
import { Tab, Tabs } from 'material-ui';

import Flex from '../../components/flex/Flex';
import areArraysShallowlyEqual from '../../utils/compare/areArraysShallowlyEqual';
import traverseAndGetNode from '../../utils/tree-operations/traverseAndGetNode';

import { modifierByTimeframeUnit } from './data';
import StrategyFormConditions from './StrategyFormConditions';

const defaultCondition = {
	baseCurrency: null,
	conditionType: null,
	quoteCurrency: null,
	timeframeInMS: modifierByTimeframeUnit['h'],
	timeframeUnit: 'h',
	value: null
};

function determineUpdatedValue (name, event, condition) {
	switch (name) {
		case 'timeframeInMS':
			return event.target.value * modifierByTimeframeUnit[condition.timeframeUnit];

		default:
			return event.target.value;
	}
}

class StrategyForm extends Component {
	state = {
		activeTabIndex: 0,
		conditions: [defaultCondition],
		selectedNode: traverseAndGetNode(this.props.strategy, this.props.selectedCardPath)
	};

	componentWillReceiveProps (nextProps) {
		if (!areArraysShallowlyEqual(this.props.selectedCardPath, nextProps.selectedCardPath)) {
			this.setState({ selectedNode: traverseAndGetNode(nextProps.strategy, nextProps.selectedCardPath) });
		}
	}

	handleTabChange = (_event, activeTabIndex) => this.setState({ activeTabIndex });

	handleConditionsFormChange = (conditionIndex, name, event) => {
		const { conditions } = this.state;
		const value = determineUpdatedValue(name, event, conditions[conditionIndex]);
		const updatedConditions = [
			...conditions.slice(0, conditionIndex),
			{
				...conditions[conditionIndex],
				[name]: value
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

	render () {
		return (
			<Flex flex="1" flexDirection="column" spaceVertical="1rem">
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
						onChange={this.handleConditionsFormChange}
						onConditionAdd={this.handleConditionAdd}
						onConditionRemove={this.handleConditionRemove}
					/>
				)}

				{this.state.activeTabIndex === 1 && (
					<Flex flexDirection="column">
						Actions
					</Flex>
				)}
			</Flex>
		);
	}
}

export default StrategyForm;
