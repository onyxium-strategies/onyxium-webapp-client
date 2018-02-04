import React, { Component } from 'react';
import { Button, Card, CardActions, CardContent, Typography } from 'material-ui';

import TreeLevel from '../../components/tree/TreeLevel';
import TreeNode from '../../components/tree/TreeNode';

import StrategyTreeLevel from './StrategyTreeLevel';

class StrategyTreeRootNode extends Component {
	handleMouseDown = event => event.stopPropagation();

    render () {
        return (
			<TreeLevel>
				<TreeNode>
					<Card onMouseDown={this.handleMouseDown}>
						<CardContent>
							<Typography type="headline">Start</Typography>
						</CardContent>
						<CardActions>
							<Button size="small">
								Add
							</Button>
						</CardActions>
					</Card>

					<StrategyTreeLevel nodes={this.props.nodes} path="0" />
				</TreeNode>
			</TreeLevel>
        );
    }
}

export default StrategyTreeRootNode;
