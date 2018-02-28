import { css } from 'react-emotion';

const overflowY = ({ overflowY = null }) => {
	if (overflowY === null) {
		return null;
	}

	return css`overflow-y: ${overflowY}; }`;
};

export default overflowY;
