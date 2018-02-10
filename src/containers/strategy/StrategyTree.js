import React, { Component } from 'react';

import Tree from '../../components/tree/Tree';
import TreeDragZoomArea from '../../components/tree/TreeDragZoomArea';

import traverseAndImmutablyAddNode from '../../utils/tree-operations/traverseAndImmutablyAddNode';

import StrategyTreeLevel from './StrategyTreeLevel';

class StrategyTree extends Component {
	state = { strategy: [] };

	handleAddNode = (path) => {
		this.setState({ strategy: traverseAndImmutablyAddNode(this.state.strategy, path) });
	};

    render () {
        return (
			<TreeDragZoomArea>
				<Tree>
					<StrategyTreeLevel
						isRootLevel
						nodes={this.state.strategy}
						onAddNode={this.handleAddNode}
					/>
				</Tree>
			</TreeDragZoomArea>
        );
    }
}

export default StrategyTree;
