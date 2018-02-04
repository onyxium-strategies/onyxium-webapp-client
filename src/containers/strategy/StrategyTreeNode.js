import React, { Component } from 'react';
import { Button, Card, CardActions, CardContent, Typography } from 'material-ui';

import TreeLevel from '../../components/tree/TreeLevel';
import TreeNode from '../../components/tree/TreeNode';

class StrategyTreeNode extends Component {
	handleMouseDown = event => event.stopPropagation();

    renderNode = (node, index) => (
        <TreeNode key={index}>
            <Card onMouseDown={this.handleMouseDown}>
                <CardContent>
                    <Typography type="headline" component="h2">Sell 0.003 BTC</Typography>
                    <Typography>You Loyal</Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">
                        Add
                    </Button>
                </CardActions>
            </Card>

            {node.then && <StrategyTreeNode node={node.then} />}
        </TreeNode>
    );

    render () {
        if (Array.isArray(this.props.node)) {
            return (
                <TreeLevel>
                    {this.props.node.map(this.renderNode)}
                </TreeLevel>
            );
        }

        return (
            <TreeLevel>
                {this.renderNode(this.props.node, 0)}
            </TreeLevel>
        );
    }
}

export default StrategyTreeNode;
