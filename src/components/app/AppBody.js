import styled from 'react-emotion';
import { withTheme } from 'material-ui/styles';

import flexDirection from '../../styles/flexDirection';
import padding from '../../styles/padding';
import spaceVertical from '../../styles/spaceVertical';

let AppBody = styled('div')`
	${flexDirection};
	${padding};
	${spaceVertical};
	display: flex;
	flex: 1;
	margin-top: 56px;
	
	${({ theme }) => theme.breakpoints.up('sm')} {
		margin-top: 64px;
	}
`;

AppBody.defaultProps = {
	flexDirection: 'column',
	padding: '2rem',
	spaceVerticalPadding: 0
};

AppBody = withTheme()(AppBody);

export default AppBody;