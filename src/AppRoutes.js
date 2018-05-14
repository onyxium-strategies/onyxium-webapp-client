import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';

import CreateStrategy from './containers/strategies/CreateStrategy';
import Strategies from './containers/strategies/Strategies';
import ViewStrategy from './containers/strategies/ViewStrategy';

import Settings from './containers/settings/Settings';

export const routes = [
	{
		path: '/strategies',
		component: Strategies,
		exact: true,
		label: 'Strategies',
		icon: 'call_split'
	},
	{
		path: '/strategies/create',
		component: CreateStrategy,
		exact: true,
		label: 'Create strategy',
		showInSidebar: false
	},
	{
		path: '/strategies/:id',
		component: ViewStrategy,
		exact: true,
		label: 'View strategy',
		showInSidebar: false
	},
	{ path: '/settings', component: Settings, exact: true, label: 'Settings', icon: 'settings' }
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
