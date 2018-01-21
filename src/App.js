import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import styled from 'react-emotion';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Reboot } from 'material-ui';
import { blue } from 'material-ui/colors';
import { createGenerateClassName, createMuiTheme, jssPreset, MuiThemeProvider } from 'material-ui/styles';

import Dashboard from './routes/dashboard/Dashboard';
import CreateWorkflow from './routes/create-workflow/CreateWorkflow';

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
	position: relative;
`;

const routes = [
	{ path: '/dashboard', component: Dashboard, exact: true, label: 'Dashboard', icon: 'dashboard' },
	{ path: '/create-workflow', component: CreateWorkflow, exact: true, label: 'Create workflow', icon: 'call_split' }
];

const App = () => (
	<Router>
		<JssProvider jss={jss}>
			<MuiThemeProvider theme={theme}>
				<Reboot />

				<AppContainer>
					<AppSidebar routes={routes} />

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
