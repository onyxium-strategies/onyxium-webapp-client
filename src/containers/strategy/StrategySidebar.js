import React, { Component } from 'react';
import { css } from 'react-emotion';
import { Drawer } from 'material-ui';

import StrategyForm from './StrategyForm';

const sidebarWidth = 360;

const drawerClassNames = css({
	flex: 'none',
	padding: '1rem',
	position: 'relative',
	height: '100%',
	width: sidebarWidth,
	zIndex: 0
});

class StrategySidebar extends Component {
	render () {
		if (!this.props.selectedCardPath) {
			return null;
		}

		return (
			<Drawer anchor="right" classes={{ paper: drawerClassNames }} variant="permanent">
				<StrategyForm
					selectedCardPath={this.props.selectedCardPath}
					strategy={this.props.strategy}
				/>
			</Drawer>
		);
	}
}

export default StrategySidebar;
