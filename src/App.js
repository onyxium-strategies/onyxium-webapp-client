import React from 'react';
import { matchPath, BrowserRouter as Router, Redirect, withRouter } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { middleware as reduxPackMiddleware } from 'redux-pack';

import { AppContainer, AppMainContainer } from './components';

import AppHeader from './AppHeader';
import AppRoutes, { routes } from './AppRoutes';
import AppSidebar from './AppSidebar';
import AppThemeProvider from './AppThemeProvider';

import * as reducers from './reducers';
const store = createStore(combineReducers(reducers), applyMiddleware(reduxPackMiddleware));

const mapStateToProps = ({ user }) => ({ user });

let AppContent = ({ location, user }) => {
	const activeRoute = routes.find(route =>
		matchPath(location.pathname, {
			path: route.path,
			exact: route.exact
		})
	);

	if (!user.data && location.pathname !== '/login' && location.pathname !== '/register') {
		return <Redirect to="/login" />;
	}

	if (!activeRoute) {
		return <Redirect to="/funds" />;
	}

	return (
		<AppContainer>
			<AppSidebar
				activeRoute={activeRoute}
				isHidden={activeRoute && activeRoute.isSidebarHidden}
			/>

			<AppMainContainer>
				<AppHeader activeRoute={activeRoute} />
				<AppRoutes />
			</AppMainContainer>
		</AppContainer>
	);
};

AppContent = connect(mapStateToProps, null)(AppContent);
AppContent = withRouter(AppContent);

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
