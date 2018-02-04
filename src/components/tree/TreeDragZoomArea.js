import React, { Component } from 'react';
import styled from 'react-emotion';

const OuterContainer = styled('div')`
	align-items: center;
	display: flex;
	flex: 1;
	flex-direction: column;
	flex-wrap: nowrap;
	overflow: hidden;
`;

const DragZoomContainer = styled('div')`
	align-items: center;
	display: flex;
	flex: 1;
	flex-direction: column;
	flex-wrap: nowrap;
	transform-origin: 0 0;
`;

class StrategyTreeDragZoomArea extends Component {
	outerContainerDomNode = null;
	dragZoomContainerDomNode = null;

	isDragging = false;

	lastPositionX = null;
	lastPositionY = null;
	positionX = 0;
	positionY = 0;

	zoomFactor = 1;

	startDragging = () => this.isDragging = true;
	stopDragging = () => {
		this.isDragging = false;
		this.lastPositionX = null;
		this.lastPositionY = null;
	};

	// Set style property directly on the domNode, since React's setState is too slow for this amount of events.
	setZoomAndPan() {
		this.dragZoomContainerDomNode.style.transform = `
			translateX(${this.positionX}px) 
			translateY(${this.positionY}px) 
			scale(${this.zoomFactor})`;
	}

	handleMouseMove = event => {
		if (this.isDragging) {
			const clientX = event.clientX;
			const clientY = event.clientY;

			if (this.lastPositionX !== null && this.lastPositionY !== null) {
				this.positionX += clientX - this.lastPositionX;
				this.positionY += clientY - this.lastPositionY;
				this.setZoomAndPan();
			}

			this.lastPositionX = clientX;
			this.lastPositionY = clientY;
		}
	};

	handleWheel = event => {
		var adjustZoom = event.nativeEvent.wheelDelta < 0 ? -0.1 : 0.1;
		this.zoomFactor = Math.max(Math.min(this.zoomFactor + adjustZoom, 3), 0.2);
		this.setZoomAndPan();
	};

	outerContainerRef = domNode => this.outerContainerDomNode = domNode;
	dragZoomContainerRef = domNode => this.dragZoomContainerDomNode = domNode;

    render () {
        return (
        	<OuterContainer
				onMouseDown={this.startDragging}
				onMouseUp={this.stopDragging}
				onMouseLeave={this.stopDragging}
				onMouseMove={this.handleMouseMove}
				onWheel={this.handleWheel}
				innerRef={this.outerContainerRef}
			>
				<DragZoomContainer innerRef={this.dragZoomContainerRef}>
					{this.props.children}
				</DragZoomContainer>
			</OuterContainer>
        );
    }

    componentDidMount() {
		const offsetWidth = this.outerContainerDomNode.offsetWidth;
		const scrollWidth = this.outerContainerDomNode.scrollWidth;
		const offsetHeight = this.outerContainerDomNode.offsetHeight;
		const scrollHeight = this.outerContainerDomNode.scrollHeight;

		const widthZoomFactor = offsetWidth / scrollWidth;
		const heightZoomFactor = offsetHeight / scrollHeight;

		if (widthZoomFactor < 1 || heightZoomFactor < 1) {
			this.zoomFactor = widthZoomFactor < heightZoomFactor ? widthZoomFactor : heightZoomFactor;
			this.setZoomAndPan();
		}
	}
}

export default StrategyTreeDragZoomArea;
