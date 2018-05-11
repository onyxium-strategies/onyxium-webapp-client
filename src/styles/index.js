import { createStyle } from './utils';

export const alignItems = createStyle({
	prop: 'alignItems',
	cssProperty: 'alignItems'
});

export const flex = createStyle({
	prop: 'flex',
	cssProperty: 'flex'
});

export const flexDirection = createStyle({
	prop: 'flexDirection',
	cssProperty: 'flexDirection'
});

export const justifyContent = createStyle({
	prop: 'justifyContent',
	cssProperty: 'justifyContent'
});

export const margin = ({ margin = null }) => {
	if (margin === null) {
		return null;
	}

	if (typeof margin === 'object') {
		return {
			marginTop: margin.top || 0,
			marginRight: margin.right || 0,
			marginBottom: margin.bottom || 0,
			marginLeft: margin.left || 0
		};
	}

	return { margin };
};

export const maxWidth = createStyle({
	prop: 'maxWidth',
	cssProperty: 'maxWidth'
});

export const overflowY = createStyle({
	prop: 'overflowY',
	cssProperty: 'overflowY'
});

export const padding = ({ padding = null }) => {
	if (padding === null) {
		return null;
	}

	if (typeof padding === 'object') {
		return {
			paddingTop: padding.top || 0,
			paddingRight: padding.right || 0,
			paddingBottom: padding.bottom || 0,
			paddingLeft: padding.left || 0
		};
	}

	return { padding };
};

export const spaceHorizontal = createStyle({
	prop: 'spaceHorizontal',
	cssProperty: value => ({
		'> *:not(:last-child)': {
			marginRight: value
		}
	})
});

export const spaceVertical = createStyle({
	prop: 'spaceVertical',
	cssProperty: value => ({
		'> *:not(:last-child)': {
			marginBottom: value
		}
	})
});

export const width = createStyle({
	prop: 'width',
	cssProperty: 'width'
});
