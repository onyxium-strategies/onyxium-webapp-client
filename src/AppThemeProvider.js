import React from 'react';
import { injectGlobal } from 'react-emotion';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { Reboot } from 'material-ui';
import { blue } from 'material-ui/colors';
import { createMuiTheme, jssPreset, MuiThemeProvider } from 'material-ui/styles';

const jss = create(jssPreset());
jss.setup({ insertionPoint: document.querySelector('head > meta[name="insertion-point-jss"]') });

const theme = createMuiTheme({
	palette: {
		primary: {
			light: blue[300],
			main: blue[500],
			dark: blue[800]
		}
	}
});

// Stupid material icons overflow their content (specifying the icon name) by default,
// prevent this behavior and make sure they always have a fixed width based on the font-size.
injectGlobal(`
	.material-icons {
		overflow: hidden;
		width: 1em;
	};
`);

const AppThemeProvider = ({ children }) => (
	<JssProvider jss={jss}>
		<MuiThemeProvider theme={theme}>
			<Reboot />
			{children}
		</MuiThemeProvider>
	</JssProvider>
);

export default AppThemeProvider;
