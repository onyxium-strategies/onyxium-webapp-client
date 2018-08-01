import React, { Component } from 'react';

import { TreeBranch, TreeLevel } from '../../../components';

import StrategyTreeNode from './StrategyTreeNode';
import StrategyTreeRootNode from './StrategyTreeRootNode';

// Bullshit component because we can't use closures in innerRef props, otherwise React calls
// this prop at every render causing an infinite render loop.
class TreeBranchWithRef extends Component {
	handleRef = ref => {
		this.props.registerBranchNode(ref, this.props.index);
	};

	render() {
		return <TreeBranch innerRef={this.handleRef}>{this.props.children}</TreeBranch>;
	}
}

class StrategyTreeLevel extends Component {
	static defaultProps = {
		path: []
	};

	renderBranch = (node, index, onUpdatedNodes, registerBranchNode) => {
		const path = [...this.props.path, index];
		const isActivePath = path.every(
			(pathItem, pathIndex) => pathItem === this.props.activeCardPath[pathIndex]
		);
		const activeIndex =
			isActivePath && path.length < this.props.activeCardPath.length
				? this.props.activeCardPath[path.length]
				: null;

		const props = {
			activeCardPath: this.props.activeCardPath,
			activeIndex: activeIndex,
			onAddNode: this.props.onAddNode,
			onRemoveNode: this.props.onRemoveNode,
			onSelectCard: this.props.onSelectCard,
			path,
			selectedCardPath: this.props.selectedCardPath
		};

		return (
			<TreeBranchWithRef key={index} index={index} registerBranchNode={registerBranchNode}>
				<StrategyTreeNode {...props} node={node} />

				{node &&
					node.then && (
						<StrategyTreeLevel
							{...props}
							nodes={node.then}
							onUpdatedNodes={onUpdatedNodes}
						/>
					)}
			</TreeBranchWithRef>
		);
	};

	renderBranches = ({ onUpdatedNodes, registerBranchNode }) => {
		if (Array.isArray(this.props.nodes)) {
			return this.props.nodes.map((node, index) =>
				this.renderBranch(node, index, onUpdatedNodes, registerBranchNode)
			);
		}

		return this.renderBranch(this.props.nodes, 0, onUpdatedNodes, registerBranchNode);
	};

	render() {
		if (this.props.isRootLevel) {
			const activeIndex =
				this.props.activeCardPath.length > 0 ? this.props.activeCardPath[0] : null;

			return (
				<TreeLevel isRootLevel>
					<TreeBranch>
						<StrategyTreeRootNode
							onAddNode={this.props.onAddNode}
							selectedCardPath={this.props.selectedCardPath}
						/>

						{this.props.nodes.length > 0 && (
							<StrategyTreeLevel
								activeIndex={activeIndex}
								activeCardPath={this.props.activeCardPath}
								onAddNode={this.props.onAddNode}
								onRemoveNode={this.props.onRemoveNode}
								onSelectCard={this.props.onSelectCard}
								nodes={this.props.nodes}
								path={[]}
								selectedCardPath={this.props.selectedCardPath}
							/>
						)}
					</TreeBranch>
				</TreeLevel>
			);
		}

		return <TreeLevel activeIndex={this.props.activeIndex}>{this.renderBranches}</TreeLevel>;
	}

	componentDidUpdate(prevProps) {
		if (prevProps.nodes !== this.props.nodes && this.props.onUpdatedNodes) {
			this.props.onUpdatedNodes();
		}
	}
}

export default StrategyTreeLevel;
