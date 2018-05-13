import React, { Component } from 'react';
import styled from 'react-emotion';

import { spaceHorizontal } from '../../styles';

import TreeLevelBranchConnectors from './TreeLevelBranchConnectors';

const TreeLevelContainer = styled('div')`
	display: flex;
	flex-direction: column;
	flex: none;
	position: relative;
`;

const TreeLevelBranchContainer = styled('div')`
	${spaceHorizontal};
	display: flex;
	flex: none;
`;

class TreeLevel extends Component {
	state = {
		branchNodeByIndex: {}
	};

	handleUpdatedNodes = () => {
		this.setState({ branchNodeByIndex: { ...this.state.branchNodeByIndex } });
	};

	registerBranchNode = (node, index) => {
		this.setState(({ branchNodeByIndex }) => {
			const updatedBranchNodeByIndex = { ...branchNodeByIndex };

			if (!node) {
				delete updatedBranchNodeByIndex[index];
			} else {
				updatedBranchNodeByIndex[index] = node;
			}

			return { branchNodeByIndex: updatedBranchNodeByIndex };
		});
	};

	render() {
		return (
			<TreeLevelContainer>
				{!this.props.isRootLevel && (
					<TreeLevelBranchConnectors branchNodeByIndex={this.state.branchNodeByIndex} />
				)}

				<TreeLevelBranchContainer spaceHorizontal="4rem">
					{typeof this.props.children === 'function'
						? this.props.children({
								onUpdatedNodes: this.handleUpdatedNodes,
								registerBranchNode: this.registerBranchNode
						  })
						: this.props.children}
				</TreeLevelBranchContainer>
			</TreeLevelContainer>
		);
	}
}

export default TreeLevel;
