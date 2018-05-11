import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Icon, List, ListItem, ListItemText, Typography } from 'material-ui';

import { AppBody } from '../../components';

class Strategies extends Component {
	render() {
		console.log('this.props.strategies', this.props.strategies);
		return (
			<AppBody spaceVertical="10px">
				<Typography variant="headline">Strategies</Typography>

				<List component="nav">
					{this.props.strategies.map((strategy, index) => (
						<ListItem key={index} button>
							<Icon color="action">dashboard</Icon>
							<ListItemText inset primary={strategy.name} secondary={strategy.date} />
						</ListItem>
					))}
				</List>

				<Button component={Link} to="/strategies/create" variant="fab" color="primary">
					<Icon>add_icon</Icon>
				</Button>
			</AppBody>
		);
	}
}

const mapStateToProps = ({ strategies }) => ({ strategies });
Strategies = connect(mapStateToProps, null)(Strategies);

export default Strategies;
