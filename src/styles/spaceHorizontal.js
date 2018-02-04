import { css } from 'react-emotion';

const spaceHorizontal = ({ spaceHorizontalPadding }) => css`> *:not(:last-child) { padding-right: ${spaceHorizontalPadding}; }`;

export default spaceHorizontal;
