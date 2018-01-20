import React from 'react';
import { AppBar, Toolbar, Typography } from 'material-ui';

const AppHeader = () => (
	<AppBar>
		<Toolbar>
			<Typography type="title" color="inherit">
				Coinflow
			</Typography>
		</Toolbar>
	</AppBar>
);

export default AppHeader;
