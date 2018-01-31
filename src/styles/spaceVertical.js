import { css } from 'react-emotion';

const spaceVertical = ({ spaceVerticalPadding }) => css`> *:not(:last-child) { padding-bottom: ${spaceVerticalPadding}; }`;

export default spaceVertical;
