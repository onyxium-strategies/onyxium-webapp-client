import React from 'react';
import styled from 'react-emotion';
import { Typography } from 'material-ui';
import { withTheme } from 'material-ui/styles';

let AppBodyContainer = styled('div')((props) => {
	const spacing = props.theme.spacing.unit;

	return `
		flex: 1;
		padding: 80px ${spacing}px ${spacing}px;
	`;
});
AppBodyContainer = withTheme()(AppBodyContainer);

const AppBody = () => (
	<AppBodyContainer>
		<Typography>Body</Typography>
	</AppBodyContainer>
);

export default AppBody;
