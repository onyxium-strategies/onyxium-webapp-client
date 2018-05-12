import React, { Component } from 'react';

import { TreeBranch, TreeLevel } from '../../../components';

import StrategyTreeNode from './StrategyTreeNode';
import StrategyTreeRootNode from './StrategyTreeRootNode';

class StrategyTreeLevel extends Component {
	renderBranch = (node, index) => {
		const props = {
			onAddNode: this.props.onAddNode,
			onRemoveNode: this.props.onRemoveNode,
			onSelectCard: this.props.onSelectCard,
			path: [...this.props.path, index],
			selectedCardPath: this.props.selectedCardPath
		};

		return (
			<TreeBranch key={index}>
				<StrategyTreeNode {...props} node={node} />

				{node && node.then && <StrategyTreeLevel {...props} nodes={node.then} />}
			</TreeBranch>
		);
	};

	render() {
		if (this.props.isRootLevel) {
			return (
				<TreeLevel>
					<TreeBranch>
						<StrategyTreeRootNode
							onAddNode={this.props.onAddNode}
							selectedCardPath={this.props.selectedCardPath}
						/>

						<StrategyTreeLevel
							onAddNode={this.props.onAddNode}
							onRemoveNode={this.props.onRemoveNode}
							onSelectCard={this.props.onSelectCard}
							nodes={this.props.nodes}
							path={[]}
							selectedCardPath={this.props.selectedCardPath}
						/>
					</TreeBranch>
				</TreeLevel>
			);
		}

		const children = Array.isArray(this.props.nodes)
			? this.props.nodes.map(this.renderBranch)
			: this.renderBranch(this.props.nodes, 0);

		return <TreeLevel>{children}</TreeLevel>;
	}
}

export default StrategyTreeLevel;
