import styled, { css } from 'react-emotion';

const activeStyles = css`
	box-shadow: 1px 1px 30px 10px rgba(0, 0, 0, 0.6);
`;

const disabledStyles = css`
	opacity: 0.4;
`;

let TreeNode = styled('div')`
	width: 320px;
	${({ isActive }) => isActive && activeStyles};
	${({ isDisabled }) => isDisabled && disabledStyles};
`;

export default TreeNode;
