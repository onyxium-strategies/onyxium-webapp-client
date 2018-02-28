import { css } from 'react-emotion';

const alignItems = ({ alignItems = null }) => {
	if (alignItems === null) {
		return null;
	}

	return css`align-items: ${alignItems}; }`;
};

export default alignItems;
