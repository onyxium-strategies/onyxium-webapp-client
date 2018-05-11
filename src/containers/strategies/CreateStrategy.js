import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'material-ui';

import AppBody from '../../components/app/AppBody';
import Flex from '../../components/flex/Flex';

import StrategySidebar from './StrategySidebar';
import StrategyTree from './StrategyTree';

import traverseAndRemoveNode from '../../utils/tree-operations/traverseAndRemoveNode';
import traverseAndUpdateNode from '../../utils/tree-operations/traverseAndUpdateNode';

class CreateStrategy extends Component {
	state = {
		selectedCardPath: null,
		strategy: []
	};

	handleAddNode = path => {
		if (path.length === 0) {
			this.setState({ strategy: [...this.state.strategy, { type: 'condition' }] });
			return;
		}

		const strategy = traverseAndUpdateNode(this.state.strategy, path, node => {
			return {
				...node,
				then: [...(node.then || []), { type: 'condition' }]
			};
		});

		this.setState({ selectedCardPath: null, strategy });
	};

	handleRemoveNode = path => {
		const strategy = traverseAndRemoveNode(this.state.strategy, path);
		this.setState({ selectedCardPath: null, strategy });
	};

	handleSelectCard = selectedCardPath => this.setState({ selectedCardPath });

	handleCancelForm = () => {
		if (this.state.selectedCardPath !== null) {
			this.setState({ selectedCardPath: null });
		}
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

	handleSubmitButtonClick = () => {
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

		console.log('aardappel');
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

					<Button
						color="primary"
						onClick={this.handleSubmitButtonClick}
						variant="raised"
						size="small"
					>
						<Icon>send</Icon>
						Submit strategy
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

export default CreateStrategy;
