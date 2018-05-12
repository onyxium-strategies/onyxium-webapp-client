import React from 'react';
import styled, { css } from 'react-emotion';
import { Link } from 'react-router-dom';
import { Divider, Drawer, Icon, List, ListItem, ListItemIcon, ListItemText } from 'material-ui';
import { withTheme } from 'material-ui/styles';

import { Flex, OnyxiumLogo } from './components';

const sidebarWidth = 240;

const drawerClassNames = css({
	position: 'relative',
	height: '100%',
	width: sidebarWidth
});

const DrawerHeader = withTheme()(
	styled('div')(({ theme }) => ({
		...theme.mixins.toolbar,
		display: 'flex',
		flexDirection: 'column'
	}))
);

const AppSidebar = ({ routes }) => (
	<Drawer classes={{ paper: drawerClassNames }} variant="permanent">
		<DrawerHeader>
			<Flex alignItems="center" flex="1" padding="0 3rem 0 2rem">
				<OnyxiumLogo />
			</Flex>
		</DrawerHeader>

		<Divider />

		<List>
			{routes.map(route => (
				<ListItem button component={Link} key={route.path} to={route.path}>
					<ListItemIcon>
						<Icon>{route.icon}</Icon>
					</ListItemIcon>
					<ListItemText primary={route.label} />
				</ListItem>
			))}
		</List>
	</Drawer>
);

export default AppSidebar;
