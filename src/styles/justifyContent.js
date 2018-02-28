import { css } from 'react-emotion';

const justifyContent = ({ justifyContent = null }) => {
	if (justifyContent === null) {
		return null;
	}

	return css`justify-content: ${justifyContent}; }`;
};

export default justifyContent;
