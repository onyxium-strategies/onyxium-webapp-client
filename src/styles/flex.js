import { css } from 'react-emotion';

const flex = ({ flex = null }) => {
	if (flex === null) {
		return null;
	}

	return css`flex: ${flex}; }`;
};

export default flex;
