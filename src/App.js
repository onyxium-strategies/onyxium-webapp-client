import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import styled from 'react-emotion';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Reboot } from 'material-ui';
import { blue } from 'material-ui/colors';
import { createGenerateClassName, createMuiTheme, jssPreset, MuiThemeProvider } from 'material-ui/styles';

import Dashboard from './containers/dashboard/Dashboard';
import CreateStrategy from './containers/strategy/CreateStrategy';
import Strategies from './containers/strategies/Strategies';

import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';

const jss = create(jssPreset());
jss.options.insertionPoint = 'insertion-point-jss';
jss.options.createGenerateClassName = createGenerateClassName;

const theme = createMuiTheme({
	palette: {
		primary: {
			light: blue[300],
			main: blue[500],
			dark: blue[800]
		}
	}
});

const AppContainer = styled('div')`
	min-height: 100vh;
	display: flex;
`;

const AppMainContainer = styled('div')`
	display: flex;
	flex: 1;
	flex-direction: column;
	overflow: hidden;
	position: relative;
`;

const routes = [
	{ path: '/dashboard', component: Dashboard, exact: true, label: 'Dashboard', icon: 'dashboard' },
	{ path: '/strategies', component: Strategies, exact: true, label: 'Strategies', icon: 'call_split' },
	{ path: '/strategies/create', component: CreateStrategy, exact: true, showInSidebar: false }
];

const App = () => (
	<Router>
		<JssProvider jss={jss}>
			<MuiThemeProvider theme={theme}>
				<Reboot />

				<AppContainer>
					<AppSidebar routes={routes.filter(route => route.showInSidebar !== false)} />

					<AppMainContainer>
						<AppHeader />

						<Switch>
							{routes.map((route) => (
								<Route
									key={route.path}
									path={route.path}
									exact={true}
									component={route.component}
								/>
							))}

							<Redirect to="/dashboard" />
						</Switch>
					</AppMainContainer>
				</AppContainer>
			</MuiThemeProvider>
		</JssProvider>
	</Router>
);

export default App;
