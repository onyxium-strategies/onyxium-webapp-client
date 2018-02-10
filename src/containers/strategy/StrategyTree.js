import React, { Component } from 'react';

import Tree from '../../components/tree/Tree';
import TreeDragZoomArea from '../../components/tree/TreeDragZoomArea';

import traverseAndAddNode from '../../utils/tree-operations/traverseAndAddNode';
import traverseAndRemoveNode from '../../utils/tree-operations/traverseAndRemoveNode';

import StrategyTreeLevel from './StrategyTreeLevel';

class StrategyTree extends Component {
	state = {
		selectedCardPath: null,
		strategy: []
	};

	handleAddNode = (path) => this.setState({ strategy: traverseAndAddNode(this.state.strategy, path) });

	handleRemoveNode = (path) => this.setState({ strategy: traverseAndRemoveNode(this.state.strategy, path) });

	handleSelectCard = (selectedCardPath) => this.setState({ selectedCardPath });
	handleClearSelectedCard = () => this.setState({ selectedCardPath: null });

    render () {
        return (
			<TreeDragZoomArea onMouseUpWithoutDrag={this.handleClearSelectedCard}>
				<Tree>
					<StrategyTreeLevel
						isRootLevel
						nodes={this.state.strategy}
						onAddNode={this.handleAddNode}
						onRemoveNode={this.handleRemoveNode}
						onSelectCard={this.handleSelectCard}
						selectedCardPath={this.state.selectedCardPath}
					/>
				</Tree>
			</TreeDragZoomArea>
        );
    }
}

export default StrategyTree;
