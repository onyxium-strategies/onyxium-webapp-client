import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, List, ListItem, ListItemText, Typography } from 'material-ui';

import AppBody from '../../components/app/AppBody';

class Strategies extends Component {
	render () {
		return (
			<AppBody spaceVerticalPadding="10px">
				<Typography type="headline">Strategies</Typography>

				<List component="nav">
					<ListItem button>
						<Icon color="action">dashboard</Icon>
						<ListItemText inset primary="Fake strategy 1" secondary="Jan 31, 2018" />
					</ListItem>

					<ListItem button>
						<Icon color="action">dashboard</Icon>
						<ListItemText inset primary="Fake strategy 2" secondary="Feb 1, 2018" />
					</ListItem>
				</List>

				<Button component={Link} to="/strategies/create" fab color="primary" aria-label="add">
					<Icon>add_icon</Icon>
				</Button>
			</AppBody>
		);
	}
}

export default Strategies;
