import React, { Component } from 'react';
import { Button, Card, CardActions, CardContent, Typography } from 'material-ui';

import TreeNode from '../../components/tree/TreeNode';

class StrategyTreeRootNode extends Component {
	handleMouseDown = event => event.stopPropagation();

	handleAddNodeClick = () => this.props.onAddNode([]);

    render () {
        return (
			<TreeNode isDisabled={this.props.selectedCardPath !== null}>
				<Card onMouseDown={this.handleMouseDown}>
					<CardContent>
						<Typography variant="title">Start</Typography>
					</CardContent>

					<CardActions>
						<Button onClick={this.handleAddNodeClick}>Add</Button>
					</CardActions>
				</Card>
			</TreeNode>
        );
    }
}

export default StrategyTreeRootNode;
