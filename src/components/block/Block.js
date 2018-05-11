import styled from 'react-emotion';
import { withTheme } from 'material-ui/styles';

import {
	applyCss,
	flex,
	margin,
	maxWidth,
	padding,
	spaceHorizontal,
	spaceVertical,
	width
} from '../../styles';

let Flex = styled('div')`
	${applyCss};
	${flex};
	${maxWidth};
	${margin};
	${padding};
	${spaceHorizontal};
	${spaceVertical};
	${width};
	display: block;
	min-height: 0;
	min-width: 0;
`;

Flex = withTheme()(Flex);

export default Flex;
