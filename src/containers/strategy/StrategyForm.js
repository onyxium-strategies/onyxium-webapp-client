import React, { Component } from 'react';

import areArraysShallowlyEqual from '../../utils/compare/areArraysShallowlyEqual';
import traverseAndGetNode from '../../utils/tree-operations/traverseAndGetNode';

class StrategyForm extends Component {
	getSelectedNode () {
		return traverseAndGetNode(this.props.strategy, this.props.selectedCardPath);
	}

	state = {
		selectedNode: this.getSelectedNode()
	};

	componentWillReceiveProps (nextProps) {
		if (areArraysShallowlyEqual(this.props.selectedCardPath, nextProps.selectedCardPath)) {
			this.setState({ selectedNode: this.getSelectedNode() });
		}
	}

	render () {
		return (
			<div>Form</div>
		);
	}
}

export default StrategyForm;
