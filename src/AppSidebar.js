import React from 'react';
import styled, { css } from 'react-emotion';
import { Link } from 'react-router-dom';
import {
	Divider,
	Drawer,
	Icon,
	List,
	ListItem,
	ListItemIcon,
	ListItemText
} from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';

import { Flex, OnyxiumLogo } from './components';

import { routes } from './AppRoutes';

const sidebarWidth = 260;

const dockedBaseClassName = css({
	overflow: 'hidden',
	transition: 'transform .2s ease-in-out, width .2s ease-in-out',
	transform: 'translate3D(0, 0, 0)',
	width: sidebarWidth
});

const dockedHiddenClassNames = css({
	transform: 'translate3D(-100%, 0, 0)',
	width: 0
});

const determineDockedClassNames = isHidden => {
	const classNames = [dockedBaseClassName];
	if (isHidden) {
		classNames.push(dockedHiddenClassNames);
	}

	return classNames.join(' ');
};

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

const AppSidebar = ({ isHidden }) => (
	<Drawer
		classes={{ docked: determineDockedClassNames(isHidden), paper: drawerClassNames }}
		variant="permanent"
	>
		<DrawerHeader>
			<Flex alignItems="center" flex="1" padding="0 3rem 0 2rem">
				<OnyxiumLogo />
			</Flex>
		</DrawerHeader>

		<Divider />

		<List>
			{routes.filter(route => route.showLinkInSidebar).map(route => (
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
