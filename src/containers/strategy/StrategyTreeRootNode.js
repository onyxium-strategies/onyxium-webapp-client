import React, { Component } from 'react';
import { Button, Card, CardActions, CardContent, Typography } from 'material-ui';

import TreeNode from '../../components/tree/TreeNode';

class StrategyTreeRootNode extends Component {
	handleMouseDown = event => event.stopPropagation();

    render () {
        return (
			<TreeNode>
				<Card onMouseDown={this.handleMouseDown}>
					<CardContent>
						<Typography variant="headline">Start</Typography>
					</CardContent>

					<CardActions>
						<Button size="small">Add</Button>
					</CardActions>
				</Card>
			</TreeNode>
        );
    }
}

export default StrategyTreeRootNode;
