import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import { AppContainer, AppMainContainer } from './components';

import AppHeader from './AppHeader';
import AppRoutes, { routes } from './AppRoutes';
import AppSidebar from './AppSidebar';
import AppThemeProvider from './AppThemeProvider';

import * as reducers from './reducers';
const store = createStore(combineReducers(reducers));

const App = () => (
	<Router>
		<Provider store={store}>
			<AppThemeProvider>
				<AppContainer>
					<AppSidebar routes={routes.filter(route => route.showInSidebar !== false)} />

					<AppMainContainer>
						<AppHeader />
						<AppRoutes />
					</AppMainContainer>
				</AppContainer>
			</AppThemeProvider>
		</Provider>
	</Router>
);

export default App;
