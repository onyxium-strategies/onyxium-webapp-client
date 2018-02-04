import React, { Component } from 'react';

import Tree from '../../components/tree/Tree';
import TreeDragZoomArea from '../../components/tree/TreeDragZoomArea';

import strategy from '../../test-data/strategy';

import StrategyTreeLevel from './StrategyTreeLevel';

class StrategyTree extends Component {
	state = { strategy };

    render () {
        return (
			<TreeDragZoomArea>
				<Tree>
					<StrategyTreeLevel isRootLevel nodes={this.state.strategy} />
				</Tree>
			</TreeDragZoomArea>
        );
    }
}

export default StrategyTree;
