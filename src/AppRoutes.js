import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Login from './containers/auth/Login';
import Register from './containers/auth/Register';
import Funds from './containers/funds/Funds';
import CreateStrategy from './containers/strategies/CreateStrategy';
import Strategies from './containers/strategies/Strategies';
import ViewStrategy from './containers/strategies/ViewStrategy';

export const routes = [
	{
		path: '/login',
		component: Login,
		exact: true,
		label: 'Login',
		isSidebarHidden: true
	},
	{
		path: '/register',
		component: Register,
		exact: true,
		label: 'Register',
		isSidebarHidden: true
	},
	{
		path: '/funds',
		component: Funds,
		exact: true,
		label: 'Funds',
		icon: 'account_balance_wallet',
		showLinkInSidebar: true
	},
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
	</Switch>
);

export default AppRoutes;
