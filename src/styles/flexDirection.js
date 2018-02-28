import { css } from 'react-emotion';

const flexDirection = ({ flexDirection = null }) => {
	if (flexDirection === null) {
		return null;
	}

	return css`flex-direction: ${flexDirection}; }`;
};

export default flexDirection;
