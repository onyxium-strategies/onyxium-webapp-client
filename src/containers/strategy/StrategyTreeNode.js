import React, { Component } from 'react';
import { Button, Card, CardActions, CardContent, Typography } from 'material-ui';

import TreeNode from '../../components/tree/TreeNode';

class StrategyTreeNode extends Component {
	handleMouseDown = event => event.stopPropagation();

	handleAddNodeClick = () => this.props.onAddNode(this.props.path);
	handleRemoveNodeClick = () => this.props.onRemoveNode(this.props.path);

	render () {
		return (
			<TreeNode>
				<Card onMouseDown={this.handleMouseDown}>
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
