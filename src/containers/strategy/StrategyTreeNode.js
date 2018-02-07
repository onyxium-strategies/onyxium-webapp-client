import React, { Component } from 'react';
import { Button, Card, CardActions, CardContent, Typography } from 'material-ui';

import TreeNode from '../../components/tree/TreeNode';

class StrategyTreeNode extends Component {
	handleMouseDown = event => event.stopPropagation();

	render () {
		return (
			<TreeNode>
				<Card onMouseDown={this.handleMouseDown}>
					<CardContent>
						<Typography variant="headline">Sell 0.003 BTC</Typography>
						<Typography>You Loyal</Typography>
					</CardContent>
					<CardActions>
						<Button size="small">
							Add
						</Button>
					</CardActions>
				</Card>
			</TreeNode>
		);
	}
}

export default StrategyTreeNode;
