import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Button, Icon } from 'material-ui';

import { strategyAdd } from '../../actions';
import { AppBody, Flex } from '../../components';
import { traverseAndRemoveNode, traverseAndUpdateNode, traverseAndGetNode } from '../../utils';

import StrategySidebar from './form/StrategySidebar';
import StrategySubmitPopover from './form/StrategySubmitPopover';
import StrategyTree from './tree/StrategyTree';

import testStrategy from '../../test-data/strategy.json';

const mapDispatchToProps = { strategyAdd };

class CreateStrategy extends Component {
	state = {
		selectedCardPath: null,
		// TODO: this currently accepts strategy as a prop for the ViewStrategy route, remove when not needed anymore
		strategy: this.props.strategy || []
	};

	handleAddNode = path => {
		if (path.length === 0) {
			this.setState({
				selectedCardPath: [this.state.strategy.length],
				strategy: [...this.state.strategy, null]
			});
			return;
		}

		let leafIndex = null;
		const strategy = traverseAndUpdateNode(this.state.strategy, path, node => {
			leafIndex = node && node.then ? node.then.length : 0;
			return {
				...node,
				then: [...(node.then || []), null]
			};
		});

		this.setState({ selectedCardPath: path.concat(leafIndex), strategy });
	};

	handleRemoveNode = path => {
		const strategy = traverseAndRemoveNode(this.state.strategy, path);
		this.setState({ selectedCardPath: null, strategy });
	};

	removeSelectedCardPath() {
		const strategy = traverseAndRemoveNode(this.state.strategy, this.state.selectedCardPath);
		this.setState({ strategy });
	}

	removeInvalidSelectedCardPath() {
		const strategy = traverseAndRemoveNode(this.state.strategy, this.state.selectedCardPath);
		this.setState({ strategy });
	}

	isSelectedPathInvalid() {
		return (
			this.state.selectedCardPath &&
			traverseAndGetNode(this.state.strategy, this.state.selectedCardPath) === null
		);
	}

	handleSelectCard = selectedCardPath => {
		if (!this.state.selectedCardPath) {
			this.setState({ selectedCardPath });
			return;
		}

		if (this.isSelectedPathInvalid()) {
			this.removeInvalidSelectedCardPath();
			this.setState({ selectedCardPath });
		}
	};

	handleCancelForm = () => {
		if (this.isSelectedPathInvalid()) {
			this.removeInvalidSelectedCardPath();
		}

		this.setState({ selectedCardPath: null });
	};

	handleUpdateNode = (conditions, action) => {
		const strategy = traverseAndUpdateNode(
			this.state.strategy,
			this.state.selectedCardPath,
			node => {
				return {
					...node,
					conditions,
					action
				};
			}
		);

		this.setState({ selectedCardPath: null, strategy });
	};

	handleStrategySubmit = strategyName => {
		// TODO: turn this stuff back on, currently we've disabled this for demo purposes
		// const data = {
		// 	method: 'POST',
		// 	headers: {
		// 		Accept: 'application/json',
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify(this.state.strategy)
		// };
		// fetch('/api/work', data);

		this.props.strategyAdd(strategyName, this.state.strategy);
		this.props.history.push('/strategies');
	};

	onLoadTestStrategyClick = () => {
		this.setState({ strategy: testStrategy });
	};

	render() {
		return (
			<AppBody flexDirection="row" padding="0">
				<Flex
					applyCss={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 1 }}
					spaceHorizontal="1rem"
				>
					<Button component={Link} to="/strategies" variant="raised" size="small">
						<Icon>chevron_left</Icon>
					</Button>

					<StrategySubmitPopover
						isDisabled={
							!!this.state.selectedCardPath || this.state.strategy.length === 0
						}
						onSubmit={this.handleStrategySubmit}
					/>

					<Button
						disabled={!!this.state.selectedCardPath}
						onClick={this.onLoadTestStrategyClick}
						size="small"
						variant="raised"
					>
						Load test strategy
					</Button>
				</Flex>

				<StrategyTree
					onAddNode={this.handleAddNode}
					onRemoveNode={this.handleRemoveNode}
					onSelectCard={this.handleSelectCard}
					selectedCardPath={this.state.selectedCardPath}
					strategy={this.state.strategy}
				/>

				{this.state.selectedCardPath && (
					<StrategySidebar
						onCancelForm={this.handleCancelForm}
						onUpdateNode={this.handleUpdateNode}
						selectedCardPath={this.state.selectedCardPath}
						strategy={this.state.strategy}
					/>
				)}
			</AppBody>
		);
	}
}

CreateStrategy = withRouter(CreateStrategy);
CreateStrategy = connect(null, mapDispatchToProps)(CreateStrategy);

export default CreateStrategy;
