import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';

import CreateStrategy from './containers/strategies/CreateStrategy';
import Strategies from './containers/strategies/Strategies';
import ViewStrategy from './containers/strategies/ViewStrategy';

export const routes = [
	{
		path: '/strategies',
		component: Strategies,
		exact: true,
		label: 'Strategies',
		icon: 'call_split',
		showLinkInSidebar: true
	},
	{
		path: '/strategies/create',
		component: CreateStrategy,
		exact: true,
		label: 'Create strategy',
		isSidebarHidden: true
	},
	{
		path: '/strategies/:id',
		component: ViewStrategy,
		exact: true,
		label: 'View strategy',
		isSidebarHidden: true
	}
];

const AppRoutes = () => (
	<Switch>
		{routes.map(route => (
			<Route key={route.path} path={route.path} exact={true} component={route.component} />
		))}

		<Redirect to="/strategies" />
	</Switch>
);

export default AppRoutes;
