import styled from 'react-emotion';

import spaceHorizontal from '../../styles/spaceHorizontal';

let TreeLevel = styled('div')`
	${() => spaceHorizontal({ spaceHorizontal: '4rem' })}
	display: flex;
	flex: none;
	margin-top: 2rem;
`;

export default TreeLevel;
