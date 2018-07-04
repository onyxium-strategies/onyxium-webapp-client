import React from 'react';
import { css } from 'react-emotion';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const rootClassNames = css({ position: 'absolute' });

const AppHeader = ({ activeRoute }) => (
	<AppBar classes={{ root: rootClassNames }}>
		<Toolbar>
			<Typography variant="title" color="inherit">
				{activeRoute.label}
			</Typography>
		</Toolbar>
	</AppBar>
);

export default AppHeader;
