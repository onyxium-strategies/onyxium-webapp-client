import React from 'react';
import { css } from 'emotion';
import { AppBar, Toolbar, Typography } from 'material-ui';

const rootClassNames = css({ position: 'absolute' });

const AppHeader = () => (
	<AppBar classes={{ root: rootClassNames }}>
		<Toolbar>
			<Typography type="title" color="inherit">
				Coinflow
			</Typography>
		</Toolbar>
	</AppBar>
);

export default AppHeader;
