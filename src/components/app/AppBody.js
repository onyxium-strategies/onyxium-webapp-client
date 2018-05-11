import styled from 'react-emotion';
import { withTheme } from 'material-ui/styles';

import { flexDirection, padding, spaceVertical } from '../../styles';

let AppBody = styled('div')`
	${flexDirection};
	${padding};
	${spaceVertical};
	display: flex;
	flex: 1;
	margin-top: 56px;
	position: relative;

	${({ theme }) => theme.breakpoints.up('sm')} {
		margin-top: 64px;
	}
`;

AppBody.defaultProps = {
	flexDirection: 'column',
	padding: '2rem',
	spaceVertical: 0
};

AppBody = withTheme()(AppBody);

export default AppBody;
