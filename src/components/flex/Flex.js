import styled from 'react-emotion';
import { withTheme } from 'material-ui/styles';

import flex from '../../styles/flex';
import flexDirection from '../../styles/flexDirection';
import padding from '../../styles/padding';
import spaceHorizontal from '../../styles/spaceHorizontal';
import spaceVertical from '../../styles/spaceVertical';

let Flex = styled('div')`
	${flex};
	${flexDirection};
	${padding};
	${spaceHorizontal};
	${spaceVertical};
	display: flex;
`;

Flex.defaultProps = {
	flex: 1,
	flexDirection: 'row',
	padding: '0',
	spaceHorizontalPadding: 0,
	spaceVerticalPadding: 0
};

Flex = withTheme()(Flex);

export default Flex;
