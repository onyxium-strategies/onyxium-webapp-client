import React, { Component } from 'react';

import TreeBranch from '../../components/tree/TreeBranch';
import TreeLevel from '../../components/tree/TreeLevel';

import StrategyTreeNode from './StrategyTreeNode';
import StrategyTreeRootNode from './StrategyTreeRootNode';

class StrategyTreeLevel extends Component {
	renderBranch = (node, index) => (
		<TreeBranch key={index}>
			<StrategyTreeNode node={node} />

			{node.then && (
				<StrategyTreeLevel
					nodes={node.then}
					path={`${this.props.path}-${index}`}
				/>
			)}
		</TreeBranch>
	);

	render () {
		if (this.props.isRootLevel) {
			return (
				<TreeLevel>
					<TreeBranch>
						<StrategyTreeRootNode />

						<StrategyTreeLevel nodes={this.props.nodes} />
					</TreeBranch>
				</TreeLevel>
			);
		}

		const children = Array.isArray(this.props.nodes)
			? this.props.nodes.map(this.renderBranch)
			: this.renderBranch(this.props.nodes, 0);

		return (
			<TreeLevel>{children}</TreeLevel>
		);
	}
}

export default StrategyTreeLevel;
