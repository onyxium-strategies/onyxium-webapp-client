import React, { Component } from 'react';

import TreeBranch from '../../components/tree/TreeBranch';
import TreeLevel from '../../components/tree/TreeLevel';

import StrategyTreeNode from './StrategyTreeNode';
import StrategyTreeRootNode from './StrategyTreeRootNode';

class StrategyTreeLevel extends Component {
	renderBranch = (node, index) => {
		const path = [...this.props.path, index];

		return (
			<TreeBranch key={index}>
				<StrategyTreeNode node={node} onAddNode={this.props.onAddNode} path={path} />

				{node.then && (
					<StrategyTreeLevel
						nodes={node.then}
						onAddNode={this.props.onAddNode}
						path={path}
					/>
				)}
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
