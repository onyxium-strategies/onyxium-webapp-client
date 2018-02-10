import React, { Component } from 'react';

import Tree from '../../components/tree/Tree';
import TreeDragZoomArea from '../../components/tree/TreeDragZoomArea';

import traverseAndAddNode from '../../utils/tree-operations/traverseAndAddNode';
import traverseAndRemoveNode from '../../utils/tree-operations/traverseAndRemoveNode';

import StrategyTreeLevel from './StrategyTreeLevel';

class StrategyTree extends Component {
	state = { strategy: [] };

	handleAddNode = (path) => {
		this.setState({ strategy: traverseAndAddNode(this.state.strategy, path) });
	};

	handleRemoveNode = (path) => {
		this.setState({ strategy: traverseAndRemoveNode(this.state.strategy, path) });
	};

    render () {
        return (
			<TreeDragZoomArea>
				<Tree>
					<StrategyTreeLevel
						isRootLevel
						nodes={this.state.strategy}
						onAddNode={this.handleAddNode}
						onRemoveNode={this.handleRemoveNode}
					/>
				</Tree>
			</TreeDragZoomArea>
        );
    }
}

export default StrategyTree;
