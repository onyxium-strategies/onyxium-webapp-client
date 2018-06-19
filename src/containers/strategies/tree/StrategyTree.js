import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Tree, TreeDragZoomArea } from '../../../components';

import StrategyTreeLevel from './StrategyTreeLevel';

class StrategyTree extends Component {
	static propTypes = {
		strategy: PropTypes.array.isRequired,
		onAddNode: PropTypes.func,
		onRemoveNode: PropTypes.func,
		onSelectCard: PropTypes.func,
		selectedCardPath: PropTypes.array
	};

	static defaultProps = {
		onAddNode: null,
		onRemoveNode: null,
		onSelectCard: null,
		selectedCardPath: null
	};

	render() {
		return (
			<TreeDragZoomArea>
				<Tree>
					<StrategyTreeLevel
						isRootLevel
						nodes={this.props.strategy}
						onAddNode={this.props.onAddNode}
						onRemoveNode={this.props.onRemoveNode}
						onSelectCard={this.props.onSelectCard}
						selectedCardPath={this.props.selectedCardPath}
					/>
				</Tree>
			</TreeDragZoomArea>
		);
	}
}

export default StrategyTree;
