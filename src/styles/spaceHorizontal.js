import { css } from 'react-emotion';

const spaceHorizontal = ({ spaceHorizontal = null }) => {
	if (spaceHorizontal === null) {
		return null;
	}

	return css`> *:not(:last-child) { margin-right: ${spaceHorizontal}; }`;
};

export default spaceHorizontal;
