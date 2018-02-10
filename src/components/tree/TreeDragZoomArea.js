import React, { Component } from 'react';
import styled from 'react-emotion';

import clearSelection from '../../utils/selection/clearSelection';

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
`;

const ZOOM_FACTOR = 1.05;

class StrategyTreeDragZoomArea extends Component {
	outerContainerDomNode = null;
	dragZoomContainerDomNode = null;

	isMouseDown = false;
	isDragging = false;

	lastPositionX = null;
	lastPositionY = null;
	positionX = 0;
	positionY = 0;

	zoomFactor = 1;

	stopDragging = () => {
		this.isDragging = false;
		this.isMouseDown = false;
		this.lastPositionX = null;
		this.lastPositionY = null;
	};

	handleMouseDown = () => {
		// Clear selection otherwise you'll drag the selection around the page.
		clearSelection();
		this.isMouseDown = true;
	};

	handleMouseUp = () => {
		if (!this.isDragging) {
			this.props.onMouseUpWithoutDrag();
		}

		this.stopDragging();
	};

	// Set style property directly on the domNode, since React's setState is too slow for this amount of events.
	setZoomAndPan() {
		this.dragZoomContainerDomNode.style.transform = `
			translateX(${this.positionX}px) 
			translateY(${this.positionY}px) 
			scale(${this.zoomFactor})`;
	}

	handleMouseMove = event => {
		if (this.isMouseDown && !this.isDragging) {
			this.isDragging = true;
		}

		const clientX = event.clientX;
		const clientY = event.clientY;

		if (this.isDragging && this.lastPositionX !== null && this.lastPositionY !== null) {
			this.positionX += clientX - this.lastPositionX;
			this.positionY += clientY - this.lastPositionY;
			this.setZoomAndPan();
		}

		this.lastPositionX = clientX;
		this.lastPositionY = clientY;
	};

	handleWheel = event => {
		const adjustZoomClicks = event.nativeEvent.wheelDelta / 40;
		const adjustZoomFactor = Math.pow(ZOOM_FACTOR, adjustZoomClicks);
		const updatedZoom = this.zoomFactor * adjustZoomFactor;
		this.zoomFactor = Math.max(Math.min(updatedZoom, 3), 0.2);

		this.setZoomAndPan();
		event.preventDefault();
	};

	outerContainerRef = domNode => this.outerContainerDomNode = domNode;
	dragZoomContainerRef = domNode => this.dragZoomContainerDomNode = domNode;

    render () {
        return (
        	<OuterContainer
				onClick={this.props.onClick}
				onMouseDown={this.handleMouseDown}
				onMouseUp={this.handleMouseUp}
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
