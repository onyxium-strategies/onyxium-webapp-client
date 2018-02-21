import React, { Component } from 'react';
import { Tab, Tabs, TextField } from 'material-ui';

import Flex from '../../components/flex/Flex';

import SelectField from '../../components/form/SelectField';
import areArraysShallowlyEqual from '../../utils/compare/areArraysShallowlyEqual';
import traverseAndGetNode from '../../utils/tree-operations/traverseAndGetNode';

const conditionTypes = [
	{ label: 'Absolute increase within timeframe', value: 'absolute-increase' },
	{ label: 'Absolute decrease within timeframe', value: 'absolute-decrease' },
	{ label: 'Percentage increase within timeframe', value: 'percentage-increase' },
	{ label: 'Percentage decrease within timeframe', value: 'percentage-decrease' }
];

const currencies = [
	{ label: 'Bitcoin (BTC)', value: 'BTC' },
	{ label: 'Ethereum (ETH)', value: 'ETH' },
	{ label: 'NEO (NEO)', value: 'NEO' },
	{ label: 'OmiseGO (OMG)', value: 'OMG' }
];

const timeframeUnits = [
	{ label: 'Minutes', value: 'm' },
	{ label: 'Hours', value: 'h' },
	{ label: 'Days', value: 'd' }
];

const modifierByTimeframeUnit = {
	'm': 1000 * 60,
	'h': 1000 * 60 * 60,
	'd': 1000 * 60 * 60 * 24
};

class StrategyForm extends Component {
	getSelectedNode () {
		return traverseAndGetNode(this.props.strategy, this.props.selectedCardPath);
	}

	state = {
		activeTabIndex: 0,
		selectedNode: this.getSelectedNode(),

		baseCurrency: null,
		conditionType: null,
		quoteCurrency: null,
		timeframeInMS: modifierByTimeframeUnit['h'],
		timeframeUnit: 'h',
		value: 0
	};

	componentWillReceiveProps (nextProps) {
		if (areArraysShallowlyEqual(this.props.selectedCardPath, nextProps.selectedCardPath)) {
			this.setState({ selectedNode: this.getSelectedNode() });
		}
	}

	handleFormChange = name => event => this.setState({ [name]: event.target.value });

	handleTimeframeInMSChange = (event) => {
		this.setState({ timeframeInMS: event.target.value * modifierByTimeframeUnit[this.state.timeframeUnit] });
	};

	handleTabChange = (_event, activeTabIndex) => this.setState({ activeTabIndex });

	render () {
		return (
			<Flex flexDirection="column" spaceVerticalPadding="1rem">
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
					<Flex flexDirection="column" spaceVerticalPadding="1rem">
						<SelectField
							items={conditionTypes}
							label="Select condition type"
							onChange={this.handleFormChange('conditionType')}
							value={this.state.conditionType}
						/>

						<SelectField
							items={currencies}
							label="Select a base currency"
							onChange={this.handleFormChange('baseCurrency')}
							value={this.state.baseCurrency}
						/>

						<SelectField
							items={currencies}
							label="Select a quote currency"
							onChange={this.handleFormChange('quoteCurrency')}
							value={this.state.quoteCurrency}
						/>

						<Flex flex="none" spaceHorizontalPadding="1rem">
							<Flex flex="1">
								<TextField
									fullWidth
									label="Timeframe"
									onChange={this.handleTimeframeInMSChange}
									type="number"
									value={this.state.timeframeInMS / modifierByTimeframeUnit[this.state.timeframeUnit]}
								/>
							</Flex>

							<Flex flex="none">
								<SelectField
									items={timeframeUnits}
									label="Unit"
									onChange={this.handleFormChange('timeframeUnit')}
									value={this.state.timeframeUnit}
								/>
							</Flex>
						</Flex>

						<TextField
							fullWidth
							label="Value"
							onChange={this.handleFormChange('value')}
							type="number"
							value={this.state.value}
						/>
					</Flex>
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
