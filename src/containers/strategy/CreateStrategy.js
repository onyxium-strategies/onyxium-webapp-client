import React, { Component } from 'react';
import { Button } from 'material-ui';

import AppBody from '../../components/app/AppBody';

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
		const data = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state.strategy)
		};

		fetch('/api/work', data);
	};

	render() {
		return (
			<AppBody flexDirection="row" padding="0">
				<StrategyTree
					onAddNode={this.handleAddNode}
					onRemoveNode={this.handleRemoveNode}
					onSelectCard={this.handleSelectCard}
					selectedCardPath={this.state.selectedCardPath}
					strategy={this.state.strategy}
				/>

				<StrategySidebar
					onCancelForm={this.handleCancelForm}
					onUpdateNode={this.handleUpdateNode}
					selectedCardPath={this.state.selectedCardPath}
					strategy={this.state.strategy}
				/>

				<div style={{ position: 'fixed', bottom: 0, left: 0, zIndex: 99999 }}>
					<Button color="primary" onClick={this.handleSubmitButtonClick} variant="raised">
						Submit dat shit!
					</Button>
				</div>
			</AppBody>
		);
	}
}

export default CreateStrategy;
