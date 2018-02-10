import React, { Component } from 'react';

import TreeBranch from '../../components/tree/TreeBranch';
import TreeLevel from '../../components/tree/TreeLevel';

import StrategyTreeNode from './StrategyTreeNode';
import StrategyTreeRootNode from './StrategyTreeRootNode';

class StrategyTreeLevel extends Component {
	renderBranch = (node, index) => {
		const props = {
			onAddNode: this.props.onAddNode,
			onRemoveNode: this.props.onRemoveNode,
			path: [...this.props.path, index]
		};

		return (
			<TreeBranch key={index}>
				<StrategyTreeNode {...props} node={node} />

				{node.then && <StrategyTreeLevel {...props} nodes={node.then} />}
			</TreeBranch>
		);
	};

	render () {
		if (this.props.isRootLevel) {
			return (
				<TreeLevel>
					<TreeBranch>
						<StrategyTreeRootNode onAddNode={this.props.onAddNode} />

						<StrategyTreeLevel
							onAddNode={this.props.onAddNode}
							onRemoveNode={this.props.onRemoveNode}
							nodes={this.props.nodes}
							path={[]}
						/>
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
