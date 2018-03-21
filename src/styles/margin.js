import { css } from 'react-emotion';

const margin = ({ margin = null }) => {
	if (margin === null) {
		return null;
	}

	if (typeof margin === 'object') {
		return css({
			marginTop: margin.top || 0,
			marginRight: margin.right || 0,
			marginBottom: margin.bottom || 0,
			marginLeft: margin.left || 0
		});
	}

	return css`margin: ${margin}`;
};

export default margin;
