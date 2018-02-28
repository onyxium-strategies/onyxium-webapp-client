import { css } from 'react-emotion';

const spaceVertical = ({ spaceVertical = null }) => {
	if (spaceVertical === null) {
		return null;
	}

	return css`> *:not(:last-child) { margin-bottom: ${spaceVertical}; }`;
};

export default spaceVertical;
