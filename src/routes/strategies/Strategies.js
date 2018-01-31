import React, { Component } from 'react';
import { Icon, List, ListItem, ListItemText, Typography } from 'material-ui';

import AppBody from '../../components/app/AppBody';

class Strategies extends Component {
	render () {
		return (
			<AppBody spaceVerticalPadding="10px">
				<Typography type="headline">Strategies</Typography>

				<List component="nav">
					<ListItem button>
						<Icon color="action">dashboard</Icon>
						<ListItemText inset primary="Strategy 1" secondary="Jan 31, 2018" />
					</ListItem>

					<ListItem button>
						<Icon color="action">dashboard</Icon>
						<ListItemText inset primary="Strategy 2" secondary="Feb 1, 2018" />
					</ListItem>
				</List>
			</AppBody>
		);
	}
}

export default Strategies;
