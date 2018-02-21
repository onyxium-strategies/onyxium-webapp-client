import React, { Component } from 'react';
import { Button, Card, CardActions, CardContent, Typography } from 'material-ui';

import TreeNode from '../../components/tree/TreeNode';

import areArraysShallowlyEqual from '../../utils/compare/areArraysShallowlyEqual';

class StrategyTreeNode extends Component {
	handleMouseDown = event => event.stopPropagation();
	handleMouseUp = event => event.stopPropagation();

	handleAddNodeClick = event => {
		event.stopPropagation();
		this.props.onAddNode(this.props.path);
	};

	handleRemoveNodeClick = event => {
		event.stopPropagation();
		this.props.onRemoveNode(this.props.path);
	};

	handleClick = event => {
		event.stopPropagation();
		this.props.onSelectCard(this.props.path);
	};

	render () {
		const isSelected =
			this.props.selectedCardPath !== null &&
			areArraysShallowlyEqual(this.props.selectedCardPath, this.props.path);

		return (
			<TreeNode
				isDisabled={this.props.selectedCardPath !== null && !isSelected}
				isSelected={isSelected}
			>
				<Card
					onClick={this.handleClick}
					onMouseDown={this.handleMouseDown}
					onMouseUp={this.handleMouseUp}
				>
					<CardContent>
						<Typography variant="headline">Sell 0.003 BTC</Typography>
						<Typography>You Loyal</Typography>
					</CardContent>

					<CardActions>
						<Button onClick={this.handleAddNodeClick} size="small">Add</Button>
						<Button onClick={this.handleRemoveNodeClick} size="small">Remove</Button>
					</CardActions>
				</Card>
			</TreeNode>
		);
	}
}

export default StrategyTreeNode;
