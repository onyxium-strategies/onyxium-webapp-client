import styled from 'react-emotion';
import { withTheme } from '@material-ui/core/styles';

import {
	alignItems,
	applyCss,
	flex,
	flexDirection,
	justifyContent,
	margin,
	maxWidth,
	overflowY,
	padding,
	spaceHorizontal,
	spaceVertical,
	width
} from '../../styles';

let Flex = styled('div')`
	${alignItems};
	${applyCss};
	${flex};
	${flexDirection};
	${justifyContent};
	${maxWidth};
	${overflowY};
	${margin};
	${padding};
	${spaceHorizontal};
	${spaceVertical};
	${width};
	display: flex;
	min-height: 0;
	min-width: 0;
`;

Flex = withTheme()(Flex);

export default Flex;
