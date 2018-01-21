import styled from 'react-emotion';
import { withTheme } from 'material-ui/styles';

const AppBody = withTheme()(styled('div')(({ theme }) => `
	flex: 1;
	margin-top: 56px;
	padding: ${theme.spacing.unit * 3}px;
	
	${theme.breakpoints.up('sm')} {
		margin-top: 64px;
	}
`));

export default AppBody;
