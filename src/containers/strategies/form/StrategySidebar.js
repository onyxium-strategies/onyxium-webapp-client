import React from 'react';
import { css } from 'react-emotion';
import { Drawer } from 'material-ui';

import StrategyForm from './StrategyForm';

const sidebarWidth = 360;

const drawerClassNames = css({
	flex: 'none',
	position: 'relative',
	height: '100%',
	width: sidebarWidth,
	zIndex: 0
});

const StrategySidebar = ({ onCancelForm, onUpdateNode, selectedCardPath, strategy }) => (
	<Drawer anchor="right" classes={{ paper: drawerClassNames }} variant="permanent">
		<StrategyForm
			onCancel={onCancelForm}
			onSubmit={onUpdateNode}
			selectedCardPath={selectedCardPath}
			strategy={strategy}
		/>
	</Drawer>
);

export default StrategySidebar;
