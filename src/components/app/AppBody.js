import styled from 'react-emotion';
import { withTheme } from 'material-ui/styles';

import spaceVertical from '../../styles/spaceVertical';

let AppBody = styled('div')`
	${spaceVertical};
	flex: 1;
	margin-top: 56px;
	padding: ${({ theme }) => theme.spacing.unit * 3}px;
	
	${({ theme }) => theme.breakpoints.up('sm')} {
		margin-top: 64px;
	}
`;

AppBody = withTheme()(AppBody);

export default AppBody;
