import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';

import Dashboard from './containers/dashboard/Dashboard';

import CreateStrategy from './containers/strategies/CreateStrategy';
import Strategies from './containers/strategies/Strategies';
import ViewStrategy from './containers/strategies/ViewStrategy';

import Settings from './containers/settings/Settings';

export const routes = [
	{
		path: '/dashboard',
		component: Dashboard,
		exact: true,
		label: 'Dashboard',
		icon: 'dashboard'
	},
	{
		path: '/strategies',
		component: Strategies,
		exact: true,
		label: 'Strategies',
		icon: 'call_split'
	},
	{ path: '/strategies/create', component: CreateStrategy, exact: true, showInSidebar: false },
	{ path: '/strategies/:id', component: ViewStrategy, exact: true, showInSidebar: false },
	{ path: '/settings', component: Settings, exact: true, label: 'Settings', icon: 'settings' }
];

const AppRoutes = () => (
	<Switch>
		{routes.map(route => (
			<Route key={route.path} path={route.path} exact={true} component={route.component} />
		))}

		<Redirect to="/dashboard" />
	</Switch>
);

export default AppRoutes;
