import { css } from 'react-emotion';

const padding = ({ padding = null }) => {
	if (padding === null) {
		return null;
	}

	if (typeof padding === 'object') {
		return css({
			paddingTop: padding.top || 0,
			paddingRight: padding.right || 0,
			paddingBottom: padding.bottom || 0,
			paddingLeft: padding.left || 0
		});
	}

	return css`
		padding: ${padding};
	`;
};

export default padding;
