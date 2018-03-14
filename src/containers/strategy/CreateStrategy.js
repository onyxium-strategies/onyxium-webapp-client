import React, { Component } from 'react';

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

	handleAddNode = (path) => {
		const strategy = traverseAndUpdateNode(this.state.strategy, path, (node) => {
			if (!node) {
				return { type: 'condition' };
			}

			return {
				...node,
				then: [
					...node.then || [],
					{ type: 'condition' }
				]
			};
		});

		this.setState({ selectedCardPath: null, strategy });
	};

	handleRemoveNode = (path) => {
		const strategy = traverseAndRemoveNode(this.state.strategy, path);
		this.setState({ selectedCardPath: null, strategy });
	};

	handleSelectCard = (selectedCardPath) => this.setState({ selectedCardPath });
	handleClearSelectedCard = () => this.setState({ selectedCardPath: null });

	handleUpdateNode = (conditions, action) => {
		const strategy = traverseAndUpdateNode(this.state.strategy, this.state.selectedCardPath, (node) => {
			return {
				...node,
				conditions,
				action
			};
		});

		this.setState({ selectedCardPath: null, strategy });
	};

	render () {
		return (
			<AppBody flexDirection="row" padding="0">
				<StrategyTree
					onAddNode={this.handleAddNode}
					onClearSelectedCard={this.handleClearSelectedCard}
					onRemoveNode={this.handleRemoveNode}
					onSelectCard={this.handleSelectCard}
					selectedCardPath={this.state.selectedCardPath}
					strategy={this.state.strategy}
				/>

				<StrategySidebar
					onUpdateNode={this.handleUpdateNode}
					selectedCardPath={this.state.selectedCardPath}
					strategy={this.state.strategy}
				/>
			</AppBody>
		);
	}
}

export default CreateStrategy;
