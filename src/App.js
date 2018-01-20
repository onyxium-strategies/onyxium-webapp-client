import React from 'react';
import styled from 'react-emotion';
import { Reboot } from 'material-ui';
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

const AppContainer = styled('div')`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
`;

const App = () => (
	<MuiThemeProvider theme={theme}>
		<Reboot />
		<AppContainer>
			<AppHeader />
			<AppBody />
		</AppContainer>
	</MuiThemeProvider>
);

export default App;
