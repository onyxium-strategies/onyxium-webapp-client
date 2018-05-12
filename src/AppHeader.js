import React from 'react';
import { css } from 'react-emotion';
import { matchPath, withRouter } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from 'material-ui';

import { routes } from './AppRoutes';

const rootClassNames = css({ position: 'absolute' });

let AppHeader = ({ location }) => {
	const matchingPath = routes.find(route =>
		matchPath(location.pathname, {
			path: route.path,
			exact: route.exact
		})
	);

	if (!matchingPath) {
		return null;
	}

	return (
		<AppBar classes={{ root: rootClassNames }}>
			<Toolbar>
				<Typography variant="title" color="inherit">
					{matchingPath.label}
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

AppHeader = withRouter(AppHeader);

export default AppHeader;
