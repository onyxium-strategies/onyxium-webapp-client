import styled, { css } from 'react-emotion';

const disabledStyles = css`
	opacity: 0.4;
`;

let TreeNode = styled('div')`
	width: 320px;
	${({ isDisabled }) => isDisabled && disabledStyles};
`;

export default TreeNode;
