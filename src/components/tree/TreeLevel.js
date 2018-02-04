import styled from 'react-emotion';

import spaceHorizontal from '../../styles/spaceHorizontal';

let TreeLevel = styled('div')`
	${() => spaceHorizontal({ spaceHorizontalPadding: '1rem' })}
	display: flex;
	flex: none;
	margin-top: 1rem;
`;

export default TreeLevel;
