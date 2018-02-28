import { css } from 'react-emotion';

const maxWidth = ({ maxWidth = null }) => {
	if (maxWidth === null) {
		return null;
	}

	return css`max-width: ${maxWidth}; }`;
};

export default maxWidth;
