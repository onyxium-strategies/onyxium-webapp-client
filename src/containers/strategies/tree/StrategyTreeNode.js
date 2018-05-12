import React, { Component } from 'react';
import { Button, Card, CardActions, CardContent, Typography } from 'material-ui';

import { TreeNode, Flex } from '../../../components';

import areArraysShallowlyEqual from '../../../utils/compare/areArraysShallowlyEqual';

import determineActionSummaryLabel from '../utils/determineActionSummaryLabel';

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

	render() {
		const { node, path, selectedCardPath } = this.props;
		const isSelected =
			this.props.selectedCardPath !== null && areArraysShallowlyEqual(selectedCardPath, path);

		const actionSummaryLabel = node && determineActionSummaryLabel(node.action);

		return (
			<TreeNode
				isDisabled={this.props.selectedCardPath !== null && !isSelected}
				isSelected={isSelected}
			>
				<Card
					onClick={!isSelected ? this.handleClick : null}
					onMouseDown={this.handleMouseDown}
					onMouseUp={this.handleMouseUp}
				>
					<CardContent>
						<Flex flexDirection="column" spaceVertical=".5rem">
							{node &&
								node.conditions && (
									<Typography color="textSecondary" variant="subheading">
										If {node.conditions.length} conditions match:
									</Typography>
								)}

							<Typography
								color={actionSummaryLabel ? 'default' : 'textSecondary'}
								variant="title"
							>
								{actionSummaryLabel || '(Not configured yet)'}
							</Typography>
						</Flex>
					</CardContent>

					<CardActions>
						<Button
							disabled={!!selectedCardPath}
							onClick={this.handleAddNodeClick}
							size="small"
						>
							Add
						</Button>

						<Button
							disabled={!!selectedCardPath}
							onClick={this.handleRemoveNodeClick}
							size="small"
						>
							Remove
						</Button>
					</CardActions>
				</Card>
			</TreeNode>
		);
	}
}

export default StrategyTreeNode;
