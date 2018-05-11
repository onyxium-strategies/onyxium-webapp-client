import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Reboot } from 'material-ui';

import { AppContainer, AppMainContainer } from './components';

import AppHeader from './AppHeader';
import AppRoutes, { routes } from './AppRoutes';
import AppSidebar from './AppSidebar';
import AppThemeProvider from './AppThemeProvider';

const App = () => (
	<Router>
		<AppThemeProvider>
			<Reboot />

			<AppContainer>
				<AppSidebar routes={routes.filter(route => route.showInSidebar !== false)} />

				<AppMainContainer>
					<AppHeader />
					<AppRoutes />
				</AppMainContainer>
			</AppContainer>
		</AppThemeProvider>
	</Router>
);

export default App;
