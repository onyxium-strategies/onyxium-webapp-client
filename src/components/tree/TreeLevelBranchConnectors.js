import React, { Component } from 'react';
import styled, { css, keyframes } from 'react-emotion';

const CONTAINER_HEIGHT = 64;
const CONTAINER_VERTICAL_CENTER = CONTAINER_HEIGHT / 2;

const ConnectorsContainer = styled('div')`
	display: block;
	position: relative;
	height: ${CONTAINER_HEIGHT}px;
	width: 100%;
`;

const dashBackwards = keyframes`
	to {
		stroke-dashoffset: 300;
	}
`;

const dashForwards = keyframes`
	to {
		stroke-dashoffset: -300;
	}
`;

const ConnectorLine = styled('line')`
	${({ animateDirection, isActive }) =>
		isActive &&
		css`
			stroke-dasharray: 10;
			animation: ${animateDirection === 'BACKWARDS' ? dashBackwards : dashForwards} 10s linear
				infinite;
		`};

	stroke: ${({ isActive }) => (isActive ? '#2196f3' : '#c3c3c3')};
	stroke-width: ${({ isActive }) => (isActive ? 4 : 2)};
`;

class TreeLevelBranchConnectors extends Component {
	containerDomNode = null;

	state = {
		containerWidth: null,
		horizontalConnectorsXOffsets: [],
		verticalConnectorsXOffsets: []
	};

	handleRef = ref => (this.containerDomNode = ref);

	renderConnectors() {
		const {
			containerWidth,
			horizontalConnectorsXOffsets,
			verticalConnectorsXOffsets
		} = this.state;

		const containerCenterXOffset = containerWidth / 2;

		return (
			<svg style={{ height: '100%', width: '100%' }}>
				<ConnectorLine
					animateDirection="FORWARDS"
					isActive={this.props.activeIndex !== null}
					x1={containerCenterXOffset}
					y1="0"
					x2={containerCenterXOffset}
					y2={CONTAINER_HEIGHT / 2}
				/>

				{horizontalConnectorsXOffsets.map((xOffset, index) => {
					if (index === horizontalConnectorsXOffsets.length - 1) {
						return null;
					}
					const x2 = horizontalConnectorsXOffsets[index + 1];

					return (
						<ConnectorLine
							key={xOffset + index}
							animateDirection={
								x2 <= containerCenterXOffset ? 'BACKWARDS' : 'FORWARDS'
							}
							isActive={this.props.activeIndex === index}
							x1={xOffset}
							y1={CONTAINER_VERTICAL_CENTER}
							x2={x2}
							y2={CONTAINER_VERTICAL_CENTER}
						/>
					);
				})}

				{verticalConnectorsXOffsets.map((xOffset, index) => (
					<ConnectorLine
						key={xOffset + index}
						isActive={this.props.activeIndex === index}
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
					this.state.verticalConnectorsXOffsets.length > 0 &&
					this.renderConnectors()}
			</ConnectorsContainer>
		);
	}

	determineXOffsets(branchNodeByIndex) {
		const containerWidth = this.containerDomNode.offsetWidth;
		const verticalConnectorsXOffsets = Object.keys(branchNodeByIndex)
			.sort()
			.map(branchNodeIndex => {
				const node = branchNodeByIndex[branchNodeIndex];
				return node.offsetLeft + node.offsetWidth / 2;
			});

		let horizontalConnectorsXOffsets = [...verticalConnectorsXOffsets, containerWidth / 2].sort(
			(a, b) => a - b
		);

		this.setState({ containerWidth, horizontalConnectorsXOffsets, verticalConnectorsXOffsets });
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
