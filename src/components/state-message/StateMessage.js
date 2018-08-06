import React from 'react';
import styled, { css } from 'react-emotion';
import { Icon, Typography } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';

import { spaceVertical } from '../../styles';

const StateMessageContainer = withTheme()(styled('div')`
	${spaceVertical};
	color: ${({ theme }) => theme.palette.primary.main};
	display: block;
	max-width: 16rem;
	text-align: center;
`);

const iconStyles = css({
	fontSize: '5rem'
});

const StateMessage = ({ icon, subTitle, title }) => (
	<StateMessageContainer spaceVertical=".5rem">
		{typeof icon === 'string' ? <Icon classes={{ root: iconStyles }}>{icon}</Icon> : icon}

		<Typography variant="title">{title}</Typography>

		<Typography color="textSecondary" variant="subheading">
			{subTitle}
		</Typography>
	</StateMessageContainer>
);

export default StateMessage;
