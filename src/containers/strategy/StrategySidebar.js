import React, { Component } from 'react';
import { css } from 'react-emotion';
import { Drawer } from 'material-ui';

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
        return (
			<Drawer anchor="right" classes={{ paper: drawerClassNames }} variant="permanent">
				Drawer
			</Drawer>
        );
    }
}

export default StrategySidebar;
