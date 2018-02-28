import styled from 'react-emotion';
import { withTheme } from 'material-ui/styles';

import {
	alignItems,
	flex,
	flexDirection,
	justifyContent,
	maxWidth,
	overflowY,
	padding,
	spaceHorizontal,
	spaceVertical,
	width
} from '../../styles';

let Flex = styled('div')`
	${alignItems};
	${flex};
	${flexDirection};
	${justifyContent};
	${maxWidth};
	${overflowY};
	${padding};
	${spaceHorizontal};
	${spaceVertical};
	${width};
	display: flex;
`;

Flex = withTheme()(Flex);

export default Flex;
