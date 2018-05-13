import React, { Component } from 'react';
import styled from 'react-emotion';

const CONTAINER_HEIGHT = 64;
const CONTAINER_VERTICAL_CENTER = CONTAINER_HEIGHT / 2;

const ConnectorsContainer = styled('div')`
	display: block;
	position: relative;
	height: ${CONTAINER_HEIGHT}px;
	width: 100%;
`;

const ConnectorLine = styled('line')`
	stroke: #c3c3c3;
	stroke-width: 2;
`;

class TreeLevelBranchConnectors extends Component {
	containerDomNode = null;

	state = {
		containerWidth: null,
		relativeConnectorsXOffsets: []
	};

	handleRef = ref => (this.containerDomNode = ref);

	renderConnectors() {
		const { relativeConnectorsXOffsets } = this.state;

		return (
			<svg style={{ height: '100%', width: '100%' }}>
				<ConnectorLine x1="50%" y1="0" x2="50%" y2={CONTAINER_HEIGHT / 2} />

				<ConnectorLine
					x1={relativeConnectorsXOffsets[0]}
					y1={CONTAINER_VERTICAL_CENTER}
					x2={relativeConnectorsXOffsets[relativeConnectorsXOffsets.length - 1]}
					y2={CONTAINER_VERTICAL_CENTER}
				/>

				{relativeConnectorsXOffsets.map(xOffset => (
					<ConnectorLine
						key={xOffset}
						x1={xOffset}
						y1={CONTAINER_VERTICAL_CENTER}
						x2={xOffset}
						y2={CONTAINER_HEIGHT}
					/>
				))}
			</svg>
		);
	}

	render() {
		return (
			<ConnectorsContainer innerRef={this.handleRef}>
				{this.state.containerWidth &&
					this.state.relativeConnectorsXOffsets.length > 0 &&
					this.renderConnectors()}
			</ConnectorsContainer>
		);
	}

	determineXOffsets(branchNodeByIndex) {
		const containerWidth = this.containerDomNode.offsetWidth;
		const relativeConnectorsXOffsets = Object.keys(branchNodeByIndex)
			.sort()
			.map(branchNodeIndex => {
				const node = branchNodeByIndex[branchNodeIndex];
				return node.offsetLeft + node.offsetWidth / 2;
			});

		this.setState({ containerWidth, relativeConnectorsXOffsets });
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.branchNodeByIndex !== nextProps.branchNodeByIndex) {
			this.determineXOffsets(nextProps.branchNodeByIndex);
		}
	}

	componentDidMount() {
		this.determineXOffsets(this.props.branchNodeByIndex);
	}
}

export default TreeLevelBranchConnectors;
