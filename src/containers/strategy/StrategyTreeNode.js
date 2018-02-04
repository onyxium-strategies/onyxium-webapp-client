import React, { Component } from 'react';
import { Button, Card, CardActions, CardContent, Typography } from 'material-ui';

import TreeNode from '../../components/tree/TreeNode';

import StrategyTreeLevel from './StrategyTreeLevel';

class StrategyTreeNode extends Component {
	handleMouseDown = event => event.stopPropagation();

    render () {
        return (
			<TreeNode>
				<Card onMouseDown={this.handleMouseDown}>
					<CardContent>
						<Typography type="headline">Sell 0.003 BTC</Typography>
						<Typography>You Loyal</Typography>
					</CardContent>
					<CardActions>
						<Button size="small">
							Add
						</Button>
					</CardActions>
				</Card>

				{this.props.node.then && <StrategyTreeLevel nodes={this.props.node.then} path={this.props.path} />}
			</TreeNode>
        );
    }
}

export default StrategyTreeNode;
