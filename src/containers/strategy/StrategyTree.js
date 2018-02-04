import React, { Component } from 'react';

import Tree from '../../components/tree/Tree';
import TreeDragZoomArea from '../../components/tree/TreeDragZoomArea';

import strategy from '../../test-data/strategy';

import StrategyTreeNode from './StrategyTreeNode';

class StrategyTree extends Component {
	state = { strategy };

    render () {
        return (
			<TreeDragZoomArea>
				<Tree>
					<StrategyTreeNode node={this.state.strategy} />
				</Tree>
			</TreeDragZoomArea>
        );
    }
}

export default StrategyTree;
