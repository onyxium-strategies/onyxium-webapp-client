import React from 'react';
import { blue } from 'material-ui/colors';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';

import AppBody from './AppBody';
import AppHeader from './AppHeader';

const theme = createMuiTheme({
	palette: {
		primary: {
			light: blue[300],
			main: blue[500],
			dark: blue[800]
		}
	}
});

const App = () => (
	<MuiThemeProvider theme={theme}>
		<AppHeader />
		<AppBody />
	</MuiThemeProvider>
);

export default App;
