import React, { Component } from 'react';

import Tree from '../../components/tree/Tree';
import TreeDragZoomArea from '../../components/tree/TreeDragZoomArea';

import StrategyTreeLevel from './StrategyTreeLevel';

class StrategyTree extends Component {
	render () {
        return (
			<TreeDragZoomArea>
				<Tree>
					<StrategyTreeLevel
						isRootLevel
						nodes={this.props.strategy}
						onAddNode={this.props.onAddNode}
						onRemoveNode={this.props.onRemoveNode}
						onSelectCard={this.props.onSelectCard}
						selectedCardPath={this.props.selectedCardPath}
					/>
				</Tree>
			</TreeDragZoomArea>
        );
    }
}

export default StrategyTree;
