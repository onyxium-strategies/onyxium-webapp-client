import { css } from 'react-emotion';

const width = ({ width = null }) => {
	if (width === null) {
		return null;
	}

	return css`width: ${width}; }`;
};

export default width;
