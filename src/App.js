import React from 'react';
import { matchPath, BrowserRouter as Router, withRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import { AppContainer, AppMainContainer } from './components';

import AppHeader from './AppHeader';
import AppRoutes, { routes } from './AppRoutes';
import AppSidebar from './AppSidebar';
import AppThemeProvider from './AppThemeProvider';

import * as reducers from './reducers';
const store = createStore(combineReducers(reducers));

const AppContent = withRouter(({ location }) => {
	const activeRoute = routes.find(route =>
		matchPath(location.pathname, {
			path: route.path,
			exact: route.exact
		})
	);

	return (
		<AppContainer>
			<AppSidebar activeRoute={activeRoute} isHidden={activeRoute.isSidebarHidden} />

			<AppMainContainer>
				<AppHeader activeRoute={activeRoute} />
				<AppRoutes />
			</AppMainContainer>
		</AppContainer>
	);
});

const App = () => (
	<Router>
		<Provider store={store}>
			<AppThemeProvider>
				<AppContent />
			</AppThemeProvider>
		</Provider>
	</Router>
);

export default App;
