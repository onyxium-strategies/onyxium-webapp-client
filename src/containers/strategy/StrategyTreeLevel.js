import React, { Component } from 'react';

import TreeLevel from '../../components/tree/TreeLevel';

import StrategyTreeNode from './StrategyTreeNode';
import StrategyTreeRootNode from './StrategyTreeRootNode';

class StrategyTreeLevel extends Component {
	renderNode = (node, index) => (
		<StrategyTreeNode key={index} node={node} path={`${this.props.path}-${index}`} />
	);

	render () {
		if (this.props.isRootLevel) {
			return (
				<StrategyTreeRootNode nodes={this.props.nodes} />
			);
		}

		if (Array.isArray(this.props.nodes)) {
			return (
				<TreeLevel>
					{this.props.nodes.map(this.renderNode)}
				</TreeLevel>
			);
		}

		return (
			<TreeLevel>
				{this.renderNode(this.props.nodes, 0)}
			</TreeLevel>
		);
	}
}

export default StrategyTreeLevel;
