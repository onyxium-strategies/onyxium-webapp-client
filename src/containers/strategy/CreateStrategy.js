import React, { Component } from 'react';

import AppBody from '../../components/app/AppBody';

import StrategySidebar from './StrategySidebar';
import StrategyTree from './StrategyTree';

import traverseAndAddNode from '../../utils/tree-operations/traverseAndAddNode';
import traverseAndRemoveNode from '../../utils/tree-operations/traverseAndRemoveNode';

class CreateStrategy extends Component {
	state = {
		selectedCardPath: null,
		strategy: []
	};

	handleAddNode = (path) => {
		this.setState({
			selectedCardPath: null,
			strategy: traverseAndAddNode(this.state.strategy, path)
		});
	};

	handleRemoveNode = (path) => {
		this.setState({
			selectedCardPath: null,
			strategy: traverseAndRemoveNode(this.state.strategy, path)
		});
	};

	handleSelectCard = (selectedCardPath) => this.setState({ selectedCardPath });
	handleClearSelectedCard = () => this.setState({ selectedCardPath: null });

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
					selectedCardPath={this.state.selectedCardPath}
					strategy={this.state.strategy}
				/>
			</AppBody>
		);
	}
}

export default CreateStrategy;
